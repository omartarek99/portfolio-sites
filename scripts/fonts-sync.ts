/**
 * Self-hosts every family in the font registry (`src/themes/fonts.ts`).
 *
 *   npx tsx scripts/fonts-sync.ts [--force] [--only=inter,cairo]
 *
 * For each family it asks Google Fonts for the css2 stylesheet with a desktop
 * Chrome User-Agent (so the answer is woff2 with per-subset `unicode-range`
 * blocks), keeps the latin / latin-ext / arabic subsets, downloads the woff2
 * files to `public/fonts/<id>/` and writes `public/fonts/<id>.css` with the
 * URLs rewritten to those local files. `src/themes/font-manifest.json` lists
 * every file so pages can preload the right one (see `fontPreloads`).
 *
 * Idempotent: a family whose CSS, manifest entry and files are all on disk is
 * skipped unless `--force`. At most 4 requests run at a time.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { FONT_FAMILIES, type FontFamily } from '../src/themes/fonts'

/** Run from the project root (`npx tsx scripts/fonts-sync.ts`). */
const PUBLIC_DIR = path.resolve('public')
const FONTS_DIR = path.join(PUBLIC_DIR, 'fonts')
const MANIFEST_PATH = path.resolve('src/themes/font-manifest.json')

/** Subsets worth self-hosting: the site is English and Arabic. */
const KEPT_SUBSETS = ['latin', 'latin-ext', 'arabic'] as const

/** A modern desktop Chrome, so Google answers with woff2 + unicode-range. */
const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'

const CONCURRENCY = 4
const RETRIES = 3

export interface FontFile {
  subset: string
  weight: number | 'variable'
  style: 'normal' | 'italic'
  /** Public URL of the self-hosted file. */
  url: string
}

export type FontManifest = Record<string, FontFile[]>

/* ── Google Fonts css2 request ───────────────────────────────────────────── */

function axisSpec(font: FontFamily, italic: boolean): string {
  const weights =
    'variable' in font.weights
      ? [`${font.weights.variable[0]}..${font.weights.variable[1]}`]
      : font.weights.static.map(String)
  if (!italic) return `wght@${weights.join(';')}`
  const pairs = [...weights.map((w) => `0,${w}`), ...weights.map((w) => `1,${w}`)]
  return `ital,wght@${pairs.join(';')}`
}

function cssUrl(font: FontFamily, variant: 'full' | 'no-italic' | 'bare'): string {
  const family = font.family.replace(/ /g, '+')
  const spec =
    variant === 'bare' ? family : `${family}:${axisSpec(font, variant === 'full' && Boolean(font.italic))}`
  return `https://fonts.googleapis.com/css2?family=${spec}&display=swap`
}

async function fetchText(url: string): Promise<string> {
  let lastError: unknown
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
      if (response.status === 400) throw new HttpError(url, 400)
      if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`)
      return await response.text()
    } catch (error) {
      lastError = error
      // A 400 is a bad family name or axis — retrying cannot help.
      if (error instanceof HttpError) break
      if (attempt < RETRIES) await sleep(400 * attempt)
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError))
}

class HttpError extends Error {
  constructor(
    url: string,
    readonly status: number,
  ) {
    super(`${status} for ${url}`)
  }
}

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))

/**
 * The stylesheet, trying simpler axis requests when Google rejects the one the
 * registry asks for. Returns the warning so the registry can be corrected.
 */
async function fetchFontCss(font: FontFamily): Promise<{ css: string; warning?: string }> {
  try {
    return { css: await fetchText(cssUrl(font, 'full')) }
  } catch (error) {
    if (!(error instanceof HttpError)) throw error
  }
  if (font.italic) {
    try {
      const css = await fetchText(cssUrl(font, 'no-italic'))
      return { css, warning: `${font.family}: italic rejected — drop \`italic\` from the registry entry` }
    } catch (error) {
      if (!(error instanceof HttpError)) throw error
    }
  }
  const css = await fetchText(cssUrl(font, 'bare'))
  return {
    css,
    warning: `${font.family}: weight axis rejected — fix \`weights\` in the registry entry (defaults downloaded)`,
  }
}

/* ── Parsing ─────────────────────────────────────────────────────────────── */

interface ParsedFace {
  subset: string
  weight: number | 'variable'
  style: 'normal' | 'italic'
  remoteUrl: string
  unicodeRange: string
}

const FACE_RE = /\/\*\s*([\w-]+)\s*\*\/\s*@font-face\s*\{([^}]*)\}/g

function parseFaces(css: string): ParsedFace[] {
  const faces: ParsedFace[] = []
  for (const match of css.matchAll(FACE_RE)) {
    const subset = match[1]
    if (!(KEPT_SUBSETS as readonly string[]).includes(subset)) continue
    const body = match[2]
    const url = /src:\s*url\((https:\/\/[^)]+\.woff2)\)/.exec(body)?.[1]
    const unicodeRange = /unicode-range:\s*([^;]+);/.exec(body)?.[1]?.trim()
    const weightRaw = /font-weight:\s*([^;]+);/.exec(body)?.[1]?.trim()
    const style = /font-style:\s*(italic|normal)/.exec(body)?.[1] === 'italic' ? 'italic' : 'normal'
    if (!url || !unicodeRange || !weightRaw) continue
    faces.push({
      subset,
      weight: weightRaw.includes(' ') ? 'variable' : Number(weightRaw),
      style,
      remoteUrl: url,
      unicodeRange,
    })
  }
  return faces
}

