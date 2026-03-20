import { mkdirSync, readdirSync, existsSync, readFileSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
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

function run(command, args) {
  const result = spawnSync(command, args, { stdio: 'inherit', shell: false })
  if (result.status !== 0) process.exit(result.status ?? 1)
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
    `---\ntheme: seriph\ntitle: ${title}\ninfo: |\n  ${title}\nclass: text-center\ndrawings:\n  persist: false\ntransition: slide-left\nmdc: true\n---\n\n# ${title}\n\n<div class="mt-8 text-xl opacity-70">subtitle</div>\n\n<div class="mt-14 text-lg opacity-60">t0yohei</div>\n\n---\nlayout: section\n---\n\n# Section\n\n---\n\n# Message\n\n- point 1\n- point 2\n- point 3\n\n---\nlayout: center\nclass: text-center\n---\n\n# Thank you\n`,
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
        .map(({ slug, title }) => `- [${title}](${withBasePrefix(`/${slug}/`)})\n  - decks/${slug}/slides.md`)
        .join('\n')
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
---

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

const [command = 'list', maybeDeck, ...rest] = process.argv.slice(2)
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
  process.exit(0)
}

const deck = resolveDeck(maybeDeck)
const entry = path.join('decks', deck, 'slides.md')

switch (command) {
  case 'dev':
    if (deck === defaultDeck) generateIndexDeck()
    run('npx', ['slidev', entry, '--open', ...rest])
    break
  case 'build': {
    if (deck === defaultDeck) generateIndexDeck()
    const outDir = deck === defaultDeck ? distDir : path.join(distDir, deck)
    const base = deck === defaultDeck ? withBasePrefix('/') : withBasePrefix(`/${deck}/`)
    run('npx', ['slidev', 'build', entry, '--out', outDir, '--base', base, ...rest])
    break
  }
  case 'export':
    run('npx', ['slidev', 'export', entry, ...rest])
    break
  default:
    console.error(`Unknown command: ${command}`)
    console.error('Usage: node scripts/slides.mjs <list|generate-index|new|dev|build|build-all|export> [deck]')
    process.exit(1)
}
