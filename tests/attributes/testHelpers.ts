import { Page, expect } from "@playwright/test";

export const waitForPageLoad = async (page: Page) => {
  await page.waitForSelector('[data-testid="data-table"]');
};

export const filterByName = async (page: Page, name: string) => {
  const nameInput = page.getByPlaceholder("Search by name");
  await nameInput.fill(name);
  await page.waitForTimeout(1000 * 3);
};

export const clearNameFilter = async (page: Page) => {
  const nameInput = page.getByPlaceholder("Search by name");
  await nameInput.clear();
  await page.waitForTimeout(1000 * 3);
};

export const expectUrlToContainParams = async (
  page: Page,
  params: Record<string, string>
) => {
  const url = page.url();

  for (const [key, value] of Object.entries(params)) {
    // Next.js encodes spaces as "+" in query params, so we need to check for both "%20" and "+"
    const encodedValue = encodeURIComponent(value);
    const plusEncodedValue = value.replace(/ /g, "+");
    expect(
      url.includes(`${key}=${encodedValue}`) ||
        url.includes(`${key}=${plusEncodedValue}`)
    ).toBeTruthy();
  }
};

export const expectNameCellsToContainText = async (
  page: Page,
  text: string
) => {
  const nameCells = await page.locator('[data-testid="attribute-name"]').all();

  for (const cell of nameCells) {
    await expect(cell).toContainText(text, { ignoreCase: true });
  }
};
