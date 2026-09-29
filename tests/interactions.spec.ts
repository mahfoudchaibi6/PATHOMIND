import { test, expect } from '@playwright/test'

test('onglets produits : clic et navigation clavier', async ({ page }) => {
  await page.goto('/#produits')
  const viewer = page.getByRole('tab', { name: /Viewer/ })
  await viewer.click()
  await expect(viewer).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: 'PathoMind Viewer', exact: true })).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(page.getByRole('tab', { name: /Share/ })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: 'PathoMind Share', exact: true })).toBeVisible()
})

test('aperçu Lab : changement d’écran', async ({ page }) => {
  await page.goto('/#demo-lab')
  await page.getByRole('tab', { name: /Compte-rendu/ }).click()
  await expect(page.locator('img[alt*="Compte-rendu validé"]')).toBeVisible()
})

test('FAQ : ouverture d’une question', async ({ page }) => {
  await page.goto('/#faq')
  const q = page.getByRole('button', { name: /dispositif médical certifié/ })
  await q.click()
  await expect(q).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByText('Il ne pose pas de diagnostic')).toBeVisible()
})
