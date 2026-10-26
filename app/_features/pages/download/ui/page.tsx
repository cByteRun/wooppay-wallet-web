import { getTranslator } from '@/shared/lib/i18n/server'
import { SiteNav } from '@/widgets/site-nav/ui/site-nav'
import { DownloadGateway } from '@/features/app-download/ui/download-gateway'
import { pageMetadata } from '@/shared/lib/seo/metadata'
export function generateMetadata() { return pageMetadata('/download') }
export default async function Download() {
  const t = await getTranslator()

  return <main className="min-h-screen"><SiteNav /><section className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10"><p className="text-sm uppercase tracking-[.2em] text-violet-300">Wooppay Wallet</p><h1 className="mt-5 text-4xl font-semibold sm:text-6xl">{t("Скачать Wooppay Wallet")}</h1><p className="mx-auto mb-9 mt-6 max-w-xl text-lg leading-8 text-slate-300">{t("Приложение Wooppay доступно для iPhone и Android. Выберите магазин приложений или отсканируйте его QR-код с компьютера.")}</p><DownloadGateway /><p className="mt-10 text-sm text-slate-400">{t("Установку завершает магазин приложений. Системные требования и доступность в вашем регионе указаны в карточке Wooppay.")}</p></section></main>
}
