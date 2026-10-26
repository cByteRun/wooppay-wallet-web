import type { MetadataRoute } from 'next'
import { INDEXING_ENABLED, SITE_PAGES, SITE_URL, CONTENT_REVIEWED_AT } from '@/shared/config/site'
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXING_ENABLED ? SITE_PAGES.flatMap(page => {
    const ru = `${SITE_URL}${page.path === '/' ? '' : page.path}`
    const en = `${SITE_URL}/en${page.path === '/' ? '' : page.path}`
    return [ru, en].map(url => ({ url, lastModified: CONTENT_REVIEWED_AT, alternates: { languages: { 'ru-KZ': ru, en, 'x-default': ru } } }))
  }) : []
}
