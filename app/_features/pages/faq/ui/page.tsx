import { getTranslator } from '@/shared/lib/i18n/server'
import Link from 'next/link'
import { SiteNav } from '@/widgets/site-nav/ui/site-nav'
import { faqItems } from '@/entities/wallet/model/content'
import { pageMetadata } from '@/shared/lib/seo/metadata'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'
export function generateMetadata() { return pageMetadata('/faq') }
export default async function FAQ() {
  const t = await getTranslator()

  return <main><SiteNav /><section className="mx-auto max-w-4xl px-6 py-20"><Breadcrumbs title={t("Вопросы и ответы")} path="/faq" /><h1 className="text-4xl font-semibold sm:text-6xl">{t("Вопросы и ответы о Wooppay")}</h1><p className="mt-6 text-lg leading-8 text-slate-300">{t("Приложение, установка, условия операций и официальные каналы поддержки.")}</p><div className="mt-12 space-y-5">{faqItems.map(item => <section key={item.question} className="rounded-2xl border border-white/10 bg-white/5 p-6"><h2 className="text-xl font-semibold">{'slug' in item ? <Link href={`/faq/${item.slug}`} className="underline">{t(item.question)}</Link> : t(item.question)}</h2>{!('slug' in item) && <p className="mt-4 leading-7 text-slate-300">{t(item.answer)}</p>}</section>)}</div><Link href="/download" className="mt-10 inline-block text-violet-200 underline">{t("Скачать Wooppay или показать QR-коды")}</Link></section></main>
}
