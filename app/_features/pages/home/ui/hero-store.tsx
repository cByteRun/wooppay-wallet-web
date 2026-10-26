'use client'
import { useTranslation } from '@/shared/lib/i18n/provider'

import { useRef } from 'react'
import { Apple, Play, ArrowUpRight, X } from 'lucide-react'

export function HeroStore({ platform, href, qr }: { platform: 'ios' | 'android'; href: string; qr: string }) {
  const t = useTranslation()

  const dialog = useRef<HTMLDialogElement>(null)
  const name = platform === 'ios' ? 'App Store' : 'Google Play'
  return <div className={`sk-node-store sk-node-${platform}`}>
    <a href={href} aria-haspopup="dialog" onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia('(max-width: 760px), (pointer: coarse)').matches) return
      event.preventDefault()
      dialog.current?.showModal()
    }}>{platform === 'ios' ? <Apple size={23} aria-hidden="true"/> : <Play size={23} aria-hidden="true"/>}<span><small>{t("Скачать для")} {t(platform === 'ios' ? 'iOS' : 'Android')}</small><strong>{t(name)}</strong></span><ArrowUpRight size={16} aria-hidden="true"/></a>
    <dialog ref={dialog} className="sk-store-dialog" aria-label={t("Скачать Wooppay в {0}", { 0: name })} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      <button className="sk-dialog-close" onClick={() => dialog.current?.close()} aria-label={t("Закрыть")}><X size={20}/></button>
      <p className="sk-eyebrow">WOOPPAY / {t(platform.toUpperCase())}</p><h2>{t("Твой следующий ход.")}</h2><p>{t("Наведи камеру телефона на QR-код")}</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt={t("QR-код приложения Wooppay в {0}", { 0: name })} width={224} height={224}/>
      <a href={href}>{t("Открыть")} {t(name)} <ArrowUpRight size={16}/></a>
    </dialog>
  </div>
}
