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

test('vidéo Lab : chargée seulement à l’approche, puis lue', async ({ page }) => {
  const videoRequests: string[] = []
  page.on('request', (r) => r.url().includes('/videos/') && videoRequests.push(r.url()))
  await page.goto('/', { waitUntil: 'networkidle' })
  expect(videoRequests).toHaveLength(0)

  const video = page.locator('#demo-lab video')
  await expect(video).toHaveAttribute('poster', '/products/pathomind-lab.png')
  await expect(video).toHaveAttribute('preload', 'metadata')
  await video.scrollIntoViewIfNeeded()
  await expect.poll(() => videoRequests.length).toBeGreaterThan(0)
  await expect
    .poll(() => video.evaluate((v: HTMLVideoElement) => !v.paused && v.currentTime > 0 && v.muted), { timeout: 10_000 })
    .toBe(true)
})
