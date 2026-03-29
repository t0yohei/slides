import { mkdirSync, readdirSync, existsSync, readFileSync, writeFileSync, rmSync, cpSync, statSync, createReadStream } from 'node:fs'
import { spawnSync, spawn } from 'node:child_process'
import { createServer } from 'node:http'
import path from 'node:path'

const decksDir = path.resolve('decks')
const defaultDeck = 'index'
const distDir = path.resolve('dist')
const basePrefix = normalizeBasePrefix(process.env.SLIDEV_BASE_PREFIX || '')

function normalizeBasePrefix(value) {
  const trimmed = String(value || '').trim().replace(/^\/+|\/+$/g, '')
  return trimmed ? `/${trimmed}` : ''
}

function withBasePrefix(route = '/') {
  const normalizedRoute = route.startsWith('/') ? route : `/${route}`
  if (normalizedRoute === '/') return `${basePrefix}/` || '/'
  return `${basePrefix}${normalizedRoute}`
}

function toTitleCaseFromSlug(slug) {
  return slug
    .split(/[-_]/g)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function getDecks({ includeIndex = true } = {}) {
  if (!existsSync(decksDir)) return []
  return readdirSync(decksDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && existsSync(path.join(decksDir, entry.name, 'slides.md')))
    .map((entry) => entry.name)
    .filter((deck) => includeIndex || deck !== defaultDeck)
    .sort()
}

function getDeckMeta(deck) {
  const entry = path.join(decksDir, deck, 'slides.md')
  let title = toTitleCaseFromSlug(deck)
  if (existsSync(entry)) {
    const text = readFileSync(entry, 'utf8')
    const frontmatterMatch = text.match(/^---\n([\s\S]*?)\n---/)
    if (frontmatterMatch) {
      const titleMatch = frontmatterMatch[1].match(/^title:\s*(.+)$/m)
      if (titleMatch) title = titleMatch[1].trim().replace(/^['"]|['"]$/g, '')
    }
  }
  return { slug: deck, title }
}

function resolveDeck(inputDeck) {
  const decks = getDecks()
  if (decks.length === 0) {
    console.error('No decks found in ./decks')
    process.exit(1)
  }

  const preferredDefault = decks.includes(defaultDeck) ? defaultDeck : decks[0]
  const deck = inputDeck || process.env.SLIDE_DECK || preferredDefault
  if (!decks.includes(deck)) {
    console.error(`Unknown deck: ${deck}`)
    console.error(`Available decks: ${decks.join(', ')}`)
    process.exit(1)
  }
  return deck
}

function cleanDist() {
  rmSync(distDir, { recursive: true, force: true })
}

function copyPublicAssets() {
  const publicDir = path.resolve('public')
  if (!existsSync(publicDir)) return
  cpSync(publicDir, distDir, { recursive: true })
}

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false })
  if (result.status !== 0) process.exit(result.status ?? 1)
}

function spawnStreaming(command, args, options = {}) {
  return spawn(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options,
  })
}

function ensureDeck(slug, title) {
  const deckDir = path.join(decksDir, slug)
  const publicDir = path.join('public', 'decks', slug)
  mkdirSync(deckDir, { recursive: true })
  mkdirSync(publicDir, { recursive: true })

  const entry = path.join(deckDir, 'slides.md')
  if (existsSync(entry)) {
    console.error(`Deck already exists: ${slug}`)
    process.exit(1)
  }

  writeFileSync(
    entry,
    `---\ntheme: seriph\ntitle: ${title}\ninfo: |\n  ${title}\nclass: text-center\ndrawings:\n  persist: false\ntransition: slide-left\nmdc: true\nrouterMode: hash\n---\n\n<style>\n:root {\n  color-scheme: light;\n}\n\nhtml,\nbody,\n#slide-content,\n.slidev-layout {\n  background: #fffaf5 !important;\n  color: #111827 !important;\n}\n\n.slidev-layout h1,\n.slidev-layout h2,\n.slidev-layout h3,\n.slidev-layout h4,\n.slidev-layout h5,\n.slidev-layout h6,\n.slidev-layout p,\n.slidev-layout li,\n.slidev-layout div,\n.slidev-layout span,\n.slidev-layout blockquote {\n  color: #111827 !important;\n}\n\n.slidev-layout strong {\n  color: #0f172a !important;\n}\n\n.slidev-layout code {\n  color: #b45309 !important;\n}\n\n.slidev-layout a {\n  color: #c2410c !important;\n  text-decoration-color: rgba(194, 65, 12, 0.35) !important;\n}\n</style>\n\n# ${title}\n\n<div class="mt-8 text-xl opacity-70">subtitle</div>\n\n<div class="mt-14 text-lg opacity-60">t0yohei</div>\n\n---\nlayout: section\n---\n\n# Section\n\n---\n\n# Message\n\n- point 1\n- point 2\n- point 3\n\n---\nlayout: center\nclass: text-center\n---\n\n# Thank you\n`,
  )
}

