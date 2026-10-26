import { LocaleProvider } from '@/shared/lib/i18n/provider'
import { languageTag } from '@/shared/lib/i18n/translate'
import { getLocale, getTranslator } from '@/shared/lib/i18n/server'
import { OFFICIAL } from '@/shared/config/official-resources'
import type { Metadata } from 'next'
import Link from '@/shared/lib/i18n/link'
import { SITE_URL, INDEXING_ENABLED } from '@/shared/config/site'
import { StructuredData } from '@/shared/ui/structured-data'
import { walletSchema } from '@/entities/wallet/model/schema'
import './globals.css'
export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslator()
  return {
  metadataBase: new URL(SITE_URL),
  title: { default: t('Wooppay Wallet — электронный кошелёк'), template: '%s | Wooppay Wallet' },
  description: t('Wooppay Wallet: приложение для платежей, пополнений и цифровых сервисов.'),
  robots: { index: INDEXING_ENABLED, follow: true },
  other: { 'apple-itunes-app': 'app-id=913826829' },
}
}
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const t = await getTranslator()
  const locale = await getLocale()

  return <html lang={languageTag(locale)} suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('wooppay-theme');document.documentElement.dataset.walletTheme=t==='dark'||t==='light'?t:matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}catch(e){document.documentElement.dataset.walletTheme='light'}})()` }}/></head><body><LocaleProvider locale={locale}><StructuredData data={walletSchema} />{children}<footer className="border-t border-white/10 px-6 py-8"><nav aria-label={t("Разделы сайта")} className="mx-auto flex max-w-7xl flex-wrap gap-6 text-sm text-slate-300">{[['/partners','Партнёрам'],['/#info-payments','Оплата услуг'],['/#info-transfers','Пополнения'],['/#info-skinmarket','SkinMarket CS2'],['/#info-tariffs','Тарифы и лимиты'],['/#info-faq','Вопросы и ответы'],['/#info-documents','Документы и оператор'],['/#info-security','Безопасность'],['/#download','Скачать приложение']].map(([href,label]) => <Link key={href} href={href}>{t(label)}</Link>)}</nav><div className="mx-auto mt-6 flex max-w-7xl flex-wrap gap-5 text-sm text-slate-400"><a href={OFFICIAL.supportEmail}>{t("Поддержка: spp@wooppay.com")}</a><a href={OFFICIAL.company}>{t("О компании")}</a><a href={OFFICIAL.business}>{t("Приём платежей для бизнеса")}</a></div><p className="mx-auto mt-6 max-w-7xl text-sm leading-6 text-slate-400">{t("Правовое уведомление: этот сайт — демонстрационный проект, разрабатываемый по заказу для Wooppay. Он не является утверждённым официальным ресурсом Wooppay. Все права на бренд Wooppay, товарные знаки, логотипы и мобильные приложения принадлежат Wooppay и соответствующим правообладателям. Демо не принимает платежи и не запрашивает платёжные реквизиты. Кнопки скачивания ведут в официальные App Store и Google Play.")}</p></footer></LocaleProvider></body></html>
}
