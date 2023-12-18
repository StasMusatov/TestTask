import { test, expect } from "@playwright/test";
import { LoginPage } from "../src/Login";
import { inputEmailData } from "../src/inputEmailData";

test("Log in validations", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  for (const data of inputEmailData) {
    await loginPage.username.fill(data.email);
    await loginPage.password.fill(data.password);
    await page.getByRole("button", { name: "Log in" }).click();

    if (data.expectError) {
      await expect(page.getByText("Wrong Email or password")).toBeVisible();
    } else {
      await expect(page.locator("#email_help")).not.toBeVisible();
    }
  }
});
