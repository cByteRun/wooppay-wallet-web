import type { Metadata } from 'next'
import { SITE_PAGES, SITE_URL, type SitePath } from '@/shared/config/site'

export function pageMetadata(path: SitePath): Metadata {
  const page = SITE_PAGES.find(page => page.path === path)!
  const url = new URL(path, SITE_URL).href
  return {
    title: path === '/' ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: url },
    openGraph: { type: 'website', siteName: 'Wooppay Wallet', locale: 'ru_KZ', title: page.title, description: page.description, url },
    twitter: { card: 'summary_large_image', title: page.title, description: page.description, images: [`${SITE_URL}/opengraph-image`] },
  }
}
