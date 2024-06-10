import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import BackArrow from "./BackArrow";

export default {
	component: BackArrow,
	parameters: {
		layout: "centered",
	},
} as ComponentMeta<typeof BackArrow>;

const Template: ComponentStory<typeof BackArrow> = (args) => (
	<BackArrow {...args} />
);

export const Story = Template.bind({});
Story.args = {};
