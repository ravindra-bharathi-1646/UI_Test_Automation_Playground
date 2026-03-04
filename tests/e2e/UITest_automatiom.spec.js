import { test, expect } from "@playwright/test";
import { UIActionsPage } from "../helper/UIActionsPage.js";
import { InteractiveElementsPage } from "../helper/InteractiveElementsPage.js";
import path from "path";
import dotenv from "dotenv";
import { ControlsPage } from "../helper/ControlsPage.js";
dotenv.config();

test.describe("UI Test Automation", async () => {
  test.beforeEach(async ({ page }) => {
    const url = process.env.url;
    console.log("page Redirect Url : ", url);
    await page.goto(url);
  });

  test.afterEach(async ({ page }) => {
    await page.goBack();
    console.log("Navigated back to the home page");
    await page.close();
    console.log("page closed");
  });

  // Click on the "Dynamic ID" link and interact with the button
  test("Dynamic ID", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickDynamicLink();
    await helper.clickDynamicButton();
    console.log("Button with Dynamic ID clicked");
  });

  // Click on the "Class Attribute" link and interact with the button
  test("Class Attribute", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickAttributeLink();
    await helper.clickAttributeButton();
    console.log("Button with Class Attribute clicked");
    new UIActionsPage(page);
  });

  // click on the "Load delay" link and interact with the button
  test("Load Delay", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickLoadDelayLink();
    await helper.clickLoadDelayButton();
    await expect(helper.loadDelayButton).toBeVisible();
    console.log("Button Appearing After Delay clicked");
    new UIActionsPage(page);
  });

  // Click on the "Hidden Layers" link and interact with the button
  test("Hidden Layers", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickHiddenLayersLink();
    await helper.clickHiddenLayersButton();
    await expect(helper.hiddenLayersButton.first()).toBeVisible();
    console.log("Button clicked");
    new UIActionsPage(page);
  });

  // Click on the "AJAX Data" link and interact with the button
  test("AJAX Data", async ({ page }) => {
    test.setTimeout(60000);
    const helper = new UIActionsPage(page);
    await helper.clickAjaxDataLink();
    await helper.clickAjaxDataButton();
    await page.waitForLoadState("networkidle");
    console.log("Data loaded with AJAX get request");
    new UIActionsPage(page);
  });

  // Click on the "Client Side Delay" link and interact with the button
  test("Client Side Delay", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickClientSideDelayLink();
    await helper.clickClientSideDelayButton();
    await expect(helper.clientSideDelayButton).toBeVisible();
    console.log("Button Triggering Client Side Logic clicked");
    new UIActionsPage(page);
  });

  // Click on the "Click" link and interact with the button
  test("Click", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickClickLink();
    await helper.clickClickButton();
    console.log("Button That Ignores DOM Click clicked");
    new UIActionsPage(page);
  });

  // Click on the "Text Input" link and interact with the textbox and button
  test("Text Input", async ({ page }) => {
    test.setTimeout(60000);
    const helper = new UIActionsPage(page);
    await helper.clickTextInputLink();
    await helper.textInputTextbox.fill("Test");
    await helper.clickTextInputButton();
    await expect(helper.textInputButton1).toBeVisible();
    console.log("Button changed its name based on Input Value and clicked");
    new UIActionsPage(page);
  });

  // Click on the "Scrollbars" link and interact with the button
  test("Scrollbars", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.scrollbarsLinks();
    await expect(helper.hidingButton).toBeVisible();
    await helper.clickHidingButton();
    console.log("Button clicked");
    new UIActionsPage(page);
  });

  // Click on the "Dynamic Table" Verify cell value in a dynamic table
  test("Dynamic Table", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickDynamicTableLink();
    const expectedCpu = await helper.getExpectedCpuFromWarning();
    const actualCpu = await helper.getCpuValueForBrowser("Chrome");
    expect(actualCpu).toBe(expectedCpu);
    console.log("Table CPU verified for Chrome value: " + actualCpu);
    new UIActionsPage(page);
  });

  // Click on the "Verify Text" Finding an element by displayed text has nuances
  test("Verify Text", async ({ page }) => {
    const helper = new UIActionsPage(page);
    await helper.clickVerifyTextLink();
    await expect(helper.welcomeText).toBeVisible();
    console.log("Welcome UserName! verified");
    new UIActionsPage(page);
  });

  //click on the "progress bar" link and interact with the progress bar
  test("Progress Bar", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickProgressBarLink();
    await helper.startProgress();
    await helper.stopAtTargetValue(75);
    const finalValue = await helper.getProgressValue();
    console.log("Progress Bar Value:", finalValue + "%");
    new UIActionsPage(page);
  });

  //click on the "visibility" link and interact with the buttons
  test("Visibility", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickVisibilityLink();
    await helper.clickHide();
    const status = await helper.getVisibilityStatus();
    Object.entries(status).forEach(([key, value]) => {
      console.log(`${key} button is ${value ? "visible" : "not visible"}`);
    });
    new UIActionsPage(page);
  });

  // click on the "sample app" link and interact with the form
  test("Sample App", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickSampleApp();
    await helper.fillSampleAppUserName("testuser");
    await helper.fillSampleAppPassword("pwd");
    await helper.clickSampleAppLoginButton();
    await expect(helper.welcomeText).toBeVisible();
    console.log(helper.welcomeTextVerified + " is verified");
    new UIActionsPage(page);
  });

  // Click on the "Mouse Over" link and interact with the button
  test("Mouse Over", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickMouseOver();
    await helper.clickClickMe();
    await helper.expectTheLinkAboveClicked1();
    await helper.clickClickMe();
    await helper.expectTheLinkAboveClicked2();
    console.log(helper.theLinkAboveClicked2.textContent() + " is verified");
    new UIActionsPage(page);
  });

  // Click on the "Non-Breaking Space" link and interact with the button
  test("Non-Breaking Space", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickNonBreakingSpaceLink();
    await helper.clickMyButton();
    await helper.expectMyButtonToBeVisible();
    console.log("My Button clicked");
    new UIActionsPage(page);
  });

  // Click on the "Overlapped Element" link and interact with the button
  test("Overlapped Element", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickOverlappedElementLink();
    await helper.fillIdTextbox("test");
    await helper.fillNameTextbox("text");
    console.log("Overlapped Element verified");
    new UIActionsPage(page);
  });

  // Click on the "Alerts" link and interact with the alert
  test("Alerts", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickAlertsLink();
    await helper.handleAlert("dismiss");
    await helper.handleAlert("dismiss");
    await helper.handleConfirm("dismiss");
    await helper.handlePrompt("Test Input", "accept");
    new UIActionsPage(page);
  });

  // Click File Upload link and interact with the file upload input
  test("File Upload", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickFileUploadLink();
    await helper.uploadFile(path.resolve("TestData/testFile.txt"));
    await helper.expectFileToBeVisible("testFile.txt");
    await helper.clearFileInput();
    await helper.expectFileToBeVisible("testFile.txt");
    console.log("File Upload verified");
    new UIActionsPage(page);
  });

  //Click on the "Animation Button" link and interact with the button
  test("Animated Button", async ({ page }) => {
    const helper = new InteractiveElementsPage(page);
    await helper.clickAnimatedButtonLink();
    await helper.clickStartAnimationButton();
    await helper.expectMovingTargetButtonToBeVisible();
    await helper.clickMovingTargetButton();
    console.log("Animated Button verified");
    new UIActionsPage(page);
  });

  // Click on the "Disabled Input" link and interact with the button
  test("Disabled Input", async ({ page }) => {
    const helper = new ControlsPage(page);
    await helper.clickDisabledInputLink();
    await helper.fillEditField("test");
    await helper.clickEnableButton();
    await helper.expectEditFieldToBeDisabled();
    await helper.expectEditFieldToBeEnabled();
    console.log("Disabled Input verified");
    new UIActionsPage(page);
  });

  //Click on the "Auto Wait" link and interact with the button
  test("Auto Wait", async ({ page }) => {
    test.setTimeout(60000);
    const helper = new ControlsPage(page);
    await helper.clickAutoWaitLink();
    for (const delay of [3, 5]) {
      await helper.toggleVisibleCheckbox();
      await helper.applyDelay(delay);
      await expect(helper.targetButton).not.toBeVisible();
      await expect(helper.targetButton).toBeVisible({ timeout: 6000 });
    }
    for (const delay of [3, 5, 10]) {
      await helper.toggleEnabledCheckbox();
      await helper.applyDelay(delay);
      await expect(helper.targetButton).toBeDisabled();
      await expect(helper.targetButton).toBeEnabled({ timeout: 12000 });
    }
    console.log("Auto Wait verified");
    new UIActionsPage(page);
  });
});
