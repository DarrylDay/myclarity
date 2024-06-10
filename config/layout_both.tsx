import { isPlatform } from "@ionic/react";
import AppDesktop from "@pages/AppDesktop";
import AppMobile from "@pages/AppMobile";

export default function App() {
	return isPlatform("mobile") ? <AppMobile /> : <AppDesktop />;
}
