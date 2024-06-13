// tests/example.spec.js
const { test, expect } = require('@playwright/test')

test('basic test', async ({ page }) => {
  await page.goto('http://127.0.0.1:3000')
  await expect(page).toHaveTitle(/React App 1/)
})
