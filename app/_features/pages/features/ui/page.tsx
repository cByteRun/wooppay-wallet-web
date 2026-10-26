import { getTranslator } from '@/shared/lib/i18n/server'
import Link from '@/shared/lib/i18n/link'
import { SiteNav } from '@/widgets/site-nav/ui/site-nav'
import { pageMetadata } from '@/shared/lib/seo/metadata'
export function generateMetadata() { return pageMetadata('/features') }
export default async function Features() {
  const t = await getTranslator()

  return <main><SiteNav /><section className="mx-auto max-w-7xl px-6 py-24"><h1 className="text-4xl font-semibold sm:text-6xl">{t("Возможности Wooppay Wallet")}</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">{t("Wooppay объединяет платежи, пополнения и цифровые сервисы. Выберите раздел, чтобы узнать о возможностях и проверке условий.")}</p><div className="mt-12 grid gap-5 md:grid-cols-3">{[['/payments','Оплата услуг','Мобильная связь, интернет и другие услуги.'],['/transfers','Международные пополнения','Зарубежные карты и электронные кошельки.'],['/skinmarket','SkinMarket CS2','Покупка, продажа и обмен игровых предметов.']].map(([href,title,text]) => <article key={href} className="rounded-3xl border border-white/10 bg-white/5 p-7"><h2 className="text-2xl font-semibold"><Link href={href} className="text-violet-200 underline">{t(title)}</Link></h2><p className="mt-4 leading-7 text-slate-300">{t(text)}</p></article>)}</div><Link href="/tariffs" className="mt-10 inline-block text-violet-200 underline">{t("Где проверить тарифы и лимиты")}</Link></section></main>
}
