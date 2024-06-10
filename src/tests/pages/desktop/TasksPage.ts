import { Locator, Page, TestInfo, expect } from '@playwright/test';
import AuthPage from '@tests/pages/AuthPage';

const taskItemSelector: String = "#task-item-desktop"
const taskListItemSelector: String = "#task-list-item"

export class TasksPage extends AuthPage {
  
  public static async Create(page:Page, testConfig: TestInfo, username: string, password: string) {
    const newPage = new TasksPage(page, testConfig, username, password);
    await newPage.loginAndGoto();
    return newPage;
  }

  readonly newTaskItem: Locator;
  readonly newTaskListItem: Locator;

  protected url: string = "tasks";

  constructor(page: Page, testConfig: TestInfo, username: string, password: string) {
    super(page, testConfig, username, password);
    this.newTaskItem = page.locator('id=new-task-item');
    this.newTaskListItem = page.locator('id=new-task-list-item');
  }

  getTaskLocator(taskName:string) {
    return this.page.locator(taskItemSelector + ' >> ion-label:has-text("' + taskName + '")');
  }

  getTaskListLocator(taskListName:string) {
    //return this.page.locator(taskListItemSelector + ' >> ion-label:has-text("' + taskListName + '")');
    return this.page.locator(taskListItemSelector + ' >> text=' + taskListName + '"');
  }

  getTaskCheckboxLocator(taskName:string) {
    return this.page.locator(taskItemSelector + ' >> ion-checkbox:left-of(:text("' + taskName + '"))');
  }

  async addNewTask(taskName:string) {
      await this.newTaskItem.focus();
      await this.page.locator('input[placeholder="New Task"]').fill(taskName, {force:true});
      await this.newTaskItem.press('Enter');
      await this.getTaskLocator(taskName).isVisible();
  }

  async selectTask(taskName:string) {
    await this.getTaskLocator(taskName).click();
  }

  async toggleTaskCheckbox(taskName:string) {
    await this.getTaskCheckboxLocator(taskName).click();
  }

  async taskNotPresent(taskName: string) {
    await expect(this.getTaskLocator(taskName)).toHaveCount(0);
  }
}