import { existsSync, readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { parse } from 'yaml'

const siteUrl = 'https://t0yohei.github.io/slides/'
const escapeXml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;',
})[character])

export function createRssFeed(decksDir) {
  const items = []
  for (const entry of readdirSync(decksDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || ['index', 'test-slide'].includes(entry.name)) continue
    const file = path.join(decksDir, entry.name, 'slides.md')
    if (!existsSync(file)) continue
    const source = readFileSync(file, 'utf8')
    const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/)
    const metadata = frontmatter ? parse(frontmatter[1]) : null
    if (metadata?.published == null) continue

    const { title, published } = metadata
    const date = new Date(`${published}T00:00:00Z`)
    if (typeof published !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(published)
      || Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== published) {
      throw new Error(`${file}: published must be a valid YYYY-MM-DD date`)
    }
    if (typeof title !== 'string' || !title.trim()) {
      throw new Error(`${file}: a published deck must have a title`)
    }
    const description = metadata.seoMeta?.ogDescription ?? metadata.info ?? title
    if (typeof description !== 'string') throw new Error(`${file}: description must be text`)
    items.push({ title: title.trim(), description: description.trim(), date,
      url: new URL(`${encodeURIComponent(entry.name)}/`, siteUrl).href })
  }
  items.sort((a, b) => b.date - a.date || a.url.localeCompare(b.url))

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>t0yohei のスライド</title>
    <link>${siteUrl}</link>
    <description>t0yohei が公開した発表スライド</description>
    <atom:link href="${siteUrl}feed.xml" rel="self" type="application/rss+xml" />
${items.map(({ title, description, date, url }) => `    <item>
      <title>${escapeXml(title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <description>${escapeXml(description)}</description>
      <pubDate>${date.toUTCString()}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>
`
}
