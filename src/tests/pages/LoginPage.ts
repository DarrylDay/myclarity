import { Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@tests/pages/BasePage';
import { SignupPage } from '@tests/pages/SignupPage';
import { ForgotPasswordPage } from '@tests/pages/ForgotPasswordPage';

export class LoginPage extends BasePage {
  
  public static async Create(page:Page, testConfig: TestInfo) {
    const newPage = new LoginPage(page, testConfig);
    await newPage.goto();
    await page.locator('text=Login to your Account').isVisible();
    return newPage;
  }

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly forgotPasswordButton: Locator;
  readonly signupButton: Locator;

  protected url: string = "login";

  constructor(page: Page, testConfig: TestInfo) {
    super(page, testConfig);
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.signInButton = page.locator('text="Sign in"');
    this.forgotPasswordButton = page.locator('text="Forgot password?"');
    this.signupButton = page.locator('text=Sign up');
  }

  async forgotPassword() {
      return await this.pageTransition(ForgotPasswordPage, this.forgotPasswordButton.click());
  }

  async signup() {
      return await this.pageTransition(SignupPage, this.signupButton.click())
  }
}