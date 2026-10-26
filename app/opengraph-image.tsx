import { ImageResponse } from 'next/og'
export const alt = 'Wooppay Wallet — твои скины, твои деньги, один кошелёк'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export default function Image() {
  return new ImageResponse(<div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#101014', color: '#f4f2ed', padding: 70, fontFamily: 'sans-serif', position: 'relative' }}><div style={{ color: '#d8ff75', fontSize: 21, letterSpacing: 5 }}>WOOPPAY WALLET / SKINMARKET CS2</div><div style={{ fontSize: 83, marginTop: 32, lineHeight: 1.05, letterSpacing: -4, display: 'flex', flexDirection: 'column' }}><span>Твои скины. Твои деньги.</span><span style={{ color: '#b8a1ff' }}>Один кошелёк.</span></div><div style={{ fontSize: 22, color: '#aaa6b5', marginTop: 40 }}>Скины CS2, платежи и пополнения в одном приложении.</div></div>, size)
}
