import { getTranslator } from '@/shared/lib/i18n/server'
import { OFFICIAL } from '@/shared/config/official-resources'
import { OfficialHelp } from '@/widgets/official-help/ui/official-help'
import Link from '@/shared/lib/i18n/link'
import { SiteNav } from '@/widgets/site-nav/ui/site-nav'
import { DownloadCta } from '@/features/app-download/ui/download-cta'
import { serviceContent } from '@/entities/wallet/model/content'
import { STORE_LINKS, CONTENT_REVIEWED_AT } from '@/shared/config/site'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'

export async function ServicePage({ service }: { service: keyof typeof serviceContent }) {
  const t = await getTranslator()

  const content = serviceContent[service]
  return <main><SiteNav /><article className="mx-auto max-w-4xl px-6 py-16"><Breadcrumbs title={t(content.title)} path={`/${service}`} /><h1 className="text-4xl font-semibold sm:text-6xl">{t(content.title)}</h1><p className="mt-8 text-lg leading-8 text-slate-200">{t(content.answer)}</p><section className="mt-12 rounded-3xl border border-white/15 bg-white/5 p-7"><h2 className="text-2xl font-semibold">{t(content.heading)}</h2><ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-300">{content.steps.map(step => <li key={step}>{t(step)}</li>)}</ol></section><p className="mt-8 leading-7 text-slate-300">{t(content.note)}</p><p className="mt-8 text-sm leading-7 text-slate-400">{t("Проверено")} <time dateTime={CONTENT_REVIEWED_AT}>{t("26 октября 2026")}</time>{t(". Источники описания функций:")} <a href={STORE_LINKS.ios} className="underline">{t("Wooppay в App Store")}</a>, <a href={STORE_LINKS.android} className="underline">Google Play</a>{t(". Условия конкретной операции проверяйте в приложении.")}</p><section className="mt-8"><h2 className="text-2xl font-semibold">{t("Условия и документы")}</h2><p className="mt-4 leading-7 text-slate-300"><a href={OFFICIAL.commissions} className="underline">{t("Официальный список комиссий")}</a> · <a href={OFFICIAL.documents} className="underline">{t("Действующие соглашения и правила")}</a> · <Link href="/documents" className="underline">{t("Оператор и документы")}</Link></p></section>{service === 'skinmarket' ? <p className="mt-8"><a href={OFFICIAL.skinmarketTelegram} className="underline" target="_blank" rel="noopener noreferrer">{t('Telegram: Wooppay SkinMarket')} ↗</a></p> : null}<OfficialHelp /><div className="mt-10"><DownloadCta /></div><nav aria-label={t("Дополнительная информация")} className="mt-10 flex flex-wrap gap-6 text-violet-200"><Link href="/tariffs">{t("Тарифы и лимиты")}</Link><Link href="/faq">{t("Вопросы и ответы")}</Link><Link href="/download">{t("Скачать и показать QR-коды")}</Link></nav></article></main>
}
