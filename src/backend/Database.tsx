import { useState, useEffect, createContext, useContext } from "react";
import {
	useCollectionData,
	useDocumentData,
} from "react-firebase-hooks/firestore";
import { JsonConvert } from "json2typescript";

import firebase from "firebase/app";
import { firestore } from "@generated/Config";

import Task from "@models/Task";
import EventData from "@models/EventData";
import TaskList, { priorityList, tasksList, todayList } from "@models/TaskList";
import UserProfile, {
	UserProfilePayloadJsonConverter,
} from "@models/UserProfile";

import { getEpochDays } from "@utils/HelperFunctions";
import { useAuthContext } from "./Auth";

//#region -- Database Document --

export interface DatabasePayloadJsonConverter<T> {
	Payload: T | undefined;
}

function getUserDoc(
	user: firebase.User
): firebase.firestore.DocumentReference<firebase.firestore.DocumentData> {
	return firestore.doc("users/" + user.uid);
}

function useDatabaseDocumentData<T extends object>(
	docRef:
		| firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
		| undefined
		| null,
	converter?:
		| (new () => DatabasePayloadJsonConverter<T>)
		| (new () => T)
		| undefined,
	mergeFields?: string[]
): [
	T | undefined,
	(data: Partial<T>) => Promise<void>, // update
	boolean,
	firebase.FirebaseError | undefined
] {
	// Hooks
	const [data, setData] = useState<T>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<any>();

	const [dataJSON, docLoading, docError] = useDocumentData<T>(docRef);

	useEffect(() => {
		if (docLoading) {
			setLoading(true);
		}
	}, [docLoading]);

	useEffect(() => {
		//console.log(dataJSON);
		if (docError) {
			setError(docError);
		} else if (!docLoading && dataJSON != undefined) {
			if (Object.keys(dataJSON).length !== 0) {
				try {
					const jsonConvert = new JsonConvert();
					if (
						(converter as new () => DatabasePayloadJsonConverter<T>) !==
						undefined
					) {
						const holder = jsonConvert.deserializeObject(
							{ Payload: dataJSON },
							converter as new () => DatabasePayloadJsonConverter<T>
						);
						setData(holder.Payload);
					} else if ((converter as new () => T) !== undefined) {
						const payload = jsonConvert.deserializeObject(
							dataJSON,
							converter as new () => T
						);
						setData(payload);
					} else {
						setData(dataJSON as T);
					}
				} catch (e) {
					setError(e);
					return;
				}
			}
			setLoading(false);
		} else if (!docLoading) {
			setLoading(false);
		}
	}, [dataJSON, docLoading, docError]);

	const updateData = async (mergeData: Partial<T>): Promise<void> => {
		if (!docRef) throw "Doc Ref Null";
		if (!data) throw "Data Null";

		let presentMergeFields: string[] | undefined = undefined;
		if (mergeFields) {
			presentMergeFields = Object.keys(mergeData).filter((x) =>
				mergeFields.includes(x)
			);
		}

		//console.log(presentMergeFields);

		await docRef.set(mergeData, {
			mergeFields: presentMergeFields,
		});

		console.log("Document successfully written!");
	};

	return [data, updateData, loading, error];
}

//#endregion

//#region -- Database Collection --

interface DatabaseItem {
	uid: string;
}

interface StateType<T> {
	value: T | undefined;
	setter: (data: T | undefined) => void;
	setWithID: (id: string) => void;
}

interface DatabaseData<T> {
	values: T[];
	create: (data: T) => Promise<[boolean, string]>;
	update: (data: T) => Promise<[boolean, string]>;
	delete: (data: T) => Promise<[boolean, string]>;
	selectWithID: (listUID: string) => T | undefined;
}

interface SelectedDatabaseData<T> extends DatabaseData<T> {
	selected: StateType<T>;
}

function getUserCollection(
	user: firebase.User | null | undefined,
	collectionName: string
):
	| firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
	| undefined {
	return user
		? firestore.collection("users/" + user.uid + "/" + collectionName)
		: undefined;
}

