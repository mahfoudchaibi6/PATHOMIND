import { test, expect, type Page } from '@playwright/test'

// Aucun e-mail réel n'est envoyé : l'appel EmailJS est intercepté.
async function fill(page: Page) {
  await page.locator('#f-name').fill('Dr Test')
  await page.locator('#f-email').fill('test@exemple.dz')
  await page.locator('#f-org').fill('Laboratoire Test')
  await page.locator('#f-orgType').selectOption('Clinique')
  await page.locator('#f-product').selectOption('PathoMind Lab')
  await page.locator('#f-message').fill('Test automatisé')
}

test.beforeEach(async ({ page }) => {
  await page.goto('/#contact')
})

test('validation des champs obligatoires', async ({ page }) => {
  await page.getByRole('button', { name: /Demander une démo/ }).last().click()
  await expect(page.locator('#f-name-err')).toBeVisible()
  await expect(page.locator('#f-email-err')).toBeVisible()
  await expect(page.locator('#f-org-err')).toBeVisible()
  await expect(page.locator('#f-orgType-err')).toBeVisible()
  await expect(page.locator('#f-name')).toBeFocused()
})

test('envoi réussi', async ({ page }) => {
  let payload: any = null
  await page.route('**/api.emailjs.com/**', async (route) => {
    payload = route.request().postDataJSON()
    await route.fulfill({ status: 200, body: 'OK' })
  })
  await fill(page)
  await page.locator('#contact form button[type=submit]').click()
  await expect(page.getByText('Demande envoyée')).toBeVisible()
  expect(payload.service_id).toBe('service_b7tmm2g')
  expect(payload.template_params.from_email).toBe('test@exemple.dz')
  expect(payload.template_params.message).toContain('Établissement : Laboratoire Test')
})

test('erreur serveur affichée, saisie conservée', async ({ page }) => {
  await page.route('**/api.emailjs.com/**', (route) => route.fulfill({ status: 400, body: 'Bad' }))
  await fill(page)
  await page.locator('#contact form button[type=submit]').click()
  await expect(page.locator('#contact [role=alert]')).toContainText('L’envoi a échoué')
  await expect(page.locator('#f-name')).toHaveValue('Dr Test')
})

test('honeypot : pas d’appel réseau pour un robot', async ({ page }) => {
  let called = false
  await page.route('**/api.emailjs.com/**', (route) => {
    called = true
    return route.fulfill({ status: 200 })
  })
  await fill(page)
  await page.locator('#f-website').fill('spam', { force: true })
  await page.locator('#contact form button[type=submit]').click()
  await expect(page.getByText('Demande envoyée')).toBeVisible()
  expect(called).toBe(false)
})