function generateCloudflareRedirects() {
  const decks = getDecks({ includeIndex: false })
  const lines = []

  for (const deck of decks) {
    lines.push(`/${deck} /${deck}/ 301`)
    lines.push(`/${deck}/* /${deck}/index.html 200`)
  }

  lines.push('/* /index.html 200')
  writeFileSync(path.join('public', '_redirects'), `${lines.join('\n')}\n`)
}

function generateIndexDeck() {
  const deckDir = path.join(decksDir, defaultDeck)
  mkdirSync(deckDir, { recursive: true })

  const decks = getDecks({ includeIndex: false }).map(getDeckMeta)
  const cards = decks.length
    ? decks
        .map(({ slug, title }) => {
          const href = withBasePrefix(`/${slug}/`)
          return [
            `<a href="${href}" target="_self">${title}</a>`,
            `<div class="text-sm opacity-60 mt-1">decks/${slug}/slides.md</div>`,
          ].join('\n')
        })
        .join('\n\n')
    : '- まだ deck はない'

  const content = `---
theme: seriph
title: Slide Deck Catalog
info: |
  Multiple Slidev decks managed in one repository
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
routerMode: hash
---

<style>
:root {
  color-scheme: light;
}

html,
body,
#slide-content,
.slidev-layout {
  background: #fffaf5 !important;
  color: #111827 !important;
}

.slidev-layout h1,
.slidev-layout h2,
.slidev-layout h3,
.slidev-layout h4,
.slidev-layout h5,
.slidev-layout h6,
.slidev-layout p,
.slidev-layout li,
.slidev-layout div,
.slidev-layout span,
.slidev-layout blockquote {
  color: #111827 !important;
}

.slidev-layout strong {
  color: #0f172a !important;
}

.slidev-layout code {
  color: #b45309 !important;
}

.slidev-layout a {
  color: #c2410c !important;
  text-decoration-color: rgba(194, 65, 12, 0.35) !important;
}
</style>

# Slide Deck Catalog

<div class="mt-6 text-lg opacity-70">
このリポジトリで管理している発表資料一覧
</div>

---
layout: default
---

# Decks

${cards}

<div class="mt-10 text-sm opacity-60">
新規追加: <code>npm run deck:new -- --slug your-deck-slug --title \"Your Deck Title\"</code>
</div>
`

  writeFileSync(path.join(deckDir, 'slides.md'), content)
}

function parseNewDeckArgs(args) {
  let slug = ''
  let title = ''

  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (arg === '--slug') slug = args[i + 1] || ''
    if (arg === '--title') title = args[i + 1] || ''
  }

  if (!slug) slug = args.find((arg) => !arg.startsWith('--')) || ''
  if (!slug) {
    console.error('Usage: node scripts/slides.mjs new --slug <slug> --title "Deck Title"')
    process.exit(1)
  }

  if (!title) title = toTitleCaseFromSlug(slug)
  return { slug, title }
}

function getFlagValue(args, names, fallback) {
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i]
    if (!names.includes(arg)) continue
    const next = args[i + 1]
    if (next && !next.startsWith('--')) return next
  }
  return fallback
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8'
    case '.js':
      return 'application/javascript; charset=utf-8'
    case '.css':
      return 'text/css; charset=utf-8'
    case '.json':
      return 'application/json; charset=utf-8'
    case '.svg':
      return 'image/svg+xml'
    case '.png':
      return 'image/png'
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg'
    case '.webp':
      return 'image/webp'
    case '.gif':
      return 'image/gif'
    case '.ico':
      return 'image/x-icon'
    case '.txt':
      return 'text/plain; charset=utf-8'
    case '.woff':
      return 'font/woff'
    case '.woff2':
      return 'font/woff2'
    default:
      return 'application/octet-stream'
  }
}

function startStaticPreviewServer(args) {
  const port = Number(getFlagValue(args, ['--port', '-p'], process.env.PORT || '3030'))
  const host = process.env.HOST || '127.0.0.1'

  cleanDist()
  generateIndexDeck()
  generateCloudflareRedirects()

  const allDecks = getDecks()
  for (const deck of allDecks) {
    const outDir = deck === defaultDeck ? distDir : path.join(distDir, deck)
    const base = deck === defaultDeck ? withBasePrefix('/') : withBasePrefix(`/${deck}/`)
    console.log(`\n=== Building ${deck} -> ${outDir} (base: ${base}) ===`)
    run('npx', ['slidev', 'build', path.join('decks', deck, 'slides.md'), '--out', outDir, '--base', base])
  }
  copyPublicAssets()

  const server = createServer((req, res) => {
    const requestPath = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`).pathname
    const safePath = path.normalize(decodeURIComponent(requestPath)).replace(/^([.][.][/\\])+/, '')
    let filePath = path.join(distDir, safePath)

    try {
      if (existsSync(filePath) && statSync(filePath).isDirectory()) {
        filePath = path.join(filePath, 'index.html')
      } else if (!existsSync(filePath) || statSync(filePath).isDirectory()) {
        const asHtml = `${filePath}.html`
        if (existsSync(asHtml)) {
          filePath = asHtml
        } else {
          filePath = path.join(distDir, safePath, 'index.html')
        }
      }

      if (!existsSync(filePath)) {
        filePath = path.join(distDir, 'index.html')
      }

      res.writeHead(200, { 'Content-Type': getContentType(filePath) })
      createReadStream(filePath).pipe(res)
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end(String(error))
    }
  })

  server.listen(port, host, () => {
    console.log(`\nStatic preview ready: http://${host}:${port}`)
    console.log('Index deck links now work locally across all built decks.')
  })
}

