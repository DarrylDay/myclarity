import { Page, TestInfo } from '@playwright/test';
import BasePage from '@tests/pages/BasePage';
import { login } from '@tests/utils';

export default abstract class AuthPage extends BasePage {

    readonly username: string;
    readonly password: string;

    constructor(page: Page, testConfig: TestInfo, username: string, password: string) {
        super(page, testConfig);
        this.username = username;
        this.password = password;
    }

    async loginAndGoto(waitUntil: "networkidle" | "load" | "domcontentloaded" | "commit" | undefined = "load"): Promise<void> {
        // TODO: Check if already logged in?
        await login(this.page, this.testConfig, this.username, this.password);
        await this.goto(waitUntil);
    }

}