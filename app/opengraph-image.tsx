import { getTranslator } from '@/shared/lib/i18n/server'
import { ImageResponse } from 'next/og'
export const alt = 'Wooppay Wallet — всё твоё в одном кошельке'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default async function Image() {
  const t = await getTranslator()
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#f0edfa', color: '#191824', padding: 70, fontFamily: 'sans-serif' }}><div style={{ color: '#7351f5', fontSize: 21, letterSpacing: 5 }}>WOOPPAY WALLET / KAZAKHSTAN</div><div style={{ fontSize: 87, marginTop: 35, lineHeight: 1.08, letterSpacing: -4, display: 'flex', flexDirection: 'column' }}><span>{t("Всё твоё.")}</span><span style={{ color: '#7351f5' }}>{t("В одном Wooppay.")}</span></div><div style={{ fontSize: 25, color: '#777184', marginTop: 35 }}>{t("Деньги, игры и повседневные дела. В твоём ритме.")}</div></div>, size)
}
