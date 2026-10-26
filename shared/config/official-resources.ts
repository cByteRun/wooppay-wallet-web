// Verified against the official service and regulator on 2026-10-26.
// Keep external resources independent of SITE_URL: the brochure may use another host.
export const OFFICIAL = {
  services: 'https://www.wooppay.com/services',
  commissions: 'https://www.wooppay.com/site/commissions',
  help: 'https://www.wooppay.com/faq',
  documents: 'https://www.wooppay.com/site/agreement',
  company: 'https://wooppay.group/',
  business: 'https://www.woopkassa.kz/',
  supportEmail: 'mailto:spp@wooppay.com',
  telegram: 'https://t.me/wooppay_support',
  registry: 'https://nationalbank.kz/ru/news/sistemy-elektronnyh-deneg-kazahstana',
} as const
