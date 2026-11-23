/**
 * Gallery preview images for every template (SPEC §9.1), from the live demo.
 *
 *   npm run screenshots                          # all templates
 *   npm run screenshots -- aurora terminal       # some
 *   npm run screenshots -- --base=http://localhost:3000
 *
 * Writes public/templates/<id>/preview-desktop.jpg (1440x900, top of page),
 * preview-mobile.jpg (390x844) and thumb.jpg (720x450 downscale of desktop).
 * Needs the dev server (or any deployment) running at --base.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { chromium, type Browser, type Page } from '@playwright/test'
import { TEMPLATE_IDS } from '@/templates/registry'

const QUALITY = 78
const args = process.argv.slice(2)
const base = (args.find((a) => a.startsWith('--base='))?.slice(7) ?? 'http://localhost:3000').replace(/\/$/, '')
const requested = args.filter((a) => !a.startsWith('--'))
const unknown = requested.filter((id) => !TEMPLATE_IDS.includes(id))
if (unknown.length) {
  console.error(`Unknown template id(s): ${unknown.join(', ')}`)
  process.exit(2)
}
const ids = requested.length ? requested : TEMPLATE_IDS

/** Open the demo and wait until fonts and the images in view have loaded. */
async function capture(browser: Browser, url: string, width: number, height: number): Promise<Buffer> {
  const mobile = width < 600
  const context = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 1,
    reducedMotion: 'reduce',
    isMobile: mobile,
    hasTouch: mobile,
  })
  try {
    const page = await context.newPage()
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 120_000 })
    if (!response?.ok()) throw new Error(`${url} answered ${response?.status()}`)
    await settle(page)
    return await page.screenshot({ type: 'jpeg', quality: QUALITY })
  } finally {
    await context.close()
  }
}

async function settle(page: Page) {
  // The dev server's floating indicator is not part of the template.
  await page.addStyleTag({ content: 'nextjs-portal{display:none!important}' })
  await page.evaluate(async () => {
    await document.fonts.ready
    const pending = [...document.images].filter((img) => !img.complete)
    await Promise.all(
      pending.map(
        (img) =>
          new Promise<void>((resolve) => {
            img.addEventListener('load', () => resolve(), { once: true })
            img.addEventListener('error', () => resolve(), { once: true })
            setTimeout(resolve, 10_000)
          }),
      ),
    )
  })
  await page.waitForTimeout(300)
}

/** Downscale with the browser itself, so no image library is needed. */
async function downscale(browser: Browser, jpeg: Buffer, width: number, height: number): Promise<Buffer> {
  const page = await browser.newPage({ viewport: { width, height } })
  try {
    const src = `data:image/jpeg;base64,${jpeg.toString('base64')}`
    await page.setContent(
      `<style>html,body{margin:0}img{display:block;width:${width}px;height:${height}px}</style><img src="${src}">`,
    )
    await page.locator('img').evaluate((img: HTMLImageElement) => img.decode())
    return await page.screenshot({ type: 'jpeg', quality: QUALITY })
  } finally {
    await page.close()
  }
}

async function main() {
  const browser = await chromium.launch()
  let failed = 0
  try {
    for (const id of ids) {
      const started = Date.now()
      try {
        const url = `${base}/demo/${id}`
        const desktop = await capture(browser, url, 1440, 900)
        const mobile = await capture(browser, url, 390, 844)
        const thumb = await downscale(browser, desktop, 720, 450)
        const dir = path.resolve('public/templates', id)
        mkdirSync(dir, { recursive: true })
        writeFileSync(path.join(dir, 'preview-desktop.jpg'), desktop)
        writeFileSync(path.join(dir, 'preview-mobile.jpg'), mobile)
        writeFileSync(path.join(dir, 'thumb.jpg'), thumb)
        console.log(`ok   ${id} (${((Date.now() - started) / 1000).toFixed(1)}s)`)
      } catch (error) {
        failed++
        console.error(`FAIL ${id}: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
  } finally {
    await browser.close()
  }
  if (failed) process.exit(1)
}

void main()
