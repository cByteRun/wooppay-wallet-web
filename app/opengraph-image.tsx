import { ImageResponse } from 'next/og'
export const alt = 'Wooppay Wallet — приложение для iOS и Android'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#08091b', color: 'white', padding: 80, fontFamily: 'sans-serif' }}><div style={{ color: '#b99cff', fontSize: 32 }}>WOOPPAY WALLET</div><div style={{ fontSize: 76, marginTop: 32 }}>Payments. Top-ups.</div><div style={{ fontSize: 38, color: '#a9aec6', marginTop: 32 }}>App Store · Google Play</div></div>, size)
}
