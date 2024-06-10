import { IonList, IonListHeader, isPlatform } from "@ionic/react";

import { useEffect, useRef, useState } from "react";
import { useTasks } from "@backend/Database";
import AddEventItem from "@components/schedule/AddEventItem";

// import "./Scheduler.css";

type Props = {};

export default function TaskScheduler(props: Props) {
	const tasks = useTasks();

	return (
		<>
			<IonList
				color={"primary"}
				lines={"none"}
				// style={isPlatform("desktop") ? {"padding": "0px"} : undefined}
			>
				<div id="external-events">
					{tasks.task.values.map((x) => (
						<AddEventItem
							id={x.uid}
							title={x.name}
							subtitle={"Task"}
							event={undefined}
						/>
					))}
				</div>

				{/* <AddEventItem
                    title={"I am a title"}
                    subtitle={"By: Darryl Day"}
                    event={undefined}
                /> */}
			</IonList>
		</>
	);
}
