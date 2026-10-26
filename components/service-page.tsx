import Link from 'next/link'
import { SiteNav } from './site-nav'
import { DownloadCta } from './download-cta'
import { serviceContent } from '@/entities/wallet/model/content'
import { STORE_LINKS, CONTENT_REVIEWED_AT } from '@/shared/config/site'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'

export function ServicePage({ service }: { service: keyof typeof serviceContent }) {
  const content = serviceContent[service]
  return <main><SiteNav /><article className="mx-auto max-w-4xl px-6 py-16"><Breadcrumbs title={content.title} path={`/${service}`} /><h1 className="text-4xl font-semibold sm:text-6xl">{content.title}</h1><p className="mt-8 text-lg leading-8 text-slate-200">{content.answer}</p><section className="mt-12 rounded-3xl border border-white/15 bg-white/5 p-7"><h2 className="text-2xl font-semibold">{content.heading}</h2><ol className="mt-6 list-decimal space-y-4 pl-5 text-slate-300">{content.steps.map(step => <li key={step}>{step}</li>)}</ol></section><p className="mt-8 leading-7 text-slate-300">{content.note}</p><p className="mt-8 text-sm leading-7 text-slate-400">Проверено <time dateTime={CONTENT_REVIEWED_AT}>26 октября 2026</time>. Источники описания функций: <a href={STORE_LINKS.ios} className="underline">Wooppay в App Store</a>, <a href={STORE_LINKS.android} className="underline">Google Play</a>. Условия конкретной операции проверяйте в приложении.</p><div className="mt-10"><DownloadCta /></div><nav aria-label="Дополнительная информация" className="mt-10 flex flex-wrap gap-6 text-violet-200"><Link href="/tariffs">Тарифы и лимиты</Link><Link href="/faq">Вопросы и ответы</Link><Link href="/download">Скачать и показать QR-коды</Link></nav></article></main>
}
