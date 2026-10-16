import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { createRssFeed } from '../scripts/rss.mjs'

function fixture(t) {
  const dir = mkdtempSync(path.join(tmpdir(), 'slides-rss-'))
  t.after(() => rmSync(dir, { recursive: true, force: true }))
  return {
    dir,
    deck(slug, frontmatter) {
      mkdirSync(path.join(dir, slug), { recursive: true })
      writeFileSync(path.join(dir, slug, 'slides.md'), `---\n${frontmatter}\n---\n# Slide`)
    },
  }
}

test('RSS includes only published decks, in date order, with stable public URLs', (t) => {
  const { dir, deck } = fixture(t)
  deck('older', 'title: Earlier\npublished: 2026-03-20')
  deck('newer', 'title: Latest\npublished: 2026-04-15')
  deck('draft', 'title: Draft')
  deck('index', 'title: Index\npublished: 2026-10-16')
  deck('test-slide', 'title: Test\npublished: 2026-10-16')
  mkdirSync(path.join(dir, 'assets'))
  const xml = createRssFeed(dir)
  assert.equal((xml.match(/<item>/g) ?? []).length, 2)
  assert.ok(xml.indexOf('<title>Latest</title>') < xml.indexOf('<title>Earlier</title>'))
  assert.ok(xml.includes('<link>https://t0yohei.github.io/slides/newer/</link>'))
  assert.ok(xml.includes('<guid isPermaLink="true">https://t0yohei.github.io/slides/newer/</guid>'))
  assert.ok(xml.includes('<pubDate>Wed, 15 Apr 2026 00:00:00 GMT</pubDate>'))
  assert.doesNotMatch(xml, /<title>(Draft|Index|Test)<\/title>/)
})

test('RSS escapes XML characters and reads quoted and multiline YAML metadata', (t) => {
  const { dir, deck } = fixture(t)
  deck('escaped', `title: '<Rails> & "Vue"'\npublished: 2026-03-20\ninfo: |\n  First & second\n  <example>`)
  const xml = createRssFeed(dir)
  assert.ok(xml.includes('<title>&lt;Rails&gt; &amp; &quot;Vue&quot;</title>'))
  assert.ok(xml.includes('<description>First &amp; second\n&lt;example&gt;</description>'))
  deck('escaped', `title: Rails\npublished: 2026-03-20\ninfo: Original\nseoMeta:\n  ogDescription: "Reader's summary"`)
  assert.ok(createRssFeed(dir).includes('<description>Reader&apos;s summary</description>'))
})

test('invalid publication dates and missing titles fail instead of producing broken entries', (t) => {
  const { dir, deck } = fixture(t)
  for (const published of ['2026-02-30', 'tomorrow', '123', '""', '2026-04-15T12:00:00Z']) {
    deck('invalid', `title: Invalid\npublished: ${published}`)
    assert.throws(() => createRssFeed(dir), /published must be a valid YYYY-MM-DD date/)
  }
  deck('invalid', 'published: 2026-04-15')
  assert.throws(() => createRssFeed(dir), /must have a title/)
})
