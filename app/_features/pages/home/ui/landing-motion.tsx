'use client'
import { useTranslation } from '@/shared/lib/i18n/provider'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Check } from 'lucide-react'

export { WalletUniverse } from './wallet-universe'

const buy = [
  { title: 'Найди свой скин', text: 'Открой Skinmarket в Wooppay. Подключи Steam, добавь Trade Link и выбери предмет в маркете.', image: 'market', alt: 'Каталог Skinmarket в приложении Wooppay' },
  { title: 'Оплати из кошелька', text: 'Проверь состояние, характеристики и стоимость скина. Перед оплатой посмотри итоговую сумму и условия сделки.', image: 'payment', alt: 'Оплата скина с баланса Wooppay' },
  { title: 'Прими обмен в Steam', text: 'Дождись предложения продавца, проверь предмет и прими обмен. Следи за этапами сделки прямо в приложении.', image: 'trade', alt: 'Этапы сделки Skinmarket и передача предмета через Steam' },
]
const topup = [
  { title: 'Открой пополнение', text: 'В Wooppay перейди к пополнению баланса. Один кошелёк — для скинов, платежей и других доступных сервисов.', image: 'topup', alt: 'Экран пополнения баланса Wooppay' },
  { title: 'Выбери сумму и способ', text: 'Укажи сумму и выбери доступный источник пополнения. Проверь комиссию и лимиты для своего аккаунта.', image: 'topup', alt: 'Выбор суммы и способа пополнения кошелька' },
  { title: 'Подтверди и возвращайся', text: 'Проверь реквизиты и подтверди операцию. Когда деньги появятся на балансе, переходи в Skinmarket за своим скином.', image: 'market', alt: 'Skinmarket после пополнения кошелька' },
]

export function PhoneJourney() {
  const t = useTranslation()

  const [mode, setMode] = useState<'buy' | 'topup'>('buy')
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const steps = mode === 'buy' ? buy : topup
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
    }, { rootMargin: '-30% 0px -35% 0px', threshold: 0 })
    ref.current?.querySelectorAll('[data-step]').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [mode])
  return <div className="sm-journey" ref={ref}><div className="sm-journey-header"><div><p className="sm-eyebrow">{t("ОТ ЖЕЛАНИЯ ДО ИНВЕНТАРЯ")}</p><h2 id="how-heading">{t("Три шага.")}<br/><span>{t("И ты в игре.")}</span></h2></div><div className="sm-tabs" role="group" aria-label={t("Выберите инструкцию")}><button aria-pressed={mode === 'buy'} onClick={() => { setMode('buy'); setActive(0) }}>{t("Купить скин")} <ArrowRight size={15}/></button><button aria-pressed={mode === 'topup'} onClick={() => { setMode('topup'); setActive(0) }}>{t("Пополнить кошелёк")}</button></div></div><div className="sm-journey-grid"><div className="sm-phone-sticky"><div className="sm-phone-glow"/><div className="sm-phone-stage">{steps.map((step, i) => <div key={`${mode}-${i}`} className={`sm-phone-layer ${active === i ? 'is-active' : ''}`} aria-hidden={active !== i}><Image src={`/skinmarket/${step.image}.webp`} alt={t(step.alt)} width={650} height={step.image === 'topup' ? 1444 : 1337} sizes="(max-width: 700px) 230px, 310px" className={step.image === 'topup' ? 'sm-topup-shot' : ''}/></div>)}</div><p className="sm-phone-caption"><span className="sm-live-dot"/> {t("РЕАЛЬНЫЙ ИНТЕРФЕЙС WOOPPAY")} <span>0{active + 1} / 03</span></p><div className="sm-phone-dots">{steps.map((_, i) => <button key={i} aria-label={t("Перейти к шагу {0}", { 0: i + 1 })} aria-pressed={active === i} onClick={() => { setActive(i); document.getElementById(`journey-${mode}-${i}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }) }}/>)}</div></div><div className="sm-steps">{steps.map((step, i) => <article data-step={i} id={`journey-${mode}-${i}`} key={`${mode}-${i}`} className={`sm-step ${active === i ? 'is-active' : ''}`}><span className="sm-step-number">0{i + 1}</span><div><h3>{t(step.title)}</h3><p>{t(step.text)}</p>{i < 2 ? <ArrowDown size={20} className="sm-step-arrow"/> : <span className="sm-step-done"><Check size={15}/> {t("Твой следующий уровень")}</span>}</div></article>)}</div></div><p className="sm-journey-note">{t("Для сделок может потребоваться идентификация. Стоимость, комиссии и сроки проверяй в приложении. Суммы на экранах — примеры.")}</p></div>
}

export function LandingEnhancement() {
  useEffect(() => {
    const nodes = document.querySelectorAll('.sm-reveal')
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }, { threshold: .1 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return null
}
