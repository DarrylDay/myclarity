import { Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@tests/pages/BasePage';
import { LoginPage } from '@tests/pages/LoginPage';

export class ForgotPasswordPage extends BasePage {
  
  public static async Create(page:Page, testConfig: TestInfo) {
    const newPage = new ForgotPasswordPage(page, testConfig);
    await newPage.goto();
    return newPage;
  }

  readonly emailInput: Locator;
  readonly submitButton: Locator;

  protected url: string = "forgot-password";

  constructor(page: Page, testConfig: TestInfo) {
    super(page, testConfig);
    this.emailInput = page.locator('input[placeholder="Email"] >> visible=true');
    this.submitButton = page.locator('text="Submit" >> visible=true');
  }

  async login() {
    return await this.pageTransition(LoginPage, this.page.locator('text="Login"').click(), "backward");
}
}