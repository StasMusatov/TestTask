import { test, expect } from "@playwright/test";
import { DashboardPage } from "../src/DashboadrPage";
import { LoginPage } from "../src/Login";

test("Verify Drivers table content", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);
  await loginPage.goto();
  await loginPage.login(
    process.env.USER_NAME || "",
    process.env.PASSWORD || ""
  );
  await dashboardPage.gotoDriversPage();

  await dashboardPage.isTableVisible();

  const table = await dashboardPage.getTable();
  expect(table).toBeTruthy();

  const rows = await table.$$("tbody tr");
  expect(rows.length).toBeGreaterThan(0);

  for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
    const row = rows[rowIndex];
    const cells = await row.$$("td");

    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex];

      const text = await cell.textContent();

      const isNotEmpty = text !== null && text !== "";

      expect(
        isNotEmpty,
        `Empty cell at row ${rowIndex + 1}, column ${cellIndex + 1}`
      ).toBeTruthy();

      if (!isNotEmpty) {
        console.error(
          `Empty cell at row ${rowIndex + 1}, column ${cellIndex + 1}`
        );
      }
    }
  }
});
