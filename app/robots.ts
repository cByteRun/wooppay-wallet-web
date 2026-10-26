import type { MetadataRoute } from 'next'
import { INDEXING_ENABLED, SITE_URL } from '@/shared/config/site'
export default function robots(): MetadataRoute.Robots {
  return { rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/'] }, ...(INDEXING_ENABLED ? { sitemap: `${SITE_URL}/sitemap.xml` } : {}) }
}
