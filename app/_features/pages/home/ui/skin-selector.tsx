'use client'

import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import Image from 'next/image'
import lore from '../../../../../public/skinmarket/originals/lore.png'
import tigerTooth from '../../../../../public/skinmarket/originals/tiger-tooth.png'
import aquamarine from '../../../../../public/skinmarket/originals/aquamarine.png'

const skins = [
  { name: 'Легенды', type: 'НОЖ-БАБОЧКА', finish: 'Lore', price: '473 166', image: lore },
  { name: 'Зуб тигра', type: 'НОЖ ВЫЖИВАНИЯ', finish: 'Tiger Tooth', price: '60 000', image: tigerTooth },
  { name: 'Аквамариновая месть', type: 'AK-47', finish: 'Aquamarine Revenge', price: '152 472', image: aquamarine },
] as const

export function SkinSelector() {
  const [selected, setSelected] = useState(0)
  const skin = skins[selected]
  return <div className="sk-collection">
    <div className="sk-collection-top"><span>ВЫБЕРИ СВОЙ СКИН</span><span>0{selected + 1} / 03</span></div>
    <div className="sk-collection-feature">
      <span className="sk-collection-rarity">{skin.type}</span>
      <div className="sk-feature-art"><Image src={skin.image} alt={`${skin.type} — ${skin.name}`} unoptimized loading="eager" fetchPriority={selected === 0 ? 'high' : 'auto'}/></div>
      <div className="sk-collection-name" aria-live="polite"><div><small>{skin.type} / {skin.finish.toUpperCase()}</small><h3>{skin.name}</h3></div><span>CS2</span></div>
    </div>
    <div className="sk-collection-options" role="group" aria-label="Выбор предмета">
      {skins.map((item, index) => <button key={item.finish} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span className="sk-option-art"><Image src={item.image} alt="" unoptimized/>{selected === index && <Check size={13}/>}</span><span>{item.finish}</span></button>)}
    </div>
    <div className="sk-collection-total"><div><small>ПРИМЕР ЦЕНЫ</small><strong aria-live="polite">{skin.price} <span>₸</span></strong></div><a href="#download" aria-label={`Открыть SkinMarket в приложении Wooppay`}>В SkinMarket <ArrowUpRight size={18}/></a></div>
    <p className="sk-collection-note">Иллюстрации скинов · актуальные предложения в приложении</p>
  </div>
}
