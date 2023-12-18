import { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly driversTable: Locator;

  constructor(page: Page) {
    this.page = page;
  }

  async gotoDriversPage() {
    const url = process.env.BASE_URL || "https://dev.omni-dispatch.com";
    await this.page.goto(url + "/users/drivers");
  }

  async getTable() {
    return await this.page.waitForSelector("//table");
  }

  async isTableVisible() {
    return (
      (await this.page.waitForSelector("table", { state: "visible" })) !== null
    );
  }
}
