/**
 * Take a screenshot of a page with headless Chromium — the way to LOOK at what
 * you built (then open the PNG).
 *
 *   npx tsx scripts/shot.ts <url> <out.png> [options]
 *
 * Options
 *   --width=1280        viewport width (use 390 for mobile, 820 for tablet)
 *   --height=900        viewport height
 *   --full              capture the whole page, not just the viewport
 *   --dpr=1             device scale factor (0.5 halves the image size)
 *   --locale=ar         set the platform language cookie (NEXT_LOCALE) first
 *   --selector=<css>    capture only this element
 *   --wait=600          extra milliseconds to wait before capturing
 *   --motion            keep animations (default: reduced motion, so entrance
 *                       animations are skipped and the final state is captured)
 *   --dark              emulate prefers-color-scheme: dark
 *   --cookie=name=value extra cookie (repeatable), e.g. a session cookie
 *
 * Examples
 *   npx tsx scripts/shot.ts "http://localhost:3000/dev/blocks?block=hero&bare=1" .data/shots/hero.png --full
 *   npx tsx scripts/shot.ts http://localhost:3000/ar .data/shots/home-ar-mobile.png --width=390 --full
 */
import { mkdirSync } from 'node:fs'
import path from 'node:path'
import { chromium } from '@playwright/test'

function parseArgs(argv: string[]) {
  const positional: string[] = []
  const flags = new Map<string, string[]>()
  for (const arg of argv) {
    if (arg.startsWith('--')) {
      const [key, ...rest] = arg.slice(2).split('=')
      const list = flags.get(key) ?? []
      list.push(rest.length ? rest.join('=') : 'true')
      flags.set(key, list)
    } else {
      positional.push(arg)
    }
  }
  const one = (key: string) => flags.get(key)?.[0]
  return { positional, one, all: (key: string) => flags.get(key) ?? [] }
}

async function main() {
  const { positional, one, all } = parseArgs(process.argv.slice(2))
  const [url, out] = positional
  if (!url || !out) {
    console.error('Usage: npx tsx scripts/shot.ts <url> <out.png> [--width=1280] [--height=900] [--full] [--locale=ar] …')
    process.exit(2)
  }

  const width = Number(one('width') ?? 1280)
  const height = Number(one('height') ?? 900)
  const target = new URL(url)

  const browser = await chromium.launch()
  try {
    const context = await browser.newContext({
      viewport: { width, height },
      deviceScaleFactor: Number(one('dpr') ?? 1),
      reducedMotion: one('motion') ? 'no-preference' : 'reduce',
      colorScheme: one('dark') ? 'dark' : 'light',
      isMobile: width < 600,
      hasTouch: width < 600,
    })

    const cookies = all('cookie').map((pair) => {
      const index = pair.indexOf('=')
      return { name: pair.slice(0, index), value: pair.slice(index + 1), url: target.origin }
    })
    const locale = one('locale')
    if (locale) cookies.push({ name: 'NEXT_LOCALE', value: locale, url: target.origin })
    if (cookies.length) await context.addCookies(cookies)

    const page = await context.newPage()
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    page.on('console', (message) => {
      if (message.type() === 'error') errors.push(message.text())
    })

    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 90_000 })

    if (one('full')) {
      // Scroll through the page so lazy images load, then return to the top.
      // A dev-server hot reload can destroy the execution context mid-scroll;
      // that is not a failure, so retry once and carry on either way.
      const scrollThrough = () =>
        page.evaluate(async () => {
          const step = window.innerHeight
          for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
            window.scrollTo(0, y)
            await new Promise((resolve) => setTimeout(resolve, 60))
          }
          window.scrollTo(0, 0)
        })
      try {
        await scrollThrough()
      } catch {
        await page.waitForLoadState('load').catch(() => undefined)
        await scrollThrough().catch(() => undefined)
      }
      await page.waitForLoadState('networkidle').catch(() => undefined)
    }
    await page.waitForTimeout(Number(one('wait') ?? 400))

    mkdirSync(path.dirname(path.resolve(out)), { recursive: true })
    const selector = one('selector')
    if (selector) {
      await page.locator(selector).first().screenshot({ path: out })
    } else {
      await page.screenshot({ path: out, fullPage: Boolean(one('full')) })
    }

    const size = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      height: document.documentElement.scrollHeight,
      overflowX: document.documentElement.scrollWidth > window.innerWidth,
    }))
    console.log(
      JSON.stringify(
        {
          status: response?.status() ?? null,
          saved: path.resolve(out),
          page: size,
          // Horizontal overflow is almost always a layout bug.
          horizontalOverflow: size.overflowX,
          errors: errors.slice(0, 10),
        },
        null,
        2,
      ),
    )
  } finally {
    await browser.close()
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
