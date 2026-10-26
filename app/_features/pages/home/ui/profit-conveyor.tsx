import { getTranslator } from '@/shared/lib/i18n/server'
import { MatrixScene } from './skin-motion'
import QRCode from 'qrcode'
import { STORE_LINKS } from '@/shared/config/site'
import { HeroStore } from './hero-store'
import { SkinSelector } from './skin-selector'
import './profit-conveyor.css'

export async function ProfitConveyor() {
  const t = await getTranslator()

  const codes = await Promise.all((['ios', 'android'] as const).map(async platform => ({ platform, href: STORE_LINKS[platform], qr: `data:image/svg+xml,${encodeURIComponent(await QRCode.toString(STORE_LINKS[platform], { type: 'svg', margin: 4, errorCorrectionLevel: 'M' }))}` })))
  return <div className="sk-conveyor">
    <div className="sk-collection-matrix"><MatrixScene/><span>{t("КОМИССИЯ ПРОДАВЦА — 0%")}</span><noscript><strong>0%</strong></noscript></div>
    <SkinSelector/>
    <div className="sk-conveyor-stores">{codes.map(store => <HeroStore key={store.platform} {...store}/>)}</div>
  </div>
}
