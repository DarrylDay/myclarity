import AuthPage from '@tests/pages/AuthPage';
import { Locator, Page, TestInfo } from '@playwright/test';

export class WelcomePage extends AuthPage {
  
  public static async Create(page:Page, testConfig: TestInfo, username: string, password: string) {
    const newPage = new WelcomePage(page, testConfig, username, password);
    await newPage.loginAndGoto();
    return newPage;
  }

  protected url: string = "help";

  constructor(page: Page, testConfig: TestInfo, username: string, password: string) {
    super(page, testConfig, username, password);
  }
}