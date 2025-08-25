import { expect, test } from "@playwright/test";
import { AttributesPage } from "./testHelper";

test.describe("Attributes Page Filters", () => {
  let attributesPage: AttributesPage;

  test.beforeEach(async ({ page }) => {
    attributesPage = new AttributesPage(page);
    await attributesPage.goto();
    await attributesPage.waitForPageLoad();
  });

  test("should filter by name", async ({ page }) => {
    // Test filtering by a specific name
    await attributesPage.filterByName("Product ID");

    // Verify the URL contains the filter parameter
    await attributesPage.expectUrlToContainParams({ name: "Product ID" });

    // Verify the table shows filtered results
    await attributesPage.expectNameCellsToContainText("Product ID");

    // Clear the filter
    await attributesPage.clearNameFilter();

    // Verify the filter is cleared
    await expect(page.getByPlaceholder("Search by name")).toHaveValue("");
  });

  test("should maintain filter state on page refresh", async ({ page }) => {
    // Apply a filter
    await attributesPage.filterByName("Product");

    // Refresh the page
    await page.reload();
    await attributesPage.waitForPageLoad();

    // Verify the URL contains the filter parameter
    await attributesPage.expectUrlToContainParams({ name: "Product" });

    // Verify the search input has the correct value
    await expect(page.getByPlaceholder("Search by name")).toHaveValue(
      "Product"
    );

    // Verify the table shows the filtered results
    await attributesPage.expectNameCellsToContainText("Product");
  });
});
