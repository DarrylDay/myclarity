import { ComponentStory, ComponentMeta } from "@storybook/react";
import PageDecorator from "@components/page/PageDecorator.stories";

import LoginPage from "./LoginPage";

export default {
	component: LoginPage,
} as ComponentMeta<typeof LoginPage>;

const Template: ComponentStory<typeof LoginPage> = (args) => (
	<PageDecorator>
		<LoginPage />
	</PageDecorator>
);

export const Story = Template.bind({});
Story.args = {};
