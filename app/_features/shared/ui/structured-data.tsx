import { getLocale, getTranslator } from '@/shared/lib/i18n/server'
import { languageTag, type Translator } from '@/shared/lib/i18n/translate'

function localize(value: unknown, t: Translator, tag: string): unknown {
  if (typeof value === 'string') return t(value)
  if (Array.isArray(value)) return value.map(item => localize(item, t, tag))
  if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([key, item]) =>
    [key, key === 'inLanguage' ? tag : localize(item, t, tag)]))
  return value
}

export async function StructuredData({ data }: { data: Record<string, unknown> }) {
  const t = await getTranslator()
  const tag = languageTag(await getLocale())
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localize(data, t, tag)).replace(/</g, '\\u003c') }} />
}
