import { getLocale, getTranslator } from '@/shared/lib/i18n/server'
import type { Metadata } from 'next'
import { SITE_PAGES, SITE_URL, type SitePath } from '@/shared/config/site'

export async function pageMetadata(path: SitePath): Promise<Metadata> {
  const t = await getTranslator()
  const locale = await getLocale()
  const page = SITE_PAGES.find(page => page.path === path)!
  const url = new URL(path, SITE_URL).href
  return {
    title: path === '/' ? { absolute: t(page.title) } : t(page.title),
    description: t(page.description),
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: 'Wooppay Wallet', locale: locale === 'en' ? 'en_US' : 'ru_KZ', title: t(page.title), description: t(page.description), url, images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: 'Wooppay Wallet' }] },
    twitter: { card: 'summary_large_image', title: t(page.title), description: t(page.description), images: [`${SITE_URL}/opengraph-image`] },
  }
}
