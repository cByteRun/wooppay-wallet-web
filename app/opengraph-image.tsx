import { ImageResponse } from 'next/og'
export const alt = 'Wooppay Skinmarket — скины CS2 и кошелёк в одном приложении'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#090d0f', color: '#f0f3ef', padding: 80, fontFamily: 'sans-serif', position: 'relative' }}><div style={{ color: '#4cf9d5', fontSize: 25, letterSpacing: 5 }}>WOOPPAY / SKINMARKET CS2</div><div style={{ fontSize: 82, marginTop: 38, lineHeight: 1.05, letterSpacing: -4, display: 'flex', flexDirection: 'column' }}><span>Твой следующий скин.</span><span style={{ color: '#4cf9d5' }}>Уже в твоём кошельке.</span></div><div style={{ fontSize: 23, color: '#899794', marginTop: 44 }}>SKINS. WALLET. ONE APP.   /   iOS & Android</div></div>, size)
}
