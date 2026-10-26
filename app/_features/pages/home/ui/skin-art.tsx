'use client'
import { useTranslation } from '@/shared/lib/i18n/provider'
import Image from 'next/image'
import intro from '../../../../../public/skinmarket/originals/intro.png'
import market from '../../../../../public/skinmarket/originals/market.png'
import item from '../../../../../public/skinmarket/originals/item.png'
import payment from '../../../../../public/skinmarket/originals/payment.png'
import trade from '../../../../../public/skinmarket/originals/trade.png'
import lore from '../../../../../public/skinmarket/originals/lore.png'

import connect from '../../../../../public/skinmarket/originals/connect.jpg'
import identify from '../../../../../public/skinmarket/originals/identify.jpg'
import tradelink from '../../../../../public/skinmarket/originals/tradelink.jpg'
import funding from '../../../../../public/skinmarket/originals/funding.jpg'
import international from '../../../../../public/skinmarket/originals/international.jpg'
import gaming from '../../../../../public/skinmarket/originals/gaming.jpg'
import preferences from '../../../../../public/skinmarket/originals/preferences.jpg'
import settlement from '../../../../../public/skinmarket/originals/settlement.jpg'
import fundingIntro from '../../../../../public/skinmarket/originals/fundingIntro.jpg'

// Full-resolution PNGs bypass the lossy image optimizer, including on Retina displays.
const screens = {
  connect: { src: connect, alt: 'Подключение Steam и Trade Link' },
  identify: { src: identify, alt: 'Идентификация в Wooppay' },
  tradelink: { src: tradelink, alt: 'Ввод ссылки на обмен Steam' },
  funding: { src: funding, alt: 'Пополнение кошелька Wooppay' },
  international: { src: international, alt: 'Международные переводы Wooppay' },
  gaming: { src: gaming, alt: 'Игровые сервисы Wooppay' },
  preferences: { src: preferences, alt: 'Выбор возможностей кошелька' },
  settlement: { src: settlement, alt: 'Этапы сделки и период ожидания' },
  fundingIntro: { src: fundingIntro, alt: 'Способы пополнения и вывода' },
  intro: { src: intro, alt: 'Главная SkinMarket в приложении Wooppay' },
  steam: { src: intro, alt: 'SkinMarket в приложении Wooppay' },
  market: { src: market, alt: 'Каталог скинов SkinMarket в Wooppay' },
  item: { src: item, alt: 'Карточка AK-47 Aquamarine Revenge в SkinMarket' },
  payment: { src: payment, alt: 'Оплата покупки с кошелька Wooppay' },
  trade: { src: trade, alt: 'Статус сделки и этапы передачи предмета через Steam' },
}

export function LoreKnife({ className = '' }: { className?: string }) {
  const t = useTranslation()

  return <Image className={className} src={lore} alt={t("Нож-бабочка — Легенды")} unoptimized/>
}

export function AppScreen({ screen, className = '' }: { screen: keyof typeof screens; className?: string }) {
  const t = useTranslation()

  const { src, alt } = screens[screen]
  return <Image className={className} src={src} alt={t(alt)} unoptimized/>
}
