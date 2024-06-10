import { test, expect, Page } from '@playwright/test';
import { ProfilePage } from '@tests/pages/ProfilePage';

test('profile page loads correctly', async ({ page }, testConfig) => {
    const profilePage = await ProfilePage.Create(page, testConfig, "qa+" + testConfig.project.name  + "@myclarity.io", "ilovemrmittens");
    await profilePage.emailInput.isVisible();
    await profilePage.firstNameInput.isVisible();
    await profilePage.lastNameInput.isVisible();
    await profilePage.birthdayInput.isVisible();
    await profilePage.marketingConsentToggle.isVisible();
});

test('change user info', async ({ page }, testConfig) => { 

    const profilePage = await ProfilePage.Create(page, testConfig, "darryl@myclarity.io", "ilovemrmittens");
    await profilePage.firstNameInput.fill("Polar");
    await profilePage.lastNameInput.fill("LeChonk");
    //await profilePage.birthdayInput.fill("03/03/1993" , {force:true});
    await profilePage.marketingConsentToggle.click();
    await profilePage.saveChangesButton.click();
    await profilePage.locator("text=Changes Saved").isVisible();
    await page.reload();
    await expect(profilePage.firstNameInput).toHaveValue("Polar");
    await expect(profilePage.lastNameInput).toHaveValue("LeChonk");
    //await expect(profilePage.birthdayInput).toHaveText("03/03/1993");
    await expect(profilePage.marketingConsentToggle).toBeChecked({checked:false});

});