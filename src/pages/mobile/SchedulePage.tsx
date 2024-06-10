import { useLocation } from "react-router";
import {
	IonPage,
	IonContent,
	IonButton,
	useIonPopover,
	isPlatform,
} from "@ionic/react";
import PageHeader from "@components/page/PageHeader";
import FullCalendar, {
	EventApi,
	DateSelectArg,
	EventClickArg,
	EventContentArg,
	formatDate,
} from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";

import "./SchedulePage.css";
import { useEffect, useRef, useState } from "react";

import { useEvents } from "@backend/Database";
import EventData from "@models/EventData";
import Scheduler from "@components/schedule/Scheduler";
import { StatusBar, Style } from "@capacitor/status-bar";

export default function SchedulePage() {
	const location = useLocation();
	const page = location.pathname.split("/")[1];
	const pageCapitalize = page.charAt(0).toUpperCase() + page.slice(1);

	const events = useEvents();

	const containerEl = document.getElementById("external-events");

	const [draggable, setDraggable] = useState(false);

	useEffect(() => {
		if (isPlatform("ios") && isPlatform("capacitor")) {
			StatusBar.setStyle({
				style: Style.Dark,
			});
		}
	});

	useEffect(() => {
		resizeFix(); // Ionic mobile content resize fix
	}, [location]);

	const resizeFix = async () => {
		await new Promise((resolve) => setTimeout(resolve, 10));
		window.dispatchEvent(new Event("resize"));
	};

	useEffect(() => {
		if (containerEl && !draggable) {
			new Draggable(containerEl, {
				itemSelector: ".fc-event",
				eventData: function (eventEl) {
					return {
						title: eventEl.innerText,
						duration: "00:15:00",
					};
				},
			});
			setDraggable(true);
		}
	}, [containerEl, draggable]);

	return (
		<>
			<PageHeader name={pageCapitalize} />
			<IonContent forceOverscroll={false}>
				<div
					className="container"
					style={{
						height: "100%",
						display: "flex",
						flexFlow: "column nowrap",
						// alignItems: "stretch"
					}}
				>
					<div
						style={{
							flex: 2,
							overflow: "auto",
						}}
					>
						<FullCalendar
							height={"100%"}
							plugins={[timeGridPlugin, interactionPlugin]}
							initialView="timeGridDay"
							slotDuration="00:15:00"
							slotLabelInterval={"00:15:00"}
							slotLabelFormat={{
								hour: "numeric",
								minute: "2-digit",
								omitZeroMinute: false,
								meridiem: "short",
							}}
							nowIndicator={true}
							allDaySlot={false}
							// headerToolbar={false}
							scrollTime={new Date(
								Date.now() - 15 * 60 * 1000
							).toLocaleTimeString("en-US", {
								hour12: false,
								hour: "numeric",
								minute: "numeric",
							})}
							dayHeaders={false}
							// dateClick={async (date) => {
							//     console.log(date)

							//     const eventData = new EventData();
							//     eventData.title = "Test";
							//     eventData.start = date.dateStr;
							//     date.date.setMinutes(50);
							//     eventData.end = date.dateStr;
							//     const result = await events.create(eventData);
							//     console.log(result);
							// }}
							eventReceive={(event) => {
								console.log(event.view.title);
							}}
							longPressDelay={0}
							businessHours={{
								daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
								startTime: "08:00",
								endTime: "23:00",
							}}
							defaultTimedEventDuration={"00:15:00"}
							events={events.values}
							droppable={true}
						/>
					</div>

					<div
						style={{
							flex: 1,
							overflow: "auto",
						}}
					>
						<Scheduler />
					</div>
				</div>
			</IonContent>
		</>
	);
}
