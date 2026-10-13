import { test, expect } from '@playwright/test';

test('navigate from Services to Client Work', async ({ page }) => {
  // Step 1: Open the EPAM homepage.
  await page.goto('https://www.epam.com/', {
    waitUntil: 'domcontentloaded',
  });

  // Step 2: Verify that the homepage loaded successfully.
  await expect(page).toHaveTitle(
    /EPAM \| Software Engineering & Product Development Services/i
  );

  // Step 3: Capture the initial page state.
  await page.screenshot({
    path: 'test-results/epam-homepage.png',
    fullPage: false,
  });

  // Step 4: Open the header navigation menu.
  const menuButton = page.locator('button.hamburger-menu__button');
  await expect(menuButton).toBeVisible();
  await menuButton.click();

  // Step 5: Select "Services" from the header menu.
  const servicesLink = page.getByRole('link', {
    name: 'Services',
    exact: true,
  }).first();

  await expect(servicesLink).toBeVisible();
  await servicesLink.click();

  // Step 6: Verify that the Services page was opened.
  await expect(page).toHaveURL(/\/services\/?$/);

  // Step 7: Click the "Explore Our Client Work" link.
  const clientWorkLink = page.getByRole('link', {
    name: /Explore Our Client Work/i,
  });

  await expect(clientWorkLink).toBeVisible();
  await clientWorkLink.click();

  // Step 8: Verify that the Client Work page was opened.
  await expect(page).toHaveURL(/\/services\/client-work\/?$/);

  // Step 9: Verify that the "Client Work" text is visible.
  await expect(
    page.getByRole('heading', {
      name: 'Client Work',
      exact: true,
    })
  ).toBeVisible();

  // Step 10: Capture the final page state.
  await page.screenshot({
    path: 'test-results/client-work-page.png',
    fullPage: true,
  });
});
