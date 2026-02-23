import { test, expect } from "@playwright/test";

test("test", async ({ page, context }) => {
  test.setTimeout(100000);
  await page.goto("http://uitestingplayground.com/");

  // Click on the "Dynamic ID" link and interact with the button
  await page.getByRole("link", { name: "Dynamic ID" }).click();
  await page.getByRole("button", { name: "Button with Dynamic ID" }).click();
  await page.goBack();

  // Click on the "Class Attribute" link and interact with the button
  await page.getByRole("link", { name: "Class Attribute" }).click();
  await page
    .locator(
      "//button[contains(concat(' ', normalize-space(@class), ' '), ' btn-primary ')]",
    )
    .click();
  await page.goBack();

  // Click on the "Hidden Layers" link and interact with the button
  await page.getByRole("link", { name: "Hidden Layers" }).click();
  await page.getByRole("button", { name: "Button" }).click();
  await page.goBack();

  // Click on the "AJAX Data" link and interact with the button
  await page.getByRole("link", { name: "AJAX Data" }).click();
  await page
    .getByRole("button", { name: "Button Triggering AJAX Request" })
    .click();
  await page.waitForLoadState("networkidle");
  await expect(
    page.getByText("Data loaded with AJAX get request"),
  ).toBeVisible();
  await page.goBack();

  // Click on the "Client Side Delay" link and interact with the button
  await page.getByRole("link", { name: "Client Side Delay" }).click();
  await page
    .getByRole("button", { name: "Button Triggering Client Side Logic" })
    .click();
  await expect(
    page.getByRole("button", { name: "Button Triggering Client Side Logic" }),
  ).toBeVisible();
  await page.goBack();

  // Click on the "Click" link and interact with the button
  await page.getByRole("link", { name: "Click" }).click();
  await page
    .getByRole("button", { name: "Button That Ignores DOM Click" })
    .click();
  await page.goBack();

  // Click on the "Text Input" link and interact with the textbox and button
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
  await page.goBack();

  // Click on the "Scrollbars" link and interact with the button
  await page.getByRole("link", { name: "Scrollbars" }).click();
  const button = page.locator("#hidingButton");
  await button.scrollIntoViewIfNeeded();
  await expect(button).toBeVisible();
  await button.click();
  await page.goBack();

  // Click on the "Dynamic Table" Verify cell value in a dynamic table
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
  await page.goBack();

  // Click on the "Verify Text" Finding an element by displayed text has nuances
  await page.getByRole("link", { name: "Verify Text" }).click();
  const welcomeText = await page.locator(
    "//span[normalize-space(.)='Welcome UserName!']",
  );
  await expect(welcomeText).toBeVisible();
  await page.goBack();

  //click on the "progress bar" link and interact with the progress bar
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

  //click on the "visibility" link and interact with the buttons
  await page.getByRole("link", { name: "Visibility" }).click();
  const hideButton = page.getByRole("button", { name: "Hide" });
  const removedButton = page.getByRole("button", { name: "Removed" });
  const zeroWidthButton = page.getByRole("button", { name: "Zero Width" });
  const overlappedButton = page.getByRole("button", { name: "Overlapped" });
  const opacityButton = page.getByRole("button", { name: "Opacity" });
  const visibilityHiddenButton = page.getByRole("button", {
    name: "Visibility Hidden",
  });
  const displayNoneButton = page.getByRole("button", { name: "Display None" });
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

  // click on the "sample app" link and interact with the form
  await page.getByRole("link", { name: "Sample App" }).click();
  await page.getByRole("textbox", { name: "User Name" }).fill("testuser");
  await page.getByRole("textbox", { name: "********" }).fill("pwd");
  await page.getByRole("button", { name: "Log in" }).click();
  await expect(page.getByText("Welcome, testuser!")).toBeVisible();
  await page.goBack();

  // Click on the "Mouse Over" link and interact with the button
  await page.getByRole("link", { name: "Mouse Over" }).click();
  await page.getByText("Click me").click();
  await expect(page.getByText("The link above clicked 1")).toBeVisible();
  await page.getByText("Link Button").click();
  await expect(page.getByText("The link above clicked 1").nth(1)).toBeVisible();
  await page.getByText("Click me").click();
  await expect(page.getByText("The link above clicked 2")).toBeVisible();
  await page.getByText("Link Button").click();
  await expect(page.getByText("The link above clicked 2").nth(1)).toBeVisible();
  await page.goBack();

  // Click on the "Non-Breaking Space" link and interact with the button
  await page.getByRole("link", { name: "Non-Breaking Space" }).click();
  await page.getByRole("button", { name: "My Button" }).click();
  expect(page.getByRole("button", { name: "My Button" })).toBeVisible();
  await page.goBack();

  // Click on the "Overlapped Element" link and interact with the button
  await page.getByRole("link", { name: "Overlapped Element" }).click();
  await page.getByRole("textbox", { name: "Id" }).click();
  await page.getByRole("textbox", { name: "Id" }).fill("test");
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("text");
  await page.goBack();
});
