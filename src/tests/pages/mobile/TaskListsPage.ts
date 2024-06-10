import { Locator, Page, TestInfo } from '@playwright/test';
import AuthPage from '@tests/pages/AuthPage';

export class TaskListsPage extends AuthPage {
  
    public static async Create(page:Page, testConfig: TestInfo, username: string, password: string) {
        const newPage = new TaskListsPage(page, testConfig, username, password);
        await newPage.loginAndGoto();
        return newPage;
    }

    protected url: string = "tasks";

    constructor(page: Page, testConfig: TestInfo, username: string, password: string) {
        super(page, testConfig, username, password);
    }
}