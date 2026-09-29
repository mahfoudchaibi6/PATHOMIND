import { test, expect, type Page } from '@playwright/test'

const SECTIONS = ['top', 'produits', 'workflow', 'donnees', 'demo-lab', 'pourquoi', 'fondateur', 'contact']

/** Fait défiler toute la page pour déclencher les apparitions au scroll. */
async function revealAll(page: Page) {
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(900)
}

test('aucun débordement horizontal', async ({ page }) => {
  await page.goto('/')
  await revealAll(page)
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  expect(overflow).toBeLessThanOrEqual(0)
})

test('captures des sections', async ({ page }, info) => {
  await page.goto('/')
  await revealAll(page)
  await page.addStyleTag({ content: 'header{position:absolute!important}' })
  for (const id of SECTIONS) {
    const el = page.locator(`#${id}`)
    await el.scrollIntoViewIfNeeded()
    await page.waitForTimeout(250)
    await el.screenshot({ path: `tests/__captures__/${info.project.name}/${String(SECTIONS.indexOf(id) + 1).padStart(2, '0')}-${id}.png` })
  }
  await page.screenshot({ path: `tests/__captures__/${info.project.name}/00-page-complete.png`, fullPage: true })
})

test('SEO de base', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveTitle(/PathoMind/)
  await expect(page.locator('h1')).toHaveCount(1)
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /anatomie/)
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /pathomind\.org/)
  const missingAlt = await page.locator('img:not([alt])').count()
  expect(missingAlt).toBe(0)
})
