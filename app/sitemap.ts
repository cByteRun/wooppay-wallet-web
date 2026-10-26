import type { MetadataRoute } from 'next'
import { INDEXING_ENABLED, SITE_PAGES, SITE_URL, CONTENT_REVIEWED_AT } from '@/shared/config/site'
export default function sitemap(): MetadataRoute.Sitemap {
  return INDEXING_ENABLED ? SITE_PAGES.map(page => ({ url: `${SITE_URL}${page.path === '/' ? '' : page.path}`, lastModified: CONTENT_REVIEWED_AT })) : []
}
