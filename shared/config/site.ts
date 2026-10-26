// Set the final owned domain at build time; do not guess a new production host.
const configuredUrl = new URL(process.env.SITE_URL || "https://wooppay.com")
if (!['http:', 'https:'].includes(configuredUrl.protocol) || configuredUrl.username || configuredUrl.password || configuredUrl.pathname !== '/' || configuredUrl.search || configuredUrl.hash) {
  throw new Error('SITE_URL must be an absolute HTTP(S) origin without a path or credentials')
}
export const SITE_URL = configuredUrl.origin
// Staging stays out of search until indexing is explicitly enabled.
export const INDEXING_ENABLED = process.env.SITE_INDEXING_ENABLED === 'true'
export const STORE_LINKS = {
  ios: 'https://apps.apple.com/kz/app/wooppay-app/id913826829',
  android: 'https://play.google.com/store/apps/details?id=com.wooppay.wooppayapplication',
} as const
export const CONTENT_REVIEWED_AT = '2026-10-26'
export const SITE_PAGES = [
  { path: '/', title: 'Wooppay Wallet — электронный кошелёк для iOS и Android', description: 'Wooppay Wallet: платежи, пополнения и цифровые сервисы. Узнайте о приложении и скачайте его в App Store или Google Play.' },
  { path: '/download', title: 'Скачать Wooppay Wallet для iPhone и Android', description: 'Прямые ссылки на Wooppay в App Store и Google Play. На компьютере отсканируйте отдельный QR-код для iPhone или Android.' },
  { path: '/features', title: 'Возможности кошелька Wooppay', description: 'Возможности Wooppay: оплата услуг, пополнение зарубежных карт и электронных кошельков, SkinMarket CS2.' },
  { path: '/payments', title: 'Оплата услуг через Wooppay Wallet', description: 'Какие услуги можно оплачивать через Wooppay: мобильная связь, интернет, коммунальные и транспортные услуги.' },
  { path: '/transfers', title: 'Пополнение зарубежных карт и кошельков в Wooppay', description: 'Что известно о международных пополнениях в Wooppay и где проверить доступность направления, курс и итоговую сумму.' },
  { path: '/skinmarket', title: 'SkinMarket CS2 в приложении Wooppay', description: 'Покупка, продажа и обмен скинов CS2 внутри Wooppay. Где найти SkinMarket и проверить условия сделки.' },
  { path: '/tariffs', title: 'Тарифы и лимиты Wooppay: где проверить условия', description: 'Как проверить комиссию, курс и ограничения операции в Wooppay перед подтверждением платежа или пополнения.' },
  { path: '/security', title: 'Безопасность и поддержка Wooppay Wallet', description: 'Как найти официальное приложение Wooppay и контакты поддержки, проверить платежи и защитить доступ к кошельку.' },
  { path: '/faq', title: 'Вопросы и ответы о Wooppay Wallet', description: 'Что такое Wooppay, где скачать приложение, как проверить условия операций и найти поддержку.' },
] as const
export type SitePath = typeof SITE_PAGES[number]['path']
