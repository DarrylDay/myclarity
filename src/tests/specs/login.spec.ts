import { test, expect, chromium } from '@playwright/test';
import { waitForPageTransition } from "@tests/utils";
import { LoginPage } from '@tests/pages/LoginPage';

// Login
test('login page loads correctly', async ({ page }, testConfig) => {
    const loginPage = await LoginPage.Create(page, testConfig);
    await loginPage.emailInput.isVisible();
    await loginPage.passwordInput.isVisible();
    await loginPage.locator('text=Forgot password?').isVisible();
    await loginPage.locator('text=Don\'t have an account? Sign up').isVisible();
    await loginPage.locator('text=- Or sign in with -').isVisible();
});

test('user can login with email and password', async ({ page }, testConfig) => {
    const loginPage = await LoginPage.Create(page, testConfig);
    await loginPage.screenshot("empty");
    await loginPage.emailInput.fill('qa+' + testConfig.project.name + '@myclarity.io');
    await loginPage.passwordInput.fill('ilovemrmittens');
    await loginPage.screenshot("filled");
    await waitForPageTransition(page, testConfig, page.locator('text="Sign in"').click(), "refresh", "**/tasks**");

    await page.goto('/tasks/tasks');

    await page.locator('text="myTasks", text=Welcome to').isVisible();
});

test('user cannot login with invalid email and password credentials', async ({ page }, testConfig) => {
    const loginPage = await LoginPage.Create(page, testConfig);
    await loginPage.emailInput.fill('elon@telsa.com');
    await loginPage.passwordInput.fill('iamthemuskman');
    await loginPage.signInButton.click();

    await loginPage.locator('text="Incorrect username or password."').isVisible();
    await loginPage.screenshot("login-invalid");
});

test.skip('user can login with google', async ({ page }) => {
});

test.skip('user can login with facebook', async ({ page }) => {
});

test.skip('user can login with twitter', async ({ page }) => {
});

// Password reset
test('user can reset their password', async ({ page, request }, testConfig) => {

    const email = "darryl+passwordreset@myclarity.io";

    let loginPage = await LoginPage.Create(page, testConfig);
    const forgotPasswordPage = await loginPage.forgotPassword();

    await forgotPasswordPage.locator('text="Password Reset"').isVisible();
    await forgotPasswordPage.screenshot("empty");
    await forgotPasswordPage.emailInput.fill(email);
    await forgotPasswordPage.submitButton.click();
    await forgotPasswordPage.locator('text="Email Sent"').isVisible();
    await forgotPasswordPage.screenshot("sent");

    const oobCodesResponse = await request.get('http://localhost:9099/emulator/v1/projects/clarity-dev-1c905/oobCodes');
    const oobCodesJson:any = await oobCodesResponse.json();

    const userJson:any = oobCodesJson.oobCodes.find(function(element:any) {return element.email == email});

    expect(userJson);

    const resetResponse = await request.get(userJson.oobLink + "&newPassword=testing123");
    const resetJson:any = await resetResponse.json();

    expect(resetJson.success == "The password has been successfully updated.");
    expect(resetJson.email == "darryl@myclarity.io");

    loginPage = await forgotPasswordPage.login();

    await loginPage.locator('text=Login to your Account').isVisible();
    await loginPage.emailInput.fill(email);
    await loginPage.passwordInput.fill('testing123');
    await waitForPageTransition(page, testConfig, page.locator('text="Sign in"').click(), "refresh");

    await page.goto('/tasks/tasks');

    await page.locator('text="myTasks", text=Welcome to').isVisible();

});

// Sign up
test('user can sign up with email and password', async ({ page }, testConfig) => {
    const loginPage = await LoginPage.Create(page, testConfig);
    const signupPage = await loginPage.signup();

    await signupPage.screenshot("empty");
    await signupPage.emailInput.fill('darryl+' + testConfig.project.name + '@myclarity.io');
    await signupPage.passwordInput.fill('ilovelilbean');
    await signupPage.confirmPasswordInput.fill('ilovelilbean');
    await signupPage.privacyPolicyToggle.click();
    await signupPage.screenshot("filled");
    await waitForPageTransition(page, testConfig, page.locator('ion-button:has-text("Sign up")').click(), "refresh");

    await page.locator('text="Welcome to myClarity"').isVisible();

});

test('sign up field validation works', async ({ page }, testConfig) => {
    const loginPage = await LoginPage.Create(page, testConfig);
    const signupPage = await loginPage.signup();

    await signupPage.signupButton.click();
    await signupPage.locator('text="Invalid email address."').isVisible();

    await signupPage.emailInput.fill('dummy@myclarity.io');
    await signupPage.signupButton.click();
    await signupPage.locator('text="Password is empty."').isVisible();

    await signupPage.passwordInput.fill('space space');
    await signupPage.signupButton.click();
    await signupPage.locator('text="Password must not contain whitespace."').isVisible();

    await signupPage.passwordInput.fill('test');
    await signupPage.signupButton.click();
    await signupPage.locator('text="Password must be greater than 7 characters."').isVisible();

    await signupPage.passwordInput.fill('ilovelilbean');
    await signupPage.signupButton.click();
    await signupPage.locator('text="Passwords do not match."').isVisible();

    await signupPage.confirmPasswordInput.fill('notthesame');
    await signupPage.signupButton.click();
    await signupPage.locator('text="Passwords do not match."').isVisible();

    await signupPage.confirmPasswordInput.fill('ilovelilbean');
    await signupPage.signupButton.click();
    await signupPage.locator('text="Must accept privacy policy."').isVisible();

    await signupPage.screenshot("validation");
});

test.skip('user can sign up with google', async ({ page }) => {

    const browser = await chromium.launch({
        headless: false,
        args: ["--disable-dev-shm-usage"],
    })
    const context = await browser.newContext({});
    const page2 = await context.newPage();

    await page2.goto('/login');
    await page2.locator('text=Login to your Account').isVisible();

    await page2.locator('text=Sign up').click();

    await page2.locator('id=SSO_Google').click();

    await page2.pause();

    // Google giving browser / app is unsafe?

});

test.skip('user can sign up with facebook', async ({ page }) => {
});

test.skip('user can sign up with twitter', async ({ page }) => {
});

