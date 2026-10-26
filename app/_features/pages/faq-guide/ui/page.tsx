import { getTranslator } from '@/shared/lib/i18n/server'
import { OfficialHelp } from '@/widgets/official-help/ui/official-help'
import { OFFICIAL } from '@/shared/config/official-resources'
import Link from '@/shared/lib/i18n/link'
import { notFound } from 'next/navigation'
import { SiteNav } from '@/widgets/site-nav/ui/site-nav'
import { faqGuides } from '@/entities/wallet/model/content'
import { CONTENT_REVIEWED_AT, SITE_URL, STORE_LINKS } from '@/shared/config/site'
import { pageMetadata } from '@/shared/lib/seo/metadata'
import { StructuredData } from '@/shared/ui/structured-data'

export function generateStaticParams() {
  return faqGuides.map(({ slug }) => ({ slug }))
}
type Props = { params: Promise<{ slug: string }> }
export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const guide = faqGuides.find(item => item.slug === slug)
  if (!guide) notFound()
  return pageMetadata(`/faq/${guide.slug}`)
}
export default async function FaqGuide({ params }: Props) {
  const t = await getTranslator()

  const { slug } = await params
  const guide = faqGuides.find(item => item.slug === slug)
  if (!guide) notFound()
  const url = `${SITE_URL}/faq/${guide.slug}`
  return <main><SiteNav /><article className="mx-auto max-w-4xl px-6 py-20">
    <nav aria-label={t("Хлебные крошки")} className="mb-8 flex flex-wrap gap-3 text-sm text-slate-300">
      <Link href="/" className="underline">{t("Главная")}</Link><span aria-hidden="true">/</span>
      <Link href="/faq" className="underline">{t("Вопросы и ответы")}</Link><span aria-hidden="true">/</span>
      <span aria-current="page">{t(guide.question)}</span>
    </nav>
    <h1 className="text-4xl font-semibold">{t(guide.question)}</h1>
    <p className="mt-6 text-lg leading-8 text-slate-300">{t(guide.answer)}</p>
    <p className="mt-6 text-sm text-slate-400">{t("Проверено")} <time dateTime={CONTENT_REVIEWED_AT}>{t("26 октября 2026")}</time>  {t("по официальным ресурсам Wooppay.")}</p>
    <section className="mt-10"><h2 className="text-2xl font-semibold">{t("Официальные источники")}</h2>
      <ul className="mt-4 space-y-3 text-violet-200">
        <li><a href={OFFICIAL.commissions} className="underline">{t("Комиссии по сервисам")}</a></li><li><a href={OFFICIAL.documents} className="underline">{t("Действующие соглашения и правила")}</a></li><li><a href={OFFICIAL.help} className="underline">{t("Справка Wooppay")}</a></li><li><a href={STORE_LINKS.ios} className="underline">{t("Wooppay App в App Store")}</a></li>
        <li><a href={STORE_LINKS.android} className="underline">{t("Wooppay App в Google Play")}</a></li>
      </ul>
    </section>
    <OfficialHelp />
    <nav aria-label={t("Следующий шаг")} className="mt-10 flex flex-wrap gap-6 text-violet-200">
      <Link href="/download" className="underline">{t("Скачать приложение и открыть QR-коды")}</Link>
      <Link href={(guide.slug === 'tariffs' || guide.slug === 'limits') ? '/tariffs' : '/security'} className="underline">{t((guide.slug === 'tariffs' || guide.slug === 'limits') ? 'Проверка тарифов и лимитов' : 'Безопасность и поддержка')}</Link>
    </nav>
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'WebPage', '@id': `${url}#webpage`, url, name: guide.question, description: guide.answer, inLanguage: 'ru-KZ', dateModified: CONTENT_REVIEWED_AT, isPartOf: { '@id': `${SITE_URL}/#website` }, about: { '@id': `${SITE_URL}/#app` } }} />
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Вопросы и ответы', item: `${SITE_URL}/faq` },
      { '@type': 'ListItem', position: 3, name: guide.question, item: url },
    ] }} />
  </article></main>
}
