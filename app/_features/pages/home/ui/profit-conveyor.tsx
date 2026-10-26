import Image from 'next/image'
import { LoreKnife } from './skin-art'
import { MatrixScene } from './skin-motion'
import QRCode from 'qrcode'
import { Check, Link2 } from 'lucide-react'
import { STORE_LINKS } from '@/shared/config/site'
import { HeroStore } from './hero-store'
import './profit-conveyor.css'

export async function ProfitConveyor() {
  const codes = await Promise.all((['ios', 'android'] as const).map(async platform => ({ platform, href: STORE_LINKS[platform], qr: `data:image/svg+xml,${encodeURIComponent(await QRCode.toString(STORE_LINKS[platform], { type: 'svg', margin: 4, errorCorrectionLevel: 'M' }))}` })))
  return <div className="sk-conveyor">
    <div className="sk-conveyor-caption"><span>SKIN → CASH</span><span><i/> WOOPPAY SYSTEM</span></div>
    <div className="sk-steam-status" aria-label="Пример подключения аккаунта">
      <span><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="16" cy="8" r="5"/><circle cx="16" cy="8" r="2.5"/><circle cx="6" cy="17" r="3"/><path d="m8 15 5-4M9 18l8-5M3 16l-3-2"/></svg><span><strong>Steam</strong><small>Аккаунт подключён</small></span><Check size={14}/></span>
      <span><Link2 size={20} aria-hidden="true"/><span><strong>TradeLink</strong><small>Ссылка привязана</small></span><Check size={14}/></span>
    </div>
    <div className="sk-trade-stage">
      <div className="sk-trade-matrix"><MatrixScene/><span>КОМИССИЯ ПРОДАВЦА</span><noscript><strong>0%</strong></noscript></div>
      <div className="sk-trade-orbit" aria-hidden="true"/>
      <div className="sk-glass-stack">
        <div className="sk-glass-echo" aria-hidden="true"/>
        <article className="sk-glass-item" aria-label="Пример предмета в инвентаре Steam">
          <div className="sk-item-head"><span>STEAM / CS2</span><span>★ COVERT</span></div>
          <svg viewBox="-135 -90 270 195" role="img" aria-label="Иллюстрация ножа-бабочки Легенды"><LoreKnife/></svg>
          <small>★ Нож-бабочка</small><h3>Легенды</h3>
          <div className="sk-item-price">455 500 <span>₸</span><span>ПРИМЕР ЦЕНЫ</span></div>
          <div className="sk-wear"><i/></div><div className="sk-item-float"><span>FLOAT / FT</span><span>0.184729</span></div>
        </article>
        <span className="sk-sale-route">ПРОДАЖА СКИНА <span>↗</span></span>
      </div>
      <div className="sk-real-phone"><div className="sk-phone-speaker"/><Image src="/skinmarket/hero-tiger-tooth.png" alt="Карточка Survival Knife Tiger Tooth в приложении Wooppay: цена, характеристики и покупка" width={576} height={1280} priority sizes="(max-width: 760px) 180px, 230px"/></div>
      <div className="sk-trade-success"><span className="sk-success-check"><Check size={19}/></span><div><small>СДЕЛКА ЗАВЕРШЕНА</small><strong>+45 000 <span>₸</span></strong><p>В кошельке Wooppay</p></div><span className="sk-success-spark">↗</span></div>
      <p className="sk-trade-example">Иллюстрация сделки · сумма — пример</p>
    </div>
    <div className="sk-conveyor-stores">{codes.map(store => <HeroStore key={store.platform} {...store}/>)}</div>
    <p className="sk-conveyor-note">Покупай и продавай · комиссия продавца 0%</p>
  </div>
}