function startPairedDevServer(deck, args) {
  if (!deck || deck === defaultDeck) {
    console.error('Usage: node scripts/slides.mjs dev-pair <deck> [--index-port <port>] [--deck-port <port>]')
    console.error(`Choose a deck other than ${defaultDeck}.`)
    process.exit(1)
  }

  const indexPort = String(getFlagValue(args, ['--index-port'], '3030'))
  const deckPort = String(getFlagValue(args, ['--deck-port'], '3031'))
  const host = process.env.HOST || '127.0.0.1'
  const childEnv = { ...process.env, HOST: host }

  console.log(`Starting paired dev mode for ${deck}`)
  console.log(`- catalog preview: http://${host}:${indexPort}`)
  console.log(`- deck HMR: http://${host}:${deckPort}`)

  const catalog = spawnStreaming(process.execPath, [path.resolve('scripts/slides.mjs'), 'dev', defaultDeck, '--port', indexPort], {
    env: childEnv,
  })

  const deckDev = spawnStreaming('npx', ['slidev', path.join('decks', deck, 'slides.md'), '--open', '--port', deckPort], {
    env: childEnv,
  })

  let shuttingDown = false
  const shutdown = (signal = 'SIGTERM') => {
    if (shuttingDown) return
    shuttingDown = true
    if (!catalog.killed) catalog.kill(signal)
    if (!deckDev.killed) deckDev.kill(signal)
  }

  const bindExit = (child, name) => {
    child.on('exit', (code, signal) => {
      if (shuttingDown) return
      console.error(`${name} exited (${signal || code})`)
      shutdown(signal || 'SIGTERM')
      process.exit(typeof code === 'number' ? code : 1)
    })
  }

  bindExit(catalog, 'catalog preview')
  bindExit(deckDev, 'deck dev server')

  process.on('SIGINT', () => shutdown('SIGINT'))
  process.on('SIGTERM', () => shutdown('SIGTERM'))
}

const [command = 'list', maybeDeckRaw, ...restRaw] = process.argv.slice(2)
const maybeDeck = maybeDeckRaw && !String(maybeDeckRaw).startsWith('--') ? maybeDeckRaw : ''
const rest = maybeDeck ? restRaw : [maybeDeckRaw, ...restRaw].filter(Boolean)
const decks = getDecks()

if (command === 'list') {
  decks.forEach((deck) => console.log(deck))
  process.exit(0)
}

if (command === 'generate-index') {
  generateIndexDeck()
  generateCloudflareRedirects()
  process.exit(0)
}

if (command === 'new') {
  const { slug, title } = parseNewDeckArgs([maybeDeck, ...rest].filter(Boolean))
  ensureDeck(slug, title)
  generateIndexDeck()
  generateCloudflareRedirects()
  console.log(`Created deck: ${slug}`)
  process.exit(0)
}

if (command === 'build-all') {
  cleanDist()
  generateIndexDeck()
  generateCloudflareRedirects()
  const allDecks = getDecks()
  if (allDecks.length === 0) {
    console.error('No decks found in ./decks')
    process.exit(1)
  }
  for (const deck of allDecks) {
    const outDir = deck === defaultDeck ? distDir : path.join(distDir, deck)
    const base = deck === defaultDeck ? withBasePrefix('/') : withBasePrefix(`/${deck}/`)
    console.log(`\n=== Building ${deck} -> ${outDir} (base: ${base}) ===`)
    run('npx', ['slidev', 'build', path.join('decks', deck, 'slides.md'), '--out', outDir, '--base', base, ...rest])
  }
  copyPublicAssets()
  process.exit(0)
}

if (command === 'dev-pair') {
  const deck = resolveDeck(maybeDeck)
  startPairedDevServer(deck, rest)
  await new Promise(() => {})
}

const deck = resolveDeck(maybeDeck)
const entry = path.join('decks', deck, 'slides.md')

switch (command) {
  case 'dev':
    if (deck === defaultDeck) {
      startStaticPreviewServer(rest)
      break
    }
    run('npx', ['slidev', entry, '--open', ...rest])
    break
  case 'build': {
    cleanDist()
    if (deck === defaultDeck) generateIndexDeck()
    const outDir = deck === defaultDeck ? distDir : path.join(distDir, deck)
    const base = deck === defaultDeck ? withBasePrefix('/') : withBasePrefix(`/${deck}/`)
    run('npx', ['slidev', 'build', entry, '--out', outDir, '--base', base, ...rest])
    copyPublicAssets()
    break
  }
  case 'export':
    run('npx', ['slidev', 'export', entry, ...rest])
    break
  default:
    console.error(`Unknown command: ${command}`)
    console.error('Usage: node scripts/slides.mjs <list|generate-index|new|dev|dev-pair|build|build-all|export> [deck] [--port <port>]')
    process.exit(1)
}
