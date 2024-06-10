import { Locator, Page, TestInfo } from '@playwright/test';
import AuthPage from '@tests/pages/AuthPage';

export class ProfilePage extends AuthPage {
  
    public static async Create(page:Page, testConfig: TestInfo, username: string, password: string) {
        const newPage = new ProfilePage(page, testConfig, username, password);
        await newPage.loginAndGoto();
        return newPage;
    }

  readonly emailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly birthdayInput: Locator;
  readonly marketingConsentToggle: Locator;
  readonly saveChangesButton: Locator;

  protected url: string = "profile";

  constructor(page: Page, testConfig: TestInfo, username: string, password: string) {
    super(page, testConfig, username, password);
    this.emailInput = page.locator('input:near(:text("Email")) >> visible=true >> nth=0');
    this.firstNameInput = page.locator('input:near(:text("First Name")) >> visible=true >> nth=0');
    this.lastNameInput = page.locator('input:near(:text("Last Name")) >> visible=true >> nth=0');
    this.birthdayInput = page.locator('input:near(:text("Birthday")) >> visible=true >> nth=0');
    this.marketingConsentToggle = page.locator('id=profile-marketing-consent');
    this.saveChangesButton = page.locator('button:near(:text("Save Changes")) >> nth=0');
  }


}