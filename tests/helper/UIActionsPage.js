export class UIActionsPage {
  constructor(page) {
    this.page = page;
    this.dynamicLink = this.page.getByRole("link", { name: "Dynamic ID" });
    this.dynamicButton = this.page.getByRole("button", {
      name: "Button with Dynamic ID",
    });
    this.attributeLink = this.page.getByRole("link", {
      name: "Class Attribute",
    });
    this.attributeButton = this.page.locator(
      "//button[contains(concat(' ', normalize-space(@class), ' '), ' btn-primary ')]",
    );
    this.loadDelayLink = this.page.getByRole("link", { name: "Load Delay" });
    this.loadDelayButton = this.page.getByRole("button", {
      name: "Button Appearing After Delay",
    });
    this.hiddenLayersLink = this.page.getByRole("link", {
      name: "Hidden Layers",
    });
    this.hiddenLayersButton = this.page.getByRole("button", { name: "Button" });
    this.ajaxDataLink = this.page.getByRole("link", { name: "AJAX Data" });
    this.ajaxDataButton = this.page.getByRole("button", {
      name: "Button Triggering AJAX Request",
    });

    this.clientSideDelayLink = this.page.getByRole("link", {
      name: "Client Side Delay",
    });
    this.clientSideDelayButton = this.page.getByRole("button", {
      name: "Button Triggering Client Side Logic",
    });
    this.clickLink = this.page.getByRole("link", { name: "Click" });
    this.clickButton = this.page.getByRole("button", {
      name: "Button That Ignores DOM Click",
    });
    this.textInputLink = this.page.getByRole("link", { name: "Text Input" });
    this.textInputTextbox = this.page.getByRole("textbox");
    this.textInputButton = this.page.getByRole("button", {
      name: "Button That Should Change it's Name Based on Input Value",
    });
    this.textInputButton1 = this.page.getByRole("button", { name: "Test" });
    this.scrollbarsLink = this.page.getByRole("link", { name: "Scrollbars" });
    this.hidingButton = this.page.locator("#hidingButton");
    this.dynamicTableLink = page.getByRole("link", { name: "Dynamic Table" });
    this.warningText = page.locator("p.bg-warning");
    this.rows = page.locator("div[role='row']");
    this.verifyTextLink = page.getByRole("link", { name: "Verify Text" });
    this.welcomeText = page.locator(
      "//span[normalize-space(.)='Welcome UserName!']",
    );
  }

  async clickDynamicLink() {
    await this.dynamicLink.click();
  }

  async clickDynamicButton() {
    await this.dynamicButton.click();
  }

  async clickAttributeLink() {
    await this.attributeLink.click();
  }

  async clickAttributeButton() {
    await this.attributeButton.click();
  }

  async clickLoadDelayLink() {
    await this.loadDelayLink.click();
  }

  async clickLoadDelayButton() {
    await this.loadDelayButton.click();
  }

  async loadDelayLink() {
    await this.loadDelayLink.click();
  }

  async loadDelayButton() {
    await this.loadDelayButton.click();
  }

  async clickHiddenLayersLink() {
    await this.hiddenLayersLink.click();
  }

  async clickHiddenLayersButton() {
    await this.hiddenLayersButton.click();
  }
  async clickAjaxDataLink() {
    await this.ajaxDataLink.click();
  }

  async clickAjaxDataButton() {
    await this.ajaxDataButton.click();
  }
  async clickClientSideDelayLink() {
    await this.clientSideDelayLink.click();
  }

  async clickClientSideDelayButton() {
    await this.clientSideDelayButton.click();
  }

  async clickClickLink() {
    await this.clickLink.click();
  }

  async clickClickButton() {
    await this.clickButton.click();
  }
  async clickTextInputLink() {
    await this.textInputLink.click();
  }

  async fillTextInputTextbox(value) {
    await this.textInputTextbox.fill(value);
  }

  async clickTextInputButton() {
    await this.textInputButton.click();
  }
  async scrollbarsLinks() {
    await this.scrollbarsLink.click();
  }

  async scrollIntoview() {
    await this.hidingButton.scrollIntoViewIfNeeded();
  }

  async clickHidingButton() {
    await this.hidingButton.click();
  }

  async clickDynamicTableLink() {
    await this.dynamicTableLink.click();
  }

  async getExpectedCpuFromWarning() {
    const text = await this.warningText.textContent();
    if (!text) throw new Error("Warning text not found");

    return text.split(": ")[1].trim();
  }

  async getCpuValueForBrowser(browserName) {
    const rowCount = await this.rows.count();
    const headers = await this.rows.nth(0).locator("span").allInnerTexts();
    const cpuIndex = headers.findIndex((h) => h.trim() === "CPU");

    if (cpuIndex === -1) {
      throw new Error("CPU column not found");
    }

    for (let i = 1; i < rowCount; i++) {
      const cells = await this.rows.nth(i).locator("span").allInnerTexts();

      if (cells[0].trim() === browserName) {
        return cells[cpuIndex].trim();
      }
    }

    throw new Error(`${browserName} row not found`);
  }

  async clickVerifyTextLink() {
    await this.verifyTextLink.click();
  }
}
