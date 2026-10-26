'use client'

import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import { LoreKnife } from './skin-art'

const skins = [
  { name: 'Легенды', finish: 'Lore', price: '455 500', color: '#e8c879', tone: 'lore' },
  { name: 'Волны', finish: 'Doppler', price: '512 000', color: '#bb9aff', tone: 'doppler' },
  { name: 'Градиент', finish: 'Fade', price: '487 000', color: '#f49cba', tone: 'fade' },
] as const

export function SkinSelector() {
  const [selected, setSelected] = useState(0)
  const skin = skins[selected]
  return <div className="sk-collection">
    <div className="sk-collection-top"><span>ВЫБЕРИ СВОЙ СКИН</span><span>0{selected + 1} / 03</span></div>
    <div className={`sk-collection-feature sk-finish-${skin.tone}`}>
      <span className="sk-collection-rarity">★ НОЖ-БАБОЧКА</span>
      <svg viewBox="-140 -100 280 210" role="img" aria-label={`Нож-бабочка — ${skin.name}, стилизованная иллюстрация`}><LoreKnife/></svg>
      <div className="sk-collection-name" aria-live="polite"><div><small>BUTTERFLY KNIFE / {skin.finish.toUpperCase()}</small><h3>{skin.name}</h3></div><span>CS2</span></div>
    </div>
    <div className="sk-collection-options" role="group" aria-label="Выбор оформления ножа">
      {skins.map((item, index) => <button key={item.finish} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)} className={`sk-finish-${item.tone}`}><span className="sk-option-art"><svg viewBox="-140 -100 280 210" aria-hidden="true"><LoreKnife/></svg>{selected === index && <Check size={13}/>}</span><span>{item.finish}</span></button>)}
    </div>
    <div className="sk-collection-total"><div><small>ПРИМЕР ЦЕНЫ</small><strong aria-live="polite">{skin.price} <span>₸</span></strong></div><a href="#download" aria-label={`Открыть SkinMarket в приложении Wooppay`}>В SkinMarket <ArrowUpRight size={18}/></a></div>
    <p className="sk-collection-note">Иллюстрации скинов · актуальные предложения в приложении</p>
  </div>
}
