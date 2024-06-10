import { IonList, IonListHeader, isPlatform } from "@ionic/react";

import { useEffect, useRef, useState } from "react";
import { useTasks } from "@backend/Database";
import AddEventItem from "@components/schedule/AddEventItem";

// import "./Scheduler.css";

type Props = {};

export default function Scheduler(props: Props) {
	const tasks = useTasks();

	return (
		<div style={{ backgroundColor: "#3f51b5" }}>
			<IonList
				style={{ backgroundColor: "#3f51b5" }}
				color={"primary"}
				lines={"none"}
				// style={isPlatform("desktop") ? {"padding": "0px"} : undefined}
			>
				<div id="external-events">
					{tasks.task.values.map((x) => (
						<AddEventItem
							id={x.uid}
							title={x.name}
							subtitle={
								"Tasks > " +
								tasks.taskList.selectWithID(x.listUID)?.name
							}
							event={undefined}
						/>
					))}

					<AddEventItem
						id={"testbaby"}
						title={"Message Liela"}
						subtitle={"Tasks > Today"}
						event={undefined}
					/>

					<AddEventItem
						id={"testbaby2"}
						title={"Skyward Sword"}
						subtitle={"Activites > Video Games"}
						event={undefined}
					/>

					<AddEventItem
						id={"testbaby3"}
						title={"Laundry"}
						subtitle={"Routine > Chores"}
						event={undefined}
					/>

					<AddEventItem
						id={"testbaby4"}
						title={"Call Insurance"}
						subtitle={"Tasks > Today"}
						event={undefined}
					/>

					<AddEventItem
						id={"testbaby25"}
						title={"Stardew Valley"}
						subtitle={"Activites > Video Games"}
						event={undefined}
					/>

					<AddEventItem
						id={"testbaby36"}
						title={"Cook Supper"}
						subtitle={"Routine > Chores"}
						event={undefined}
					/>
				</div>
			</IonList>
		</div>
	);
}
