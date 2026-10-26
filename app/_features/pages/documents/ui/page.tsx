import { getTranslator } from '@/shared/lib/i18n/server'
import Link from 'next/link'
import { SiteNav } from '@/widgets/site-nav/ui/site-nav'
import { OfficialHelp } from '@/widgets/official-help/ui/official-help'
import { OFFICIAL } from '@/shared/config/official-resources'
import { CONTENT_REVIEWED_AT } from '@/shared/config/site'
import { pageMetadata } from '@/shared/lib/seo/metadata'
import { Breadcrumbs } from '@/shared/ui/breadcrumbs'

export function generateMetadata() { return pageMetadata('/documents') }
export default async function Documents() {
  const t = await getTranslator()

  return <main><SiteNav /><article className="mx-auto max-w-4xl px-6 py-20">
    <Breadcrumbs title={t("Документы и оператор")} path="/documents" />
    <h1 className="text-4xl font-semibold">{t("Документы и оператор Wooppay")}</h1>
    <section className="mt-10 space-y-4 leading-8 text-slate-300">
      <h2 className="text-2xl font-semibold text-white">{t("Сведения для пользователей и партнёров")}</h2>
      <p>{t("Оператор системы — ТОО «WOOPPAY (ВУППЭЙ)». Система Wooppay указана в")} <a className="underline" href={OFFICIAL.registry}>{t("реестре систем электронных денег Национального Банка Казахстана")}</a>  {t("по состоянию на 13 мая 2026 года.")}</p>
      <p>{t("Запись в реестре позволяет проверить систему и оператора. Это не банковская лицензия и не гарантия результата отдельной операции. Информацию о компании можно найти на")} <a className="underline" href={OFFICIAL.company}>{t("корпоративном сайте")}</a>{t(", о подключении приёма платежей — на")} <a className="underline" href={OFFICIAL.business}>Woopkassa</a>.</p>
    </section>
    <section className="mt-10 space-y-4 leading-8 text-slate-300">
      <h2 className="text-2xl font-semibold text-white">{t("Соглашения, оплата и покупки")}</h2>
      <p><a className="underline" href={OFFICIAL.documents}>{t("Открыть действующие документы Wooppay")}</a>{t(". Выбирайте раздел основных документов: архивные редакции перечислены отдельно. Проверяйте дату вступления условий в силу перед использованием сервиса.")}</p>
      <p>{t("Для платежей и кошелька выбирайте соответствующее клиентское соглашение и правила системы. Для сделок с игровыми предметами — правила SkinMarket. В том же каталоге размещены документы об обработке персональных данных.")}</p>
      <p><a className="underline" href={OFFICIAL.commissions}>{t("Комиссии по услугам")}</a>  {t("опубликованы отдельно. Перед подтверждением проверьте поставщика, реквизиты, итоговую сумму и условия в приложении. Вопрос об ошибочном платеже, отмене или возврате передайте поддержке с данными операции.")}</p>
    </section>
    <p className="mt-8 text-sm text-slate-400">{t("Источники проверены")} <time dateTime={CONTENT_REVIEWED_AT}>{t("26 октября 2026")}</time>{t(". Эта справка помогает найти документы и не заменяет договор с оператором.")}</p>
    <OfficialHelp />
    <nav aria-label={t("Связанные разделы")} className="mt-10 flex flex-wrap gap-6 text-violet-200 underline"><Link href="/tariffs">{t("Тарифы и комиссии")}</Link><Link href="/faq/limits">{t("Лимиты кошелька")}</Link><Link href="/skinmarket">SkinMarket</Link></nav>
  </article></main>
}
