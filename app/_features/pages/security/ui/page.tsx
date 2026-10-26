import { getTranslator } from '@/shared/lib/i18n/server'
import { OfficialHelp } from '@/widgets/official-help/ui/official-help'
import { pageMetadata } from "@/shared/lib/seo/metadata"
import { SiteNav } from "@/widgets/site-nav/ui/site-nav"
export function generateMetadata() { return pageMetadata("/security") }
export default async function Security(){
  const t = await getTranslator()
return <main className="min-h-screen"><SiteNav/><section className="mx-auto max-w-5xl px-6 py-24 lg:px-10"><p className="text-sm uppercase tracking-[.2em] text-cyan-300">{t("Безопасность")}</p><h1 className="mt-5 max-w-4xl text-5xl font-semibold sm:text-7xl">{t("Спокойствие — тоже")}<br/><span className="gradient-text">{t("часть сервиса.")}</span></h1><div className="mt-16 grid gap-5 md:grid-cols-2"><div className="rounded-3xl border border-white/10 bg-white/[.04] p-8"><h2 className="text-2xl font-semibold">{t("Прозрачные операции")}</h2><p className="mt-4 leading-7 text-slate-400">{t("Понятные статусы помогают быстро проверить результат платежа и заметить необычную активность.")}</p></div><div className="rounded-3xl border border-white/10 bg-white/[.04] p-8"><h2 className="text-2xl font-semibold">{t("Поддержка по шагам")}</h2><p className="mt-4 leading-7 text-slate-400">{t("Ответы на частые вопросы доступны в любое время, а сложные обращения можно передать специалисту.")}</p></div></div><OfficialHelp /></section></main>}
