import { isPlatform, IonButton } from "@ionic/react";

import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import { useHistory, useLocation } from "react-router";
import { useEffect } from "react";

import "./WelcomeSlides.css";
import { useAuthContext } from "@backend/Auth";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

type Props = {
	onFinished: (() => void) | string;
};

export default function WelcomeSlides(props: Props) {
	const location = useLocation();
	const history = useHistory();
	const authContext = useAuthContext();

	useEffect(() => {
		resizeFix(); // Ionic resize fix
	}, [location]);

	const resizeFix = async () => {
		await new Promise((resolve) => setTimeout(resolve, 10));
		window.dispatchEvent(new Event("resize"));
	};

	const slides = [
		<>
			<img
				className={isPlatform("desktop") ? "w-4/6" : "w-full"}
				src={"assets/Slide1.svg"}
				alt="Slide 1"
			/>
			<h3 className="text-xl font-medium leading-10">
				Welcome to{" "}
				<span style={{ color: "#3f51b5" }}>
					<b>myClarity</b>
				</span>{" "}
				👋
			</h3>
		</>,
		<>
			<h3 className="text-xl font-medium">
				An app designed to help you stay organized and accomplish your
				goals so you can live your life to the fullest.
			</h3>
			<img
				className={isPlatform("desktop") ? "w-4/6" : "w-full"}
				src={"assets/planning_strategy.jpg"}
				alt="Slide 1"
			/>
		</>,
		<>
			<h3 className="text-xl font-medium leading-10">
				Current Release: <b>Alpha v0.0.1</b>
			</h3>
			<div className="w-full px-4 text-lg">
				<ul className="list-disc text-left">
					<li>
						Initial Release
						<ul
							style={{
								listStyleType: "circle",
								paddingLeft: "24px",
							}}
						>
							<li>Desktop and Mobile Web App + PWA Support</li>
							<li>Windows and macOS Desktop App</li>
							<li>iOS and Android Native App</li>
						</ul>
					</li>
					<li>
						Login, Signup, and Forgot Password Pages{" "}
						<ul
							style={{
								listStyleType: "circle",
								paddingLeft: "24px",
							}}
						>
							<li>Email {"&"} Password + Google SSO</li>
						</ul>
					</li>
					<li>
						Tasks Feature{" "}
						<ul
							style={{
								listStyleType: "circle",
								paddingLeft: "24px",
							}}
						>
							<li>Basic Todo List Functionality</li>
						</ul>
					</li>
					<li>
						Profile Page{" "}
						<ul
							style={{
								listStyleType: "circle",
								paddingLeft: "24px",
							}}
						>
							<li>Upload Picture + Edit User Info</li>
						</ul>
					</li>
					<li>Welcome Slides</li>
				</ul>
			</div>
		</>,
		<>
			<h3 className="text-xl font-semibold leading-10">Coming Soon</h3>
			<div className="text-left">
				<h4 className="text-xl font-normal leading-10">🎯 Goals</h4>
				<h4 className="text-xl font-normal leading-10">🔁 Routines</h4>
				<h4 className="text-xl font-normal leading-10">📅 Schedule</h4>
			</div>
			<br />
			<p>Feedback? Reach out directly or email darryl@myclarity.io</p>
		</>,
		<>
			<img
				className={isPlatform("desktop") ? "w-4/6" : "w-full"}
				src={"assets/rocket.jpg"}
				alt="Rocket"
			/>
			<IonButton
				// routerLink={
				// 	(props.onFinished as String) !== undefined
				// 		? (props.onFinished as string)
				// 		: undefined
				// }
				// routerDirection={
				// 	(props.onFinished as String) !== undefined
				// 		? "root"
				// 		: undefined
				// }
				onClick={async () => {
					if (
						authContext.profileData &&
						!authContext.profileData.welcomeRead
					) {
						await authContext
							.updateProfile({ welcomeRead: true })
							.then(() => {
								console.log("welcome read");
							})
							.catch((e) => {
								console.log(e);
							});
					}

					if (typeof props.onFinished == "function") {
						(props.onFinished as () => void)();
					} else {
						history.replace(props.onFinished as string);
					}
				}}
			>
				Get Started
			</IonButton>
		</>,
	];

	return (
		<>
			<Swiper
				className="w-full h-full"
				navigation={isPlatform("desktop") ? true : false}
				pagination={{ clickable: true }}
				allowTouchMove={isPlatform("desktop") ? false : true}
			>
				{slides.map((slideContent, index) => (
					<SwiperSlide
						className={
							"h-full flex flex-col flex-nowrap items-center text-center justify-center " +
							(isPlatform("desktop") ? "p-16 pt-8" : "p-8")
						}
						key={index}
						virtualIndex={index}
					>
						{slideContent}
					</SwiperSlide>
				))}
			</Swiper>
		</>
	);
}
