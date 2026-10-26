import { getTranslator } from '@/shared/lib/i18n/server'
import Link from 'next/link'
import { SITE_URL } from '@/shared/config/site'
import { StructuredData } from './structured-data'
export async function Breadcrumbs({ title, path }: { title: string; path: string }) {
  const t = await getTranslator()

  return <><nav aria-label={t("Хлебные крошки")} className="mb-8 text-sm text-slate-400"><Link href="/" className="underline">{t("Главная")}</Link><span aria-hidden="true"> / </span><span aria-current="page">{t(title)}</span></nav><StructuredData data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}${path}` }] }} /></>
}