function useDatabaseCollection<T extends DatabaseItem>(
	classRef: new () => T,
	collectionRef:
		| firebase.firestore.CollectionReference<firebase.firestore.DocumentData>
		| undefined,
	query: firebase.firestore.Query<firebase.firestore.DocumentData> | undefined
): [
	T[],
	(data: T) => Promise<[boolean, string]>, // create
	(data: T) => Promise<[boolean, string]>, // update
	(data: T) => Promise<[boolean, string]> // delete
] {
	// Hooks
	const [dataList, setDataList] = useState<T[]>(new Array<T>());
	const [dataJSON, loading, error] = useCollectionData(query, {
		idField: "uid",
	});

	useEffect(() => {
		// Logic
		if (error) {
			console.log(error);
		} else if (!loading && dataJSON != undefined) {
			const jsonConvert = new JsonConvert();
			const newDataList = dataJSON.map((x) => {
				// console.log(x);
				const data = jsonConvert.deserializeObject<T>(x, classRef);
				return data;
			});
			setDataList(newDataList);
			// console.log("set new data list");
		}
	}, [dataJSON, loading, error]);

	const createData = async (
		data: DatabaseItem
	): Promise<[boolean, string]> => {
		let exists = false;

		dataList.forEach((i) => {
			if (i.uid == data.uid) {
				exists = true;
				return;
			}
		});

		if (!exists) {
			return await setData(data);
		} else {
			return [
				false,
				"Cannot create data that already exist in the database: " +
					data,
			];
		}
	};

	const updateData = async (
		data: DatabaseItem
	): Promise<[boolean, string]> => {
		//let exists = false;

		// dataList.forEach((i) => {
		// 	if (i.uid == data.uid) {
		// 		exists = true;
		// 		return;
		// 	}
		// });

		// if (exists) {
		// 	return await setData(data);
		// } else {
		// 	return [
		// 		false,
		// 		"Cannot update data as it does not already exist in the database: " +
		// 			data,
		// 	];
		// }

		return await setData(data);
	};

	const deleteData = async (
		data: DatabaseItem
	): Promise<[boolean, string]> => {
		let error = "";
		let success = false;

		if (collectionRef) {
			await collectionRef
				.doc(data.uid)
				.delete()
				.then(() => {
					console.log("Document successfully deleted!");
					success = true;
				})
				.catch((errorMessage) => {
					error = "Error writing document: " + errorMessage;
					console.error("Error writing document: ", errorMessage);
				});
		}

		return [success, error];
	};

	const setData = async (data: DatabaseItem): Promise<[boolean, string]> => {
		let error = "";
		const jsonConvert: JsonConvert = new JsonConvert();
		const dataJSON = jsonConvert.serialize(data);
		console.log(dataJSON);

		let success = false;

		if (collectionRef) {
			await collectionRef
				.doc(data.uid)
				.set(dataJSON)
				.then(() => {
					console.log("Document successfully written!");
					success = true;
				})
				.catch((errorMessage) => {
					error = "Error writing document: " + errorMessage;
					console.error("Error writing document: ", errorMessage);
				});
		}

		return [success, error];
	};

	return [dataList, createData, updateData, deleteData];
}

//#endregion

//#region -- Tasks --

export function useUserEvents(user: firebase.User | undefined) {
	const collectionRef = getUserCollection(user, "events");

	return useDatabaseCollection(
		EventData,
		collectionRef,
		collectionRef ? collectionRef.orderBy("createdAt") : undefined
	);
}

export function useUserTaskLists(user: firebase.User | null | undefined) {
	const collectionRef = getUserCollection(user, "taskLists");

	return useDatabaseCollection(
		TaskList,
		collectionRef,
		collectionRef ? collectionRef.orderBy("createdAt") : undefined
	);
}

export function useUserTasksWithList(
	user: firebase.User | null | undefined,
	taskList: TaskList | undefined
) {
	const collectionRef = getUserCollection(user, "tasks");
	const [query, setQuery] = useState<
		firebase.firestore.Query<firebase.firestore.DocumentData> | undefined
	>(undefined);

	useEffect(() => {
		if (collectionRef && taskList) {
			let query = collectionRef.where("listUID", "==", taskList.uid);

			if (taskList.isTodayList) {
				query = collectionRef.where(
					"todayEpochDays",
					"==",
					getEpochDays(Date.now())
				);
			} else if (taskList.isPriortyList) {
				query = collectionRef.where("priority", "==", true);
			}

			setQuery(query);
		} else {
			setQuery(undefined);
		}
	}, [taskList]);

	return useDatabaseCollection(Task, collectionRef, query);
}

interface TasksData {
	taskList: SelectedDatabaseData<TaskList>;
	task: SelectedDatabaseData<Task>;
	tasksReady: boolean;
}

