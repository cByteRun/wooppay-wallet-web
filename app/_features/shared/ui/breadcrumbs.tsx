import Link from 'next/link'
import { SITE_URL } from '@/shared/config/site'
import { StructuredData } from './structured-data'
export function Breadcrumbs({ title, path }: { title: string; path: string }) {
  return <><nav aria-label="Хлебные крошки" className="mb-8 text-sm text-slate-400"><Link href="/" className="underline">Главная</Link><span aria-hidden="true"> / </span><span aria-current="page">{title}</span></nav><StructuredData data={{ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Главная', item: SITE_URL }, { '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}${path}` }] }} /></>
}
