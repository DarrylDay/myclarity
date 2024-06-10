import { ComponentStory, ComponentMeta } from "@storybook/react";

import LoadingOverlay from "./LoadingOverlay";
import { Route } from "react-router";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

export default {
	component: LoadingOverlay,
	parameters: {
		layout: "fullscreen",
	},
} as ComponentMeta<typeof LoadingOverlay>;

const Template: ComponentStory<typeof LoadingOverlay> = (args) => (
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet id="main-content">
				<Route>
					<LoadingOverlay />
				</Route>
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
);

export const Story = Template.bind({});
Story.args = {};
