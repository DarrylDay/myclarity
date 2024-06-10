import { Page, TestInfo, expect } from '@playwright/test';

export async function login(page: Page, testConfig: TestInfo, username: string, password: string): Promise<void> {

    // Cannot add login page, will cause circular dependency and give errors

    await page.goto('/login');
    await page.locator('input[placeholder="Email"]').fill(username);
    await page.locator('input[placeholder="Password"]').fill(password);

    await Promise.all([
        page.waitForNavigation(),
        page.locator('text="Sign in"').click(),
    ]);
}

export async function waitForPageTransition(page:Page, testConfig:TestInfo, action:Promise<void>, 
    dir:"forward" | "backward" | "root" | "refresh" = "forward", url?:string) {
    if (testConfig.project.name.includes("mobile")) {

        const pageCount = await page.locator('.ion-page').count();
        const hiddenCount = await page.locator('.ion-page-hidden').count();

        if (dir == "forward") {
            await action;
            await expect(page.locator('.ion-page-hidden')).toHaveCount(hiddenCount+1);
        } else if (dir == "backward" && pageCount > 1) {
            await action;
            await expect(page.locator('.ion-page')).toHaveCount(pageCount-1);
        } else if (dir == "root") {
            await action;
            await expect(page.locator('.ion-page')).toHaveCount(2);
        } else {
            await Promise.all([
                page.waitForNavigation({url:url}),
                action
              ]);
        }
    }
    else {
        await Promise.all([
            page.waitForNavigation({url:url}),
            action
          ]);
    }
}