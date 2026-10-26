import QRCode from 'qrcode'
import { Check, Link2 } from 'lucide-react'
import { STORE_LINKS } from '@/shared/config/site'
import { HeroStore } from './hero-store'
import './profit-conveyor.css'

function Knife({ dotted = false }: { dotted?: boolean }) {
  return <g fill="none" stroke={dotted ? '#738ba6' : '#9cacc5'} strokeWidth={dotted ? 3 : 2} strokeLinecap="round" strokeLinejoin="round" strokeDasharray={dotted ? '0 6' : undefined}><path d="M-64 24 -10 -22 62 -32 29 3 -18 10Z"/><path d="m-18 10 -35 40 -16 -3 36 -44M-18 10 5 48 -7 55 -35 15"/><path d="m-10 -22 -8 32 47 -7"/></g>
}

export async function ProfitConveyor() {
  const codes = await Promise.all((['ios', 'android'] as const).map(async platform => ({ platform, href: STORE_LINKS[platform], qr: `data:image/svg+xml,${encodeURIComponent(await QRCode.toString(STORE_LINKS[platform], { type: 'svg', margin: 4, errorCorrectionLevel: 'M' }))}` })))
  return <div className="sk-conveyor">
    <div className="sk-conveyor-caption"><span>SKIN → CASH</span><span><i/> WOOPPAY SYSTEM</span></div>
    <div className="sk-steam-status" aria-label="Пример подключения аккаунта">
      <span><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="16" cy="8" r="5"/><circle cx="16" cy="8" r="2.5"/><circle cx="6" cy="17" r="3"/><path d="m8 15 5-4M9 18l8-5M3 16l-3-2"/></svg><span><strong>Steam</strong><small>Аккаунт подключён</small></span><Check size={14}/></span>
      <span><Link2 size={20} aria-hidden="true"/><span><strong>TradeLink</strong><small>Ссылка привязана</small></span><Check size={14}/></span>
    </div>
    <svg className="sk-conveyor-svg" viewBox="0 0 600 740" role="img" aria-labelledby="sk-conveyor-title sk-conveyor-desc">
      <title id="sk-conveyor-title">Из скина — в реальные тенге</title><desc id="sk-conveyor-desc">Скин через Steam поступает в SkinMarket. Комиссия продавца 0%. После завершения сделки деньги поступают в кошелёк Wooppay. 45 000 тенге — пример суммы.</desc>
      <defs>
        <linearGradient id="sk-phone-fill" x2="1" y2="1"><stop stopColor="#303a50"/><stop offset="1" stopColor="#141b2b"/></linearGradient>
        <linearGradient id="sk-cash-fill"><stop stopColor="#00ff87"/><stop offset="1" stopColor="#00f2fe"/></linearGradient>
        <pattern id="sk-grid-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".8" fill="#597392"/></pattern>
        <linearGradient id="sk-screen-fill" x2="0" y2="1"><stop stopColor="#242d42"/><stop offset="1" stopColor="#191f30"/></linearGradient>
      </defs>
      <path d="M300 144 595 326 300 730 5 548Z" fill="#1a2233" fillOpacity=".25" stroke="#34445b" strokeOpacity=".4" strokeWidth=".7"/>
      <g transform="matrix(.74,.45,-.74,.55,300,145)" opacity=".08"><rect width="400" height="590" fill="url(#sk-grid-dots)"/></g>
      <g fill="none" stroke="#445a76"><path d="m300 144 0 586M5 548l590 -222M82 595l436 -312M153 640l294 -400" opacity=".35"/><path d="M300 151V210M189 395H94V439M411 395H506V439M300 586v68h137" strokeWidth="1.5"/><path className="sk-conveyor-pulse" d="M300 152V210M300 586v68h137" stroke="#00f2fe" strokeWidth="2" strokeDasharray="3 10"/></g>
      <g transform="translate(300 100)"><ellipse cy="10" rx="100" ry="46" fill="#1b2537" stroke="#40536e" strokeDasharray="2 6"/><Knife dotted/><text y="83" fill="#91a1b9" fontSize="10" textAnchor="middle" letterSpacing="3">01 / STEAM INVENTORY</text></g>
      <g>
        <rect x="201" y="213" width="206" height="377" rx="31" fill="#0c1220" stroke="#52647e"/>
        <rect x="193" y="207" width="206" height="377" rx="31" fill="url(#sk-phone-fill)" stroke="#74839b"/>
        <rect x="201" y="215" width="190" height="361" rx="24" fill="url(#sk-screen-fill)" stroke="#3d4a61"/>
        <rect x="264" y="222" width="64" height="15" rx="8" fill="#101625"/>
        <text x="218" y="257" fill="#e9efff" fontSize="10" fontWeight="700">wooppay</text><circle cx="371" cy="253" r="3" fill="#00ff87"/>
        <path d="M218 272h156" stroke="#3b455b"/>
        <text x="218" y="297" fill="#f0f4ff" fontSize="21" fontWeight="700">SkinMarket</text><text x="218" y="317" fill="#8d9bb2" fontSize="9">ТВОЙ ИНВЕНТАРЬ. ТВОИ ПРАВИЛА.</text>
        <rect x="216" y="334" width="160" height="111" rx="10" fill="#29364c" stroke="#43546e"/>
        <g transform="translate(297 387) scale(.85)"><Knife/></g>
        <text x="228" y="433" fill="#a7b6cd" fontSize="9">★ Butterfly Knife</text>
        <text x="218" y="468" fill="#8e9db5" fontSize="9">ТВОЯ ЦЕНА</text><text x="218" y="495" fill="#f1f5ff" fontSize="24" fontWeight="700">45 000 ₸</text>
        <rect x="216" y="513" width="160" height="34" rx="6" fill="#34465b"/><text x="296" y="534" fill="#d5e5f7" fontSize="10" textAnchor="middle">Сделка завершена ✓</text>
        <rect x="270" y="562" width="53" height="3" rx="2" fill="#65718a"/>
      </g>
      <g><path d="M398 307h70l12 12v65h-82Z" fill="#1c3440" stroke="#00ff87"/><path d="M398 307v77" stroke="#00ff87" strokeWidth="3"/><text x="414" y="342" fill="#00ff87" fontSize="31" fontWeight="700">0%</text><text x="414" y="360" fill="#a0c7c3" fontSize="8">КОМИССИЯ</text><text x="414" y="372" fill="#a0c7c3" fontSize="8">ПРОДАВЦА</text></g>
      <path d="M296 584v21" stroke="#00ff87" strokeWidth="2"/>
      <g><rect x="169" y="605" width="254" height="73" rx="10" fill="url(#sk-cash-fill)"/><text x="190" y="626" fill="#12504d" fontSize="10" letterSpacing=".3">ПРИМЕР СДЕЛКИ · WOOPPAY</text><text x="190" y="660" fill="#082d36" fontSize="31" fontWeight="700">+45 000 ₸</text><circle cx="396" cy="645" r="11" fill="#093b3b"/><path d="m391 645 4 4 7 -8" stroke="#00ffb0" fill="none" strokeWidth="2"/></g>
      <g fill="#00f2fe"><circle cx="94" cy="439" r="3"/><circle cx="506" cy="439" r="3"/><circle cx="437" cy="654" r="3"/></g>
    </svg>
    <div className="sk-conveyor-stores">{codes.map(store => <HeroStore key={store.platform} {...store}/>)}</div>
    <p className="sk-conveyor-note">Схема сделки · интерфейс схематичный · сумма — пример</p>
  </div>
}