/** `latin-400-normal.woff2`, `arabic-variable-italic.woff2`. */
function fileName(face: ParsedFace): string {
  return `${face.subset}-${face.weight}-${face.style}.woff2`
}

/* ── Downloading ─────────────────────────────────────────────────────────── */

async function download(url: string, target: string): Promise<void> {
  let lastError: unknown
  for (let attempt = 1; attempt <= RETRIES; attempt++) {
    try {
      const response = await fetch(url, { headers: { 'User-Agent': USER_AGENT } })
      if (!response.ok) throw new Error(`${response.status} ${response.statusText} for ${url}`)
      writeFileSync(target, Buffer.from(await response.arrayBuffer()))
      return
    } catch (error) {
      lastError = error
      if (attempt < RETRIES) await sleep(400 * attempt)
    }
  }
  throw lastError instanceof Error ? lastError : new Error(String(lastError))
}

/** Runs tasks with at most `CONCURRENCY` in flight. */
async function pooled<T>(tasks: (() => Promise<T>)[]): Promise<T[]> {
  const results: T[] = new Array(tasks.length)
  let next = 0
  const workers = Array.from({ length: Math.min(CONCURRENCY, tasks.length) }, async () => {
    while (next < tasks.length) {
      const index = next++
      results[index] = await tasks[index]()
    }
  })
  await Promise.all(workers)
  return results
}

/* ── One family ──────────────────────────────────────────────────────────── */

function faceCss(font: FontFamily, face: ParsedFace): string {
  const weight =
    face.weight === 'variable' && 'variable' in font.weights
      ? `${font.weights.variable[0]} ${font.weights.variable[1]}`
      : String(face.weight)
  return [
    '@font-face {',
    `  font-family: '${font.family}';`,
    `  font-style: ${face.style};`,
    `  font-weight: ${weight};`,
    '  font-display: swap;',
    `  src: url(/fonts/${font.id}/${fileName(face)}) format('woff2');`,
    `  unicode-range: ${face.unicodeRange};`,
    '}',
  ].join('\n')
}

interface SyncResult {
  files: FontFile[]
  skipped: boolean
  warning?: string
}

async function syncFamily(
  font: FontFamily,
  previous: FontFile[] | undefined,
  force: boolean,
): Promise<SyncResult> {
  const cssPath = path.join(FONTS_DIR, `${font.id}.css`)
  const upToDate =
    !force &&
    existsSync(cssPath) &&
    previous !== undefined &&
    previous.length > 0 &&
    previous.every((file) => existsSync(path.join(PUBLIC_DIR, file.url.replace(/^\//, ''))))
  if (upToDate) return { files: previous, skipped: true }

  const { css, warning } = await fetchFontCss(font)
  const faces = parseFaces(css)
  if (faces.length === 0)
    throw new Error(`no latin/arabic @font-face blocks in the stylesheet for ${font.family}`)

  const dir = path.join(FONTS_DIR, font.id)
  mkdirSync(dir, { recursive: true })

  const downloads = faces
    .filter((face) => force || !existsSync(path.join(dir, fileName(face))))
    .map((face) => () => download(face.remoteUrl, path.join(dir, fileName(face))))
  await pooled(downloads)

  const header = `/* ${font.family} — self-hosted by scripts/fonts-sync.ts. Do not edit. */`
  writeFileSync(cssPath, `${[header, ...faces.map((face) => faceCss(font, face))].join('\n')}\n`)

  const files: FontFile[] = faces.map((face) => ({
    subset: face.subset,
    weight: face.weight,
    style: face.style,
    url: `/fonts/${font.id}/${fileName(face)}`,
  }))
  return { files, skipped: false, warning }
}

/* ── Entry point ─────────────────────────────────────────────────────────── */

function readManifest(): FontManifest {
  if (!existsSync(MANIFEST_PATH)) return {}
  try {
    return JSON.parse(readFileSync(MANIFEST_PATH, 'utf8')) as FontManifest
  } catch {
    return {}
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const only = args
    .find((a) => a.startsWith('--only='))
    ?.slice('--only='.length)
    .split(',')
    .filter(Boolean)
  const families = only ? FONT_FAMILIES.filter((f) => only.includes(f.id)) : FONT_FAMILIES

  mkdirSync(FONTS_DIR, { recursive: true })
  const manifest = readManifest()
  const failures: string[] = []
  const warnings: string[] = []
  let synced = 0
  let skipped = 0

  // Families run one after another (each one downloads its own files in
  // parallel, four at a time) so Google never sees a burst.
  for (const font of families) {
    try {
      const result = await syncFamily(font, manifest[font.id], force)
      manifest[font.id] = result.files
      if (result.warning) warnings.push(result.warning)
      if (result.skipped) {
        skipped++
      } else {
        synced++
        console.log(`✓ ${font.family} — ${result.files.length} files`)
      }
    } catch (error) {
      failures.push(`${font.family} (${font.id}): ${error instanceof Error ? error.message : String(error)}`)
      console.error(`✗ ${font.family}: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  const ordered: FontManifest = {}
  for (const font of FONT_FAMILIES) if (manifest[font.id]) ordered[font.id] = manifest[font.id]
  writeFileSync(MANIFEST_PATH, `${JSON.stringify(ordered, null, 2)}\n`)

  console.log(`\n${synced} synced, ${skipped} up to date, ${failures.length} failed`)
  for (const warning of warnings) console.warn(`! ${warning}`)
  if (failures.length > 0) {
    console.error(`\nFailed families:\n${failures.map((f) => `  - ${f}`).join('\n')}`)
    process.exitCode = 1
  }
}

main().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
