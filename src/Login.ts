import { Locator, Page, expect } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  readonly username: Locator;

  readonly password: Locator;

  readonly logIn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.username = page.getByLabel("E-mail");
    this.password = page.locator("input[type=password]");
    this.logIn = page.getByRole("button", { name: "Log in" });
  }

  async goto() {
    const url = process.env.BASE_URL || "https://dev.omni-dispatch.com";
    await this.page.goto(url + "/login");
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.logIn.click();
    await this.page.waitForURL(/\/chat/);
    expect(this.page.url()).toContain("/chat");
  }
}
