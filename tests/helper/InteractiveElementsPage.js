import { expect } from "@playwright/test";

export class InteractiveElementsPage {
  constructor(page) {
    this.page = page;
    this.progressBarLink = page.getByRole("link", { name: "Progress Bar" });
    this.startButton = page.getByRole("button", { name: "Start" });
    this.stopButton = page.getByRole("button", { name: "Stop" });
    this.progressBar = page.locator("#progressBar");
    this.visibilityLink = page.getByRole("link", { name: "Visibility" });
    this.hideButton = page.getByRole("button", { name: "Hide" });
    this.removedButton = page.getByRole("button", { name: "Removed" });
    this.zeroWidthButton = page.getByRole("button", { name: "Zero Width" });
    this.overlappedButton = page.getByRole("button", { name: "Overlapped" });
    this.opacityButton = page.getByRole("button", { name: "Opacity" });
    this.visibilityHiddenButton = page.getByRole("button", {
      name: "Visibility Hidden",
    });
    this.displayNoneButton = page.getByRole("button", {
      name: "Display None",
    });
    this.offscreenButton = page.getByRole("button", { name: "Offscreen" });

    this.sampleAppLink = page.getByRole("link", { name: "Sample App" });
    this.sampleAppUserName = page.getByRole("textbox", { name: "User Name" });
    this.sampleAppPassword = page.getByRole("textbox", { name: "********" });
    this.sampleAppLoginButton = page.getByRole("button", { name: "Log in" });
    this.welcomeText = page.getByText("Welcome, testuser!");
    this.welcomeTextVerified = "Welcome, testuser!";
    this.mouseOver = this.page.getByRole("link", { name: "Mouse Over" });
    this.clickMe = this.page.getByText("Click me");
    this.linkButton = this.page.getByText("Link Button");
    this.theLinkAboveClicked1 = this.page.getByText("The link above clicked 1");
    this.theLinkAboveClicked2 = this.page.getByText("The link above clicked 2");
    this.nonBreakingSpaceLink = this.page.getByRole("link", {
      name: "Non-Breaking Space",
    });
    this.myButton = this.page.getByRole("button", { name: "My Button" });
    this.overlappedElementLink = this.page.getByRole("link", {
      name: "Overlapped Element",
    });
    this.idTextbox = this.page.getByRole("textbox", { name: "Id" });
    this.nameTextbox = this.page.getByRole("textbox", { name: "Name" });
    this.alertsLink = this.page.getByRole("link", { name: "Alerts" });
    this.alertButton = this.page.getByRole("button", { name: "Alert" });
    this.confirmButton = this.page.getByRole("button", { name: "Confirm" });
    this.promptButton = this.page.getByRole("button", { name: "Prompt" });
    this.fileUploadLink = this.page.getByRole("link", { name: "File Upload" });
    this.frame = this.page.frameLocator("iframe");
    this.fileInput = this.frame.locator('input[type="file"]');
    this.animatedButtonLink = page.getByRole("link", {
      name: "Animated Button",
    });
    this.startAnimationButton = page.getByRole("button", {
      name: "Start Animation",
    });
    this.movingTargetButton = page.getByRole("button", {
      name: "Moving Target",
    });
  }

  async clickProgressBarLink() {
    await this.progressBarLink.click();
  }

  async startProgress() {
    await this.startButton.click();
  }

  async stopAtTargetValue(targetValue) {
    await this.page.waitForFunction((value) => {
      const progress = document.querySelector("#progressBar");
      const current = Number(progress?.getAttribute("aria-valuenow"));
      return current >= value;
    }, targetValue);

    await this.stopButton.click();
  }

  async getProgressValue() {
    const value = await this.progressBar.getAttribute("aria-valuenow");
    if (!value) throw new Error("Progress value not found");
    return value;
  }

  async clickVisibilityLink() {
    await this.visibilityLink.click();
  }

  async clickHide() {
    await this.hideButton.click();
  }

  async getVisibilityStatus() {
    return {
      removed: await this.removedButton.isVisible(),
      zeroWidth: await this.zeroWidthButton.isVisible(),
      overlapped: await this.overlappedButton.isVisible(),
      opacity: await this.opacityButton.isVisible(),
      visibilityHidden: await this.visibilityHiddenButton.isVisible(),
      displayNone: await this.displayNoneButton.isVisible(),
      offscreen: await this.offscreenButton.isVisible(),
    };
  }

  async clickSampleApp() {
    await this.sampleAppLink.click();
  }

  async fillSampleAppUserName(value) {
    await this.sampleAppUserName.fill(value);
  }

  async fillSampleAppPassword(value) {
    await this.sampleAppPassword.fill(value);
  }

  async clickSampleAppLoginButton() {
    await this.sampleAppLoginButton.click();
  }

  async clickMouseOver() {
    await this.mouseOver.click();
  }

  async clickClickMe() {
    await this.clickMe.click();
  }

  async clickLinkButton() {
    await this.linkButton.click();
  }

  async expectTheLinkAboveClicked1() {
    await expect(this.theLinkAboveClicked1).toBeVisible();
  }

  async expectTheLinkAboveClicked2() {
    await expect(this.theLinkAboveClicked2).toBeVisible();
  }

  async clickNonBreakingSpaceLink() {
    await this.nonBreakingSpaceLink.click();
  }

  async clickMyButton() {
    await this.myButton.click();
  }

  async expectMyButtonToBeVisible() {
    await expect(this.myButton).toBeVisible();
  }

  async clickOverlappedElementLink() {
    await this.overlappedElementLink.click();
  }

  async fillIdTextbox(value) {
    await this.idTextbox.fill(value);
  }

  async fillNameTextbox(value) {
    await this.nameTextbox.fill(value);
  }

  async clickAlertsLink() {
    await this.alertsLink.click();
  }

  async handleAlert(action = "dismiss") {
    this.page.once("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);

      if (action === "accept") {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });

    await this.alertButton.click();
  }

  async handleConfirm(action = "dismiss") {
    this.page.once("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);

      if (action === "accept") {
        await dialog.accept();
      } else {
        await dialog.dismiss();
      }
    });

    await this.confirmButton.click();
  }

  async handlePrompt(inputText = "", action = "accept") {
    this.page.once("dialog", async (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);

      if (action === "accept") {
        await dialog.accept(inputText);
      } else {
        await dialog.dismiss();
      }
    });

    await this.promptButton.click();
  }

  async clickFileUploadLink() {
    await this.fileUploadLink.click();
  }

  async uploadFile(filePath) {
    await this.fileInput.setInputFiles(filePath);
  }

  async expectFileToBeVisible(fileName) {
    await expect(this.frame.getByText(fileName)).toBeVisible();
  }

  async clearFileInput() {
    await this.fileInput.setInputFiles([]);
  }

  async clickAnimatedButtonLink() {
    await this.animatedButtonLink.click();
  }

  async clickStartAnimationButton() {
    await this.startAnimationButton.click();
  }

  async expectMovingTargetButtonToBeVisible() {
    await expect(this.movingTargetButton).toBeVisible({
      timeout: 7000,
    });
  }

  async clickMovingTargetButton() {
    await this.movingTargetButton.click();
  }
}
