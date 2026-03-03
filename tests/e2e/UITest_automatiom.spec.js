import { test, expect } from "@playwright/test";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

test.describe("UI Test Automation", async () => {
  test.beforeEach(async ({ page }) => {
    const url = process.env.url;
    console.log("page Redirect Url : ", url);
    await page.goto(url);
  });

  test.afterEach(async ({ page }) => {
    console.log("page closed");
    await page.close();
  });

  // Click on the "Dynamic ID" link and interact with the button
  test("Dynamic ID", async ({ page }) => {
    await page.getByRole("link", { name: "Dynamic ID" }).click();
    await page.getByRole("button", { name: "Button with Dynamic ID" }).click();
    console.log("Button with Dynamic ID clicked");
    await page.goBack();
  });

  // Click on the "Class Attribute" link and interact with the button
  test("Class Attribute", async ({ page }) => {
    await page.getByRole("link", { name: "Class Attribute" }).click();
    await page
      .locator(
        "//button[contains(concat(' ', normalize-space(@class), ' '), ' btn-primary ')]",
      )
      .click();
    console.log("Button with Class Attribute clicked");
    await page.goBack();
  });
  // click on the "Load delay" link and interact with the button
  test("Load Delay", async ({ page }) => {
    await page.getByRole("link", { name: "Load Delay" }).click();
    await page.waitForEvent("domcontentloaded");
    await page
      .getByRole("button", { name: "Button Appearing After Delay" })
      .click();
    await expect(
      page.getByRole("button", { name: "Button Appearing After Delay" }),
    ).toBeVisible();
    console.log("Button Appearing After Delay clicked");
    await page.goBack();
  });

  // Click on the "Hidden Layers" link and interact with the button
  test("Hidden Layers", async ({ page }) => {
    await page.getByRole("link", { name: "Hidden Layers" }).click();
    await page.getByRole("button", { name: "Button" }).click();
    console.log("Button clicked");
    await page.goBack();
  });

  // Click on the "AJAX Data" link and interact with the button
  test("AJAX Data", async ({ page }) => {
    test.setTimeout(60000);
    await page.getByRole("link", { name: "AJAX Data" }).click();
    await page
      .getByRole("button", { name: "Button Triggering AJAX Request" })
      .click();
    await page.waitForLoadState("networkidle");
    await expect(
      page.getByText("Data loaded with AJAX get request"),
    ).toBeVisible();
    console.log("Data loaded with AJAX get request");
    await page.goBack();
  });

  // Click on the "Client Side Delay" link and interact with the button
  test("Client Side Delay", async ({ page }) => {
    await page.getByRole("link", { name: "Client Side Delay" }).click();
    await page
      .getByRole("button", { name: "Button Triggering Client Side Logic" })
      .click();
    await expect(
      page.getByRole("button", { name: "Button Triggering Client Side Logic" }),
    ).toBeVisible();
    console.log("Button Triggering Client Side Logic clicked");
    await page.goBack();
  });

  // Click on the "Click" link and interact with the button
  test("Click", async ({ page }) => {
    await page.getByRole("link", { name: "Click" }).click();
    await page
      .getByRole("button", { name: "Button That Ignores DOM Click" })
      .click();
    console.log("Button That Ignores DOM Click clicked");
    await page.goBack();
  });

  // Click on the "Text Input" link and interact with the textbox and button
  test("Text Input", async ({ page }) => {
    await page.getByRole("link", { name: "Text Input" }).click();
    await page.getByRole("textbox").fill("Test");
    await expect(page.getByRole("textbox")).toHaveValue("Test");
    await page
      .getByRole("button", {
        name: "Button That Should Change it's Name Based on Input Value",
      })
      .click();
    await page.getByRole("button", { name: "Test" }).click();
    await expect(page.getByRole("button", { name: "Test" })).toBeVisible();
    console.log(
      "Button That Should Change it's Name Based on Input Value clicked",
    );
    await page.goBack();
  });

  // Click on the "Scrollbars" link and interact with the button
  test("Scrollbars", async ({ page }) => {
    await page.getByRole("link", { name: "Scrollbars" }).click();
    const button = page.locator("#hidingButton");
    await button.scrollIntoViewIfNeeded();
    await expect(button).toBeVisible();
    await button.click();
    console.log("Button clicked");
    await page.goBack();
  });

  // Click on the "Dynamic Table" Verify cell value in a dynamic table
  test("Dynamic Table", async ({ page }) => {
    await page.getByRole("link", { name: "Dynamic Table" }).click();
    const warningText = await page.locator("p.bg-warning").textContent();
    const expectedCpu = warningText.split(": ")[1].trim();
    console.log("Warning CPU:", expectedCpu);
    const rows = page.locator("div[role='row']");
    const rowCount = await rows.count();
    let actualCpu = "";
    const headers = await rows.nth(0).locator("span").allInnerTexts();
    const cpuIndex = headers.findIndex((h) => h.trim() === "CPU");
    for (let i = 1; i < rowCount; i++) {
      const cells = await rows.nth(i).locator("span").allInnerTexts();

      if (cells[0].trim() === "Chrome") {
        actualCpu = cells[cpuIndex].trim();
        console.log("Table CPU:", actualCpu);
        break;
      }
    }
    expect(actualCpu).toBe(expectedCpu);
    console.log("Table CPU verified");
    await page.goBack();
  });

  // Click on the "Verify Text" Finding an element by displayed text has nuances
  test("Verify Text", async ({ page }) => {
    await page.getByRole("link", { name: "Verify Text" }).click();
    const welcomeText = page.locator(
      "//span[normalize-space(.)='Welcome UserName!']",
    );
    await expect(welcomeText).toBeVisible();
    console.log("Welcome UserName! verified");
    await page.goBack();
  });

  //click on the "progress bar" link and interact with the progress bar
  test("Progress Bar", async ({ page }) => {
    await page.getByRole("link", { name: "Progress Bar" }).click();
    await page.getByRole("button", { name: "Start" }).click();
    await page.waitForFunction(() => {
      const progress = document.querySelector("#progressBar");
      return progress.getAttribute("aria-valuenow") === "75";
    });
    await page.getByRole("button", { name: "Stop" }).click();
    const finalValue = await page
      .locator("#progressBar")
      .getAttribute("aria-valuenow");
    console.log("Progress Bar Value:", finalValue + "%");
    await page.goBack();
  });

  //click on the "visibility" link and interact with the buttons
  test("Visibility", async ({ page }) => {
    await page.getByRole("link", { name: "Visibility" }).click();
    const hideButton = page.getByRole("button", { name: "Hide" });
    const removedButton = page.getByRole("button", { name: "Removed" });
    const zeroWidthButton = page.getByRole("button", { name: "Zero Width" });
    const overlappedButton = page.getByRole("button", { name: "Overlapped" });
    const opacityButton = page.getByRole("button", { name: "Opacity" });
    const visibilityHiddenButton = page.getByRole("button", {
      name: "Visibility Hidden",
    });
    const displayNoneButton = page.getByRole("button", {
      name: "Display None",
    });
    const offscreenButton = page.getByRole("button", { name: "Offscreen" });
    await hideButton.click();

    if (removedButton.isVisible()) {
      console.log("Removed button is still visible");
    } else {
      console.log("Removed button is not visible");
    }
    if (zeroWidthButton.isVisible()) {
      console.log("Zero Width button is visible");
    } else {
      console.log("Zero Width button is not visible");
    }
    if (overlappedButton.isVisible()) {
      console.log("Overlapped button is visible");
    } else {
      console.log("Overlapped button is not visible");
    }
    if (opacityButton.isVisible()) {
      console.log("Opacity button is visible");
    } else {
      console.log("Opacity button is not visible");
    }
    if (visibilityHiddenButton.isVisible()) {
      console.log("Visibility Hidden button is visible");
    } else {
      console.log("Visibility Hidden button is not visible");
    }
    if (displayNoneButton.isVisible()) {
      console.log("Display None button is visible");
    } else {
      console.log("Display None button is not visible");
    }
    if (offscreenButton.isVisible()) {
      console.log("Offscreen button is visible");
    } else {
      console.log("Offscreen button is not visible");
    }
    await page.goBack();
  });

  // click on the "sample app" link and interact with the form
  test("Sample App", async ({ page }) => {
    await page.getByRole("link", { name: "Sample App" }).click();
    await page.getByRole("textbox", { name: "User Name" }).fill("testuser");
    await page.getByRole("textbox", { name: "********" }).fill("pwd");
    await page.getByRole("button", { name: "Log in" }).click();
    await expect(page.getByText("Welcome, testuser!")).toBeVisible();
    console.log("Welcome, testuser! verified");
    await page.goBack();
  });

  // Click on the "Mouse Over" link and interact with the button
  test("Mouse Over", async ({ page }) => {
    await page.getByRole("link", { name: "Mouse Over" }).click();
    await page.getByText("Click me").click();
    await expect(page.getByText("The link above clicked 1")).toBeVisible();
    await page.getByText("Link Button").click();
    await expect(
      page.getByText("The link above clicked 1").nth(1),
    ).toBeVisible();
    await page.getByText("Click me").click();
    await expect(page.getByText("The link above clicked 2")).toBeVisible();
    await page.getByText("Link Button").click();
    await expect(
      page.getByText("The link above clicked 2").nth(1),
    ).toBeVisible();
    console.log("The link above clicked 2 verified");
    await page.goBack();
  });

  // Click on the "Non-Breaking Space" link and interact with the button
  test("Non-Breaking Space", async ({ page }) => {
    await page.getByRole("link", { name: "Non-Breaking Space" }).click();
    await page.getByRole("button", { name: "My Button" }).click();
    expect(page.getByRole("button", { name: "My Button" })).toBeVisible();
    console.log("My Button clicked");
    await page.goBack();
  });

  // Click on the "Overlapped Element" link and interact with the button
  test("Overlapped Element", async ({ page }) => {
    await page.getByRole("link", { name: "Overlapped Element" }).click();
    await page.getByRole("textbox", { name: "Id" }).click();
    await page.getByRole("textbox", { name: "Id" }).fill("test");
    await page.getByRole("textbox", { name: "Name" }).click();
    await page.getByRole("textbox", { name: "Name" }).fill("text");
    console.log("Overlapped Element verified");
    await page.goBack();
  });

  // Click on the "Alerts" link and interact with the alert
  test("Alerts", async ({ page }) => {
    await page.getByRole("link", { name: "Alerts" }).click();
    await page.getByRole("button", { name: "Prompt" }).click();
    await page.getByRole("button", { name: "Alert" }).click();
    await page.getByRole("button", { name: "Alert" }).click();
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("button", { name: "Alert" }).click();
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("button", { name: "Confirm" }).click();
    page.once("dialog", (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });
    await page.getByRole("button", { name: "Prompt" }).click();
    await page.goBack();
  });

  // Click File Upload link and interact with the file upload input
  test("File Upload", async ({ page }) => {
    await page.getByRole("link", { name: "File Upload" }).click();
    const frame = page.frameLocator("iframe");
    const filePath = path.resolve("TestData/testFile.txt");
    await frame.locator('input[type="file"]').setInputFiles(filePath);
    await expect(frame.getByText("testFile.txt")).toBeVisible();
    await frame.locator('input[type="file"]').setInputFiles([]);
    await expect(frame.getByText("testFile.txt")).toBeVisible();
    console.log("File Upload verified");
    await page.goBack();
  });

  //Click on the "Animation Button" link and interact with the button
  test("Animated Button", async ({ page }) => {
    await page.getByRole("link", { name: "Animated Button" }).click();
    await page.getByRole("button", { name: "Start Animation" }).click();
    await expect(
      page.getByRole("button", { name: "Moving Target" }),
    ).toBeVisible({
      timeout: 7000,
    });
    await page.getByRole("button", { name: "Moving Target" }).click();
    console.log("Animated Button verified");
    await page.goBack();
  });

  // Click on the "Disabled Input" link and interact with the button
  test("Disabled Input", async ({ page }) => {
    await page.getByRole("link", { name: "Disabled Input" }).click();
    await page.getByRole("textbox", { name: "Edit Field" }).click();
    await page.getByRole("textbox", { name: "Edit Field" }).fill("test");
    await page
      .getByRole("button", { name: "Enable Edit Field with 5" })
      .click();
    await expect(
      page.getByRole("textbox", { name: "Edit Field" }),
    ).toBeDisabled();
    await expect(page.getByRole("textbox", { name: "Edit Field" })).toBeEnabled(
      { timeout: 6000 },
    );
    console.log("Disabled Input verified");
    await page.goBack();
  });

  //Click on the "Auto Wait" link and interact with the button
  test("Auto Wait", async ({ page }) => {
    test.setTimeout(60000);
    await page.getByRole("link", { name: "Auto Wait" }).click();
    const visibleCheckbox = page.getByRole("checkbox", { name: "Visible" });
    const button = page.getByRole("button", { name: "Button" });
    await visibleCheckbox.check();
    await visibleCheckbox.uncheck();
    await page.getByRole("button", { name: "Apply 3s" }).click();
    await expect(button).not.toBeVisible();
    await expect(button).toBeVisible({ timeout: 6000 });
    await visibleCheckbox.check();
    await visibleCheckbox.uncheck();
    await page.getByRole("button", { name: "Apply 5s" }).click();
    await expect(button).not.toBeVisible();
    await expect(button).toBeVisible({ timeout: 6000 });
    const enabledCheckbox = page.getByRole("checkbox", { name: "Enabled" });
    await enabledCheckbox.check();
    await enabledCheckbox.uncheck();
    await page.getByRole("button", { name: "Apply 10s" }).click();
    await expect(button).toBeDisabled();
    await expect(button).toBeEnabled({ timeout: 12000 });
    await enabledCheckbox.check();
    await enabledCheckbox.uncheck();
    await page.getByRole("button", { name: "Apply 3s" }).click();
    await expect(button).toBeDisabled();
    await expect(button).toBeEnabled({ timeout: 5000 });
    await enabledCheckbox.check();
    await enabledCheckbox.uncheck();
    await page.getByRole("button", { name: "Apply 5s" }).click();
    await expect(button).toBeDisabled();
    await expect(button).toBeEnabled({ timeout: 6000 });
    await enabledCheckbox.check();
    await enabledCheckbox.uncheck();
    await page.getByRole("button", { name: "Apply 10s" }).click();
    await expect(button).toBeDisabled();
    await expect(button).toBeEnabled({ timeout: 12000 });
    console.log("Auto Wait verified");
    await page.goBack();
  });
});
