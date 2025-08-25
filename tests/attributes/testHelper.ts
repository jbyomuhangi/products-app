import { Page, expect } from "@playwright/test";

export class AttributesPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto("/attributes");
  }

  async waitForPageLoad() {
    await this.page.waitForSelector('[data-testid="data-table"]');
  }

  async filterByName(name: string) {
    const nameInput = this.page.getByPlaceholder("Search by name");
    await nameInput.fill(name);
    await this.page.waitForTimeout(1000 * 3);
  }

  async clearNameFilter() {
    const nameInput = this.page.getByPlaceholder("Search by name");
    await nameInput.clear();
    await this.page.waitForTimeout(1000 * 3);
  }

  async expectNameCellsToContainText(text: string) {
    const nameCells = await this.page
      .locator('[data-testid="attribute-name"]')
      .all();

    for (const cell of nameCells) {
      await expect(cell).toContainText(text, { ignoreCase: true });
    }
  }

  async expectUrlToContainParams(params: Record<string, string>) {
    const url = this.page.url();

    for (const [key, value] of Object.entries(params)) {
      // Next.js encodes spaces as "+" in query params, so we need to check for both "%20" and "+"
      const encodedValue = encodeURIComponent(value);
      const plusEncodedValue = value.replace(/ /g, "+");
      expect(
        url.includes(`${key}=${encodedValue}`) ||
          url.includes(`${key}=${plusEncodedValue}`)
      ).toBeTruthy();
    }
  }
}
