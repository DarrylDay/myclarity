import { expect, Page, TestInfo } from '@playwright/test';
import { waitForPageTransition } from "@tests/utils";

export default abstract class BasePage {

    readonly page: Page;
    readonly testConfig: TestInfo;

    protected abstract url: string;

    constructor(page: Page, testConfig: TestInfo) {
      this.page = page;
      this.testConfig = testConfig;
    }

    async pageTransition<TPage extends BasePage>(
        ctor: { new(page: Page, testConfig: TestInfo): TPage ;}, 
        action:Promise<void>, 
        dir:"forward" | "backward" | "root" | "refresh" = "forward", 
        url?:string) {
        await waitForPageTransition(this.page, this.testConfig, action, dir, url);
        return new ctor(this.page, this.testConfig);
    }

    async waitForPageTransition(
        action:Promise<void>, 
        dir:"forward" | "backward" | "root" | "refresh" = "forward", 
        url?:string) {
        await waitForPageTransition(this.page, this.testConfig, action, dir, url);
    }
  
    async screenshot(name: string): Promise<void> {
      await this.page.screenshot({ path: 'screenshots/' + this.url + '/' + name + '-' + this.testConfig.project.name + '.png' });
    }
  
    async goto(waitUntil: "networkidle" | "load" | "domcontentloaded" | "commit" | undefined = "load"): Promise<void> {
        let attempt = 0;
        while (true) {
            try {
                await this.page.goto('/' + this.url, {waitUntil: waitUntil});
                return;
            }
            catch (e) {
                attempt += 1;
                if (attempt > 3) throw e;
            }
        }
    }

    expectCurrentPage() {
        expect((new URL(this.page.url())).pathname, "Page URL mismatch").toBe("/" + this.url);
    }

    locator(selector: string) {
        this.expectCurrentPage();
        return this.page.locator(selector);
    }


}