import { test, expect } from '@playwright/test';

test('can add and clear a todo', async ({ page }) => {
  await page.goto('/');

  await page.getByPlaceholder('Add a new task...').fill('Write e2e test');
  await page.getByRole('button', { name: 'Add' }).click();

  await expect(page.getByText('Write e2e test')).toBeVisible();

  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Clear Completed' }).click();

  await expect(page.getByText('Write e2e test')).not.toBeVisible();
});
