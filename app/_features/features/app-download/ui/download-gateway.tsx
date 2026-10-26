import { getTranslator } from '@/shared/lib/i18n/server'
import QRCode from 'qrcode'
import { Apple, Play, ArrowUpRight } from 'lucide-react'
import { STORE_LINKS } from '@/shared/config/site'
import { DownloadCta } from '@/features/app-download/ui/download-cta'
import { DownloadEnhancement } from './download-enhancement'

export async function DownloadGateway({ variant = 'default' }: { variant?: 'default' | 'landing' }) {
  const t = await getTranslator()

  const stores = [{ key: 'ios', label: 'iPhone · App Store' }, { key: 'android', label: 'Android · Google Play' }] as const
  const codes = await Promise.all(stores.map(async store => ({ ...store, image: await QRCode.toDataURL(STORE_LINKS[store.key], { width: 208, margin: 4, errorCorrectionLevel: 'M' }) })))
  if (variant === 'landing') return <section aria-label={t("Скачать Wooppay")} className="sk-install"><DownloadEnhancement><div className="sk-install-grid">{codes.map(store => <article className="sk-install-card" key={store.key}>
    <a className="sk-install-button" href={STORE_LINKS[store.key]} data-store={store.key} data-placement="cta">{store.key === 'ios' ? <Apple size={24} aria-hidden="true"/> : <Play size={24} aria-hidden="true"/>}<span><small>{t("Скачать в")}</small>{t(store.key === 'ios' ? 'App Store' : 'Google Play')}</span><ArrowUpRight size={18} aria-hidden="true"/></a>
    <figure className="sk-install-qr">
      <a href={STORE_LINKS[store.key]} data-store={store.key} data-placement="qr" aria-label={t("Скачать Wooppay: {0}", { 0: store.label })}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={store.image} width={208} height={208} alt={t("QR-код Wooppay: {0}", { 0: store.label })}/>
      </a><figcaption>{t(store.key === 'ios' ? 'Для iPhone' : 'Для Android')}<span>{t("Наведите камеру телефона")}</span></figcaption>
    </figure>
  </article>)}</div></DownloadEnhancement></section>
  return <section aria-label={t("Установка приложения")}><DownloadCta /><DownloadEnhancement><div className="download-qr mt-12 gap-6 justify-center">
    {codes.map(store => <figure key={store.key} className="rounded-3xl border border-white/15 bg-white/5 p-6 text-center"><a href={STORE_LINKS[store.key]} data-store={store.key} data-placement="qr" aria-label={t("Открыть Wooppay в {0}", { 0: store.label })}>
      {/* Inline, server-generated QR: no external service or client QR library. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={store.image} width={208} height={208} alt={t("QR-код для скачивания Wooppay: {0}", { 0: store.label })} className="mx-auto rounded-xl" />
    </a><figcaption className="mt-4 font-semibold">{t(store.label)}</figcaption><p className="mt-2 text-sm text-slate-400">{t("Наведите камеру телефона")}</p></figure>)}
  </div></DownloadEnhancement></section>
}
