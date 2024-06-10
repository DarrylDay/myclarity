import { test, expect, Page, TestInfo } from '@playwright/test';
import { TasksPage } from '@tests/pages/desktop/TasksPage';

const loginTaskPage = async (page: Page, testConfig: TestInfo) => {
    return await TasksPage.Create(page, testConfig, "qa+" + testConfig.project.name  + "@myclarity.io", "ilovemrmittens");
}

test('tasks page loads correctly', async ({ page }, testConfig) => {
    const tasksPage = await loginTaskPage(page, testConfig);
    await tasksPage.locator('text="myTasks"').isVisible();

    await tasksPage.getTaskListLocator("Today").isVisible();
    await tasksPage.getTaskListLocator("Priority").isVisible();
    await tasksPage.getTaskListLocator("Tasks").isVisible();
    await tasksPage.newTaskListItem.isVisible();

    await tasksPage.newTaskItem.isVisible();
});

test('user can create a new task', async ({ page }, testConfig) => {
    const tasksPage = await loginTaskPage(page, testConfig);
    await tasksPage.addNewTask("This is a test task");
});

test.skip('user can toggle a task', async ({ page }, testConfig) => {
    const tasksPage = await loginTaskPage(page, testConfig);
    const taskName = "Toggle Me";
    await tasksPage.toggleTaskCheckbox(taskName);
    await expect(tasksPage.getTaskCheckboxLocator(taskName)).toBeChecked({checked:true});
    await tasksPage.toggleTaskCheckbox(taskName);
    await expect(tasksPage.getTaskCheckboxLocator(taskName)).toBeChecked({checked:false});
});

test.skip('user can delete a task', async ({ page }, testConfig) => {
    const tasksPage = await loginTaskPage(page, testConfig);
    const taskName = "Delete Me";
    await tasksPage.selectTask(taskName);
    await page.locator('id=task-delete-button').click();
    await page.locator('id=alert-task-delete >> text="Delete Task"').isVisible();
    await page.locator('button:has-text("Delete")').click();
    await page.locator('id=alert-task-delete').isHidden();
    await tasksPage.taskNotPresent(taskName);
});