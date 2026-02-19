import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
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
});
