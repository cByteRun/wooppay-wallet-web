import { ImageResponse } from 'next/og'
export const alt = 'SkinMarket × Wooppay — скины CS2 без комиссии продавца'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#10120f', color: '#f3f3eb', padding: 70, fontFamily: 'sans-serif', position: 'relative' }}><div style={{ color: '#baa7ef', fontSize: 21, letterSpacing: 5 }}>SKINMARKET × WOOPPAY / KAZAKHSTAN</div><div style={{ fontSize: 76, marginTop: 35, lineHeight: 1.08, letterSpacing: -3, display: 'flex', flexDirection: 'column' }}><span>Твои скины. Твои тенге.</span><span style={{ color: '#d1ff82' }}>Без комиссии продавца.</span></div><div style={{ fontSize: 23, color: '#aeb4a5', marginTop: 35 }}>P2P-маркет CS2 в приложении Wooppay. Комиссия продавца — 0%.</div></div>, size)
}
