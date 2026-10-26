'use client'

import { useRef } from 'react'
import { Apple, Play, ArrowUpRight, X } from 'lucide-react'

export function HeroStore({ platform, href, qr }: { platform: 'ios' | 'android'; href: string; qr: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const name = platform === 'ios' ? 'App Store' : 'Google Play'
  return <div className={`sk-node-store sk-node-${platform}`}>
    <a href={href} aria-haspopup="dialog" onClick={event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || window.matchMedia('(max-width: 760px), (pointer: coarse)').matches) return
      event.preventDefault()
      dialog.current?.showModal()
    }}>{platform === 'ios' ? <Apple size={23} aria-hidden="true"/> : <Play size={23} aria-hidden="true"/>}<span><small>Скачать для {platform === 'ios' ? 'iOS' : 'Android'}</small><strong>{name}</strong></span><ArrowUpRight size={16} aria-hidden="true"/></a>
    <dialog ref={dialog} className="sk-store-dialog" aria-label={`Скачать Wooppay в ${name}`} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      <button className="sk-dialog-close" onClick={() => dialog.current?.close()} aria-label="Закрыть"><X size={20}/></button>
      <p className="sk-eyebrow">WOOPPAY / {platform.toUpperCase()}</p><h2>Твой следующий ход.</h2><p>Наведи камеру телефона на QR-код</p>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={qr} alt={`QR-код приложения Wooppay в ${name}`} width={224} height={224}/>
      <a href={href}>Открыть {name} <ArrowUpRight size={16}/></a>
    </dialog>
  </div>
}
