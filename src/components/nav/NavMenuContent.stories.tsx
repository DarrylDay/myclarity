import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import NavMenuContent from "./NavMenuContent";
import PageDecorator from "@components/page/PageDecorator.stories";

export default {
	component: NavMenuContent,
	args: {
		onMenuItemClick: "() => void" as unknown as any,
	},
} as ComponentMeta<typeof NavMenuContent>;

const Template: ComponentStory<typeof NavMenuContent> = (args) => (
	<PageDecorator>
		<NavMenuContent {...args} />
	</PageDecorator>
);

export const Story = Template.bind({});
Story.args = {};
