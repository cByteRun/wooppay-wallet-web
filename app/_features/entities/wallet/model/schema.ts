import { OFFICIAL } from '@/shared/config/official-resources'
import { SITE_URL, STORE_LINKS } from '@/shared/config/site'
export const walletSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'Organization', '@id': `${SITE_URL}/#operator`, name: 'ТОО «WOOPPAY (ВУППЭЙ)»', url: OFFICIAL.company, sameAs: [OFFICIAL.company, OFFICIAL.maps2gis, OFFICIAL.instagram, OFFICIAL.walletTelegram], address: { '@type': 'PostalAddress', streetAddress: 'проспект Нурсултана Назарбаева, 15', addressLocality: 'Караганда', addressCountry: 'KZ' }, contactPoint: { '@type': 'ContactPoint', contactType: 'customer support', email: 'spp@wooppay.com', url: OFFICIAL.help } },
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Wooppay Wallet', url: SITE_URL, inLanguage: ['ru-KZ', 'en'] },
    { '@type': 'MobileApplication', '@id': `${SITE_URL}/#app`, name: 'Wooppay App', alternateName: 'Wooppay Wallet', url: `${SITE_URL}/download`, operatingSystem: 'iOS, Android', applicationCategory: 'FinanceApplication', publisher: { '@id': `${SITE_URL}/#operator` }, installUrl: [STORE_LINKS.ios, STORE_LINKS.android], sameAs: [STORE_LINKS.ios, STORE_LINKS.android] },
  ],
}