const tasksContext = createContext<TasksData>({
	taskList: {
		values: new Array<TaskList>(0),
		create: (data: TaskList) => {
			return new Promise(() => {});
		},
		update: (data: TaskList) => {
			return new Promise(() => {});
		},
		delete: (data: TaskList) => {
			return new Promise(() => {});
		},
		selected: {
			value: undefined,
			setter: (taskList: TaskList | undefined) => {},
			setWithID: (id) => {},
		},
		selectWithID: (uid: string) => {
			return undefined;
		},
	},
	task: {
		values: new Array<Task>(0),
		create: (data: Task) => {
			return new Promise(() => {});
		},
		update: (data: Task) => {
			return new Promise(() => {});
		},
		delete: (data: Task) => {
			return new Promise(() => {});
		},
		selected: {
			value: undefined,
			setter: (task: Task | undefined) => {},
			setWithID: (id) => {},
		},
		selectWithID: (uid: string) => {
			return undefined;
		},
	},
	tasksReady: false,
});

export function useTasks() {
	return useContext(tasksContext);
}

export function ProvideTasks({ children }: { children: any }) {
	const authContext = useAuthContext();
	const [userLists, createList, updateList, deleteList] = useUserTaskLists(
		authContext.user
	);
	const [selectedList, setSelectedList] = useState<TaskList>();
	const [tasksReady, setTasksReady] = useState(false);
	const [tasks, createTask, updateTask, deleteTask] = useUserTasksWithList(
		authContext.user,
		selectedList
	);
	const [selectedTask, setSelectedTask] = useState<Task>();

	const allLists = new Array<TaskList>(
		...userLists,
		tasksList,
		priorityList,
		todayList
	);

	useEffect(() => {
		setTasksReady(false);
	}, [selectedList]);

	useEffect(() => {
		setTasksReady(true);
	}, [tasks]);

	return (
		<tasksContext.Provider
			value={{
				taskList: {
					values: userLists,
					create: createList,
					update: updateList,
					delete: deleteList,
					selectWithID: (uid) => userLists.find((x) => x.uid === uid),
					selected: {
						value: selectedList,
						setter: setSelectedList,
						setWithID: (routerID) => {
							if (selectedList?.RouterLink != routerID) {
								setTasksReady(false);
								setSelectedList(
									allLists.find(
										(x) => x.RouterLink == routerID
									)
								);
							}
						},
					},
				},
				task: {
					values: tasks,
					create: createTask,
					update: updateTask,
					delete: deleteTask,
					selectWithID: (uid) => tasks.find((x) => x.uid === uid),
					selected: {
						value: selectedTask,
						setter: setSelectedTask,
						setWithID: (id) => {
							if (selectedTask?.uid != id) {
								setSelectedTask(
									tasks.find((x) => x.uid === id)
								);
							}
						},
					},
				},
				tasksReady: tasksReady,
			}}
		>
			{children}
		</tasksContext.Provider>
	);
}

//#endregion

//#region -- Event --

const eventsContext = createContext<DatabaseData<EventData>>({
	values: new Array<EventData>(0),
	create: (data: EventData) => {
		return new Promise(() => {});
	},
	update: (data: EventData) => {
		return new Promise(() => {});
	},
	delete: (data: EventData) => {
		return new Promise(() => {});
	},
	selectWithID: (uid: string) => {
		return undefined;
	},
});

export function useEvents() {
	return useContext(eventsContext);
}

export function ProvideEvents({
	children,
	user,
}: {
	children: any;
	user: firebase.User | undefined;
}) {
	const [events, createEvent, updateEvent, deleteEvent] = useUserEvents(user);

	return (
		<eventsContext.Provider
			value={{
				values: events,
				create: createEvent,
				update: updateEvent,
				delete: deleteEvent,
				selectWithID: (uid) => events.find((x) => x.uid === uid),
			}}
		>
			{children}
		</eventsContext.Provider>
	);
}

//#endregion

//#region -- Profile --

export const useUserProfile = (
	user?: firebase.User | null
): [
	Readonly<UserProfile> | undefined,
	(data: Partial<UserProfile>) => Promise<void>,
	Boolean,
	any
] => {
	const [docRef, setDocRef] =
		useState<
			firebase.firestore.DocumentReference<firebase.firestore.DocumentData>
		>();

	const [profileData, updateProfile, loading, error] =
		useDatabaseDocumentData<UserProfile>(
			docRef,
			UserProfilePayloadJsonConverter,
			UserProfile.mergeFields
		);

	useEffect(() => {
		if (user && !docRef) {
			setDocRef(getUserDoc(user));
		} else if (!user && docRef) {
			setDocRef(undefined);
		}
	}, [user]);

	return [profileData, updateProfile, loading, error];
};

//#endregion
