import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import Logo from "./Logo";

export default {
	component: Logo,
} as ComponentMeta<typeof Logo>;

const Template: ComponentStory<typeof Logo> = (args) => <Logo {...args} />;

export const Story = Template.bind({});
Story.args = {};
