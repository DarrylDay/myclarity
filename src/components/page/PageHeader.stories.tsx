import { ComponentStory, ComponentMeta } from "@storybook/react";
import PageDecorator from "./PageDecorator.stories";

import PageHeader from "./PageHeader";

export default {
	component: PageHeader,
} as ComponentMeta<typeof PageHeader>;

const Template: ComponentStory<typeof PageHeader> = (args) => (
	<PageDecorator>
		<PageHeader {...args} />
	</PageDecorator>
);

export const Story = Template.bind({});
Story.args = {};
