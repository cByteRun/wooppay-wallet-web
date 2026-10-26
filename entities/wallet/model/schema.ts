import { SITE_URL, STORE_LINKS } from '@/shared/config/site'
export const walletSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Wooppay Wallet', url: SITE_URL, inLanguage: 'ru-KZ' },
    { '@type': 'MobileApplication', '@id': `${SITE_URL}/#app`, name: 'Wooppay App', alternateName: 'Wooppay Wallet', url: `${SITE_URL}/download`, operatingSystem: 'iOS, Android', applicationCategory: 'FinanceApplication', installUrl: [STORE_LINKS.ios, STORE_LINKS.android], sameAs: [STORE_LINKS.ios, STORE_LINKS.android] },
  ],
}
