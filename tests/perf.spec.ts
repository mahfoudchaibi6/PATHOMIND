import { test, expect } from '@playwright/test'

// Mesure locale indicative (sans limitation réseau) des Core Web Vitals.
test('LCP et CLS', async ({ page }) => {
  await page.goto('/', { waitUntil: 'networkidle' })
  const vitals = await page.evaluate(
    () =>
      new Promise<{ lcp: number; cls: number }>((resolve) => {
        let lcp = 0
        let cls = 0
        new PerformanceObserver((l) => l.getEntries().forEach((e) => (lcp = e.startTime))).observe({ type: 'largest-contentful-paint', buffered: true })
        new PerformanceObserver((l) =>
          l.getEntries().forEach((e: any) => {
            if (!e.hadRecentInput) cls += e.value
          })
        ).observe({ type: 'layout-shift', buffered: true })
        setTimeout(() => resolve({ lcp, cls }), 1500)
      })
  )
  console.log(`LCP ${Math.round(vitals.lcp)} ms · CLS ${vitals.cls.toFixed(3)}`)
  expect(vitals.lcp).toBeLessThan(2500)
  expect(vitals.cls).toBeLessThan(0.1)
})
