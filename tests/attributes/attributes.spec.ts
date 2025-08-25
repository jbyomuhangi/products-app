import { expect, test } from "@playwright/test";

import {
  clearNameFilter,
  expectNameCellsToContainText,
  expectUrlToContainParams,
  filterByName,
  waitForPageLoad,
} from "./testHelpers";

test.describe("Attributes Page Filters", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/attributes");
    await waitForPageLoad(page);
  });

  test("should filter by name", async ({ page }) => {
    // Test filtering by a specific name
    await filterByName(page, "Product ID");

    // Verify the URL contains the filter parameter
    await expectUrlToContainParams(page, { name: "Product ID" });

    // Verify the table shows filtered results
    await expectNameCellsToContainText(page, "Product ID");

    // Clear the filter
    await clearNameFilter(page);

    // Verify the filter is cleared
    await expect(page.getByPlaceholder("Search by name")).toHaveValue("");
  });

  test("should maintain filter state on page refresh", async ({ page }) => {
    // Apply a filter
    await filterByName(page, "Product");

    // Refresh the page
    await page.reload();
    await waitForPageLoad(page);

    // Verify the URL contains the filter parameter
    await expectUrlToContainParams(page, { name: "Product" });

    // Verify the search input has the correct value
    await expect(page.getByPlaceholder("Search by name")).toHaveValue(
      "Product"
    );

    // Verify the table shows the filtered results
    await expectNameCellsToContainText(page, "Product");
  });
});
