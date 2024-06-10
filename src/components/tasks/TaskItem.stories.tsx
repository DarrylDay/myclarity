import PageDecorator from "@components/page/PageDecorator.stories";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import TaskItem from "./TaskItem";

export default {
	component: TaskItem,
	parameters: {
		layout: "centered",
	},
} as ComponentMeta<typeof TaskItem>;

const Template: ComponentStory<typeof TaskItem> = (args) => (
	<PageDecorator>
		<TaskItem {...args} />
	</PageDecorator>
);

export const Story = Template.bind({});
Story.args = {
	task: {
		name: "Test Task",
		uid: "awegfa243ggagreg3g",
		createdAt: -1,
		completed: false,
		completedDate: "",
		completedTime: -1,
		listUID: "Task",
		priority: false,
		todayEpochDays: -1,
		today: false,
		createdDate: "Friday",
		toggleToday: () => {},
		validate: () => false,
	},
	selected: false,
	selectedListURL: "",
	updateTask: (t) => {},
	deleteTask: (t) => {},
};
