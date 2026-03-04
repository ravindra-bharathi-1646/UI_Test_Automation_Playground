import { expect } from "@playwright/test";

export class ControlsPage {
  constructor(page) {
    this.page = page;
    this.disabledInputLink = page.getByRole("link", { name: "Disabled Input" });
    this.editField = page.getByRole("textbox", { name: "Edit Field" });
    this.enableButton = page.getByRole("button", {
      name: "Enable Edit Field with 5",
    });
    this.autoWaitLink = page.getByRole("link", { name: "Auto Wait" });

    this.visibleCheckbox = page.getByRole("checkbox", { name: "Visible" });
    this.enabledCheckbox = page.getByRole("checkbox", { name: "Enabled" });

    this.apply3sButton = page.getByRole("button", { name: "Apply 3s" });
    this.apply5sButton = page.getByRole("button", { name: "Apply 5s" });
    this.apply10sButton = page.getByRole("button", { name: "Apply 10s" });

    this.targetButton = page.getByRole("button", { name: "Button" });
  }
  async clickDisabledInputLink() {
    await this.disabledInputLink.click();
  }
  async fillEditField(value) {
    await this.editField.fill(value);
  }
  async clickEnableButton() {
    await this.enableButton.click();
  }
  async expectEditFieldToBeDisabled() {
    await expect(this.editField).toBeDisabled();
  }
  async expectEditFieldToBeEnabled() {
    await expect(this.editField).toBeEnabled({ timeout: 6000 });
  }
  async clickAutoWaitLink() {
    await this.autoWaitLink.click();
  }

  async toggleVisibleCheckbox() {
    await this.visibleCheckbox.check();
    await this.visibleCheckbox.uncheck();
  }

  async toggleEnabledCheckbox() {
    await this.enabledCheckbox.check();
    await this.enabledCheckbox.uncheck();
  }

  async applyDelay(seconds) {
    if (seconds === 3) await this.apply3sButton.click();
    if (seconds === 5) await this.apply5sButton.click();
    if (seconds === 10) await this.apply10sButton.click();
  }
}
