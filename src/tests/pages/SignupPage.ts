import { Locator, Page, TestInfo } from '@playwright/test';
import BasePage from '@tests/pages/BasePage';

export class SignupPage extends BasePage {
  
  public static async Create(page:Page, testConfig: TestInfo) {
    const newPage = new SignupPage(page, testConfig);
    await newPage.goto();
    return newPage;
  }

  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly privacyPolicyToggle: Locator;
  readonly signupButton: Locator;

  protected url: string = "signup";

  constructor(page: Page, testConfig: TestInfo) {
    super(page, testConfig);
    this.emailInput = page.locator('input[placeholder="Email"] >> visible=true');
    this.passwordInput = page.locator('input[placeholder="Password"] >> visible=true');
    this.confirmPasswordInput = page.locator('input[placeholder="Confirm password"] >> visible=true');
    this.privacyPolicyToggle = page.locator('id=privacy-policy-checkbox');
    this.signupButton = page.locator('ion-button:has-text("Sign up") >> visible=true');
  }

}