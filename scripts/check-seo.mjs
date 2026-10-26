import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { PNG } from 'pngjs'
import jsQR from 'jsqr'
import { detectPlatform } from '../features/app-download/model/platform.ts'

// Inspect actual build output, not React's hydration payload or source strings.
const routes = ['', 'download', 'features', 'payments', 'transfers', 'skinmarket', 'tariffs', 'security', 'faq', 'faq/download', 'faq/tariffs', 'faq/support']
const origin = (process.env.SITE_URL || 'https://wooppay.com').replace(/\/$/, '')
const index = process.env.SITE_INDEXING_ENABLED === 'true'
const titles = new Set()
const descriptions = new Set()
for (const route of routes) {
  const html = await readFile(`.next/server/app/${route || 'index'}.html`, 'utf8')
  const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  assert.equal((visibleHtml.match(/<h1\b/g) || []).length, 1, `${route}: one H1`)
  const title = html.match(/<title>(.*?)<\/title>/)?.[1]
  assert.ok(title && !titles.has(title), `${route}: unique title`)
  titles.add(title)
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1]
  assert.ok(description && !descriptions.has(description), `${route}: unique description`)
  descriptions.add(description)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  assert.equal(canonical, `${origin}${route ? `/${route}` : ''}`)
  assert.ok(html.includes(`name="robots" content="${index ? 'index' : 'noindex'}, follow"`), `${route}: indexing policy`)
  assert.ok(html.includes('property="og:image"'), `${route}: OG image`)
  let schemaCount = 0
  for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)) {
    schemaCount++
    const schema = JSON.parse(match[1])
    assert.equal(schema['@context'], 'https://schema.org')
  }
  assert.ok(schemaCount > 0, `${route}: server-rendered JSON-LD`)
  if (route.startsWith('faq/')) {
    assert.ok(visibleHtml.includes('Проверено'), `${route}: visible review date`)
    assert.ok(visibleHtml.includes('href="/faq"'), `${route}: parent FAQ link`)
    assert.ok(html.includes(`${origin}/${route}#webpage`), `${route}: page entity`)
  }
  for (const match of visibleHtml.matchAll(/href="(\/[^"?#]*)"/g)) {
    const href = match[1]
    if (href.startsWith('/_next/') || href === '/opengraph-image') continue
    assert.ok(routes.includes(href.slice(1)), `${route}: internal link ${href} must resolve`)
  }
  if (route === '' || route === 'download') {
    const expected = ['https://apps.apple.com/kz/app/wooppay-app/id913826829', 'https://play.google.com/store/apps/details?id=com.wooppay.wooppayapplication']
    for (const url of expected) assert.ok(visibleHtml.includes(`href="${url}"`), `${route}: stores available without JavaScript`)
    const images = [...visibleHtml.matchAll(/src="data:image\/png;base64,([^"]+)"/g)]
    assert.equal(images.length, 2, `${route}: two real QR images`)
    const decoded = images.map(match => {
      const png = PNG.sync.read(Buffer.from(match[1], 'base64'))
      const qr = jsQR(new Uint8ClampedArray(png.data), png.width, png.height)
      assert.ok(qr, 'QR must independently decode')
      return qr.data
    })
    assert.deepEqual(decoded.sort(), expected.sort(), `${route}: each QR leads to its own store`)
  }
}
assert.equal(detectPlatform('Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X)', 5), 'ios')
assert.equal(detectPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 5), 'ios')
assert.equal(detectPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15)', 0), 'other')
assert.equal(detectPlatform('Mozilla/5.0 (Linux; Android 14; Pixel 8)', 5), 'android')
assert.equal(detectPlatform('Mozilla/5.0 (Windows NT 10.0; Win64; x64)', 0), 'other')
const sitemap = await readFile('.next/server/app/sitemap.xml.body', 'utf8')
assert.equal((sitemap.match(/<loc>/g) || []).length, index ? routes.length : 0)
if (index) {
  for (const route of routes) assert.ok(sitemap.includes(`<loc>${origin}${route ? `/${route}` : ''}</loc>`))
  assert.ok(sitemap.includes('2026-10-26'))
}
const robots = await readFile('.next/server/app/robots.txt.body', 'utf8')
assert.ok(robots.includes('Allow: /'))
assert.equal(robots.includes('Sitemap:'), index)
const og = await readFile('.next/server/app/opengraph-image.body')
assert.equal(og.subarray(1, 4).toString(), 'PNG')
console.log(`SEO check passed: ${routes.length} pages, metadata, HTML links, schema, sitemap, robots, OG PNG, platform detection, 4 independently decoded QR images. Indexing: ${index}.`)
