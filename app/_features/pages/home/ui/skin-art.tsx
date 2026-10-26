import Image from 'next/image'
import intro from '../../../../../public/skinmarket/originals/intro.png'
import market from '../../../../../public/skinmarket/originals/market.png'
import item from '../../../../../public/skinmarket/originals/item.png'
import payment from '../../../../../public/skinmarket/originals/payment.png'
import trade from '../../../../../public/skinmarket/originals/trade.png'
import lore from '../../../../../public/skinmarket/originals/lore.png'

// Full-resolution PNGs bypass the lossy image optimizer, including on Retina displays.
const screens = {
  intro: { src: intro, alt: 'Главная SkinMarket в приложении Wooppay' },
  steam: { src: intro, alt: 'SkinMarket в приложении Wooppay' },
  market: { src: market, alt: 'Каталог скинов SkinMarket в Wooppay' },
  item: { src: item, alt: 'Карточка AK-47 Aquamarine Revenge в SkinMarket' },
  payment: { src: payment, alt: 'Оплата покупки с кошелька Wooppay' },
  trade: { src: trade, alt: 'Статус сделки и этапы передачи предмета через Steam' },
}

export function LoreKnife({ className = '' }: { className?: string }) {
  return <Image className={className} src={lore} alt="Нож-бабочка — Легенды" unoptimized/>
}

export function AppScreen({ screen, className = '' }: { screen: keyof typeof screens; className?: string }) {
  const { src, alt } = screens[screen]
  return <Image className={className} src={src} alt={alt} unoptimized/>
}
