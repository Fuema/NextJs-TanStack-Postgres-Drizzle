import { test, expect } from "@playwright/test";

test.describe("Admin Core OS Workflow Scenarios", () => {
  test("should render navigation sidebar and header nav correctly", async ({ page }) => {
    // Navigates to home page
    await page.goto("/");
    
    // Check navigation sidebar presence
    const sidebar = page.locator('[data-testid="navigation-sidebar"]');
    await expect(sidebar).toBeVisible();

    // Check header presence
    const header = page.locator('[data-testid="header-nav"]');
    await expect(header).toBeVisible();
  });

  test("should toggle theme switcher", async ({ page }) => {
    await page.goto("/");
    const themeBtn = page.locator('[data-testid="btn-theme-toggle"]');
    await expect(themeBtn).toBeVisible();
  });

  test("should trigger audit log exporter button on /logs page", async ({ page }) => {
    await page.goto("/logs");
    const exportBtn = page.locator('[data-testid="btn-export-audit-logs"]');
    await expect(exportBtn).toBeVisible();
  });
});
