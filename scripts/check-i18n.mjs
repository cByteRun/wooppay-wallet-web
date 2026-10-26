import assert from 'node:assert/strict'

const baseUrl = process.env.CHECK_BASE_URL || 'http://localhost:3100'
const routes = ['/', '/features', '/payments', '/transfers', '/skinmarket', '/tariffs', '/security', '/documents', '/download', '/faq', '/faq/download', '/faq/tariffs', '/faq/limits', '/faq/support']

async function load(route, cookie) {
  const response = await fetch(new URL(route, baseUrl), { headers: cookie ? { Cookie: cookie } : {} })
  assert.equal(response.status, 200, `${route}: status`)
  return response.text()
}

const defaultHtml = await load('/')
assert.match(defaultHtml, /<html[^>]*lang="ru-KZ"/, 'Russian is the default without a cookie')
assert.match(defaultHtml, /Всё твоё\./)
assert.match(await load('/', 'wooppay-locale=unknown'), /<html[^>]*lang="ru-KZ"/, 'Invalid locales fall back to Russian')

for (const route of routes) {
  const [ru, en] = await Promise.all([load(route, 'wooppay-locale=ru'), load(route, 'wooppay-locale=en')])
  assert.match(ru, /<html[^>]*lang="ru-KZ"/, `${route}: Russian document language`)
  assert.match(en, /<html[^>]*lang="en"/, `${route}: English document language`)
  assert.notEqual(ru.match(/<title>(.*?)<\/title>/s)?.[1], en.match(/<title>(.*?)<\/title>/s)?.[1], `${route}: translated title`)
  assert.match(en, /<meta[^>]*property="og:locale"[^>]*content="en_US"/, `${route}: English Open Graph locale`)
  const visibleHtml = en.replace(/<script\b[^>]*>[\s\S]*?<\/script>|<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replaceAll('aria-label="Русский"', '')
  assert.doesNotMatch(visibleHtml, /[А-Яа-яЁё]/u, `${route}: no untranslated Russian text or accessible labels`)
  for (const match of en.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const schema = JSON.parse(match[1])
    assert.doesNotMatch(JSON.stringify(schema), /[А-Яа-яЁё]/u, `${route}: translated structured data`)
  }
}
assert.match(await load('/'), /<html[^>]*lang="ru-KZ"/, 'An English request does not change another visitor’s default')
console.log(`i18n check passed: ${routes.length} routes in RU/EN, default and invalid locales, metadata, accessible labels, structured data and request isolation.`)
