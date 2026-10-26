'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Maximize2, X } from 'lucide-react'

type Step = { image: number; title: string; text: string }
const flows: { label: string; intro: string; steps: Step[] }[] = [
  { label: 'Первый запуск', intro: 'Кошелёк, который знакомится с тобой.', steps: [
    { image: 23, title: 'Для близких — и для себя', text: 'Познакомься с международными пополнениями карт и кошельков.' },
    { image: 24, title: 'Больше твоих увлечений', text: 'Открой возможности для спорта и развлечений.' },
    { image: 25, title: 'Твоя игра продолжается', text: 'Найди игровые пополнения и цифровые сервисы.' },
    { image: 26, title: 'Настрой под себя', text: 'Выбери интересы: переводы, игровые пополнения или SkinMarket.' },
    { image: 18, title: 'Узнай свои возможности', text: 'Посмотри доступные функции кошелька и условия идентификации.' },
  ] },
  { label: 'Пополнение', intro: 'Начни с баланса. Дальше — твой выбор.', steps: [
    { image: 13, title: 'Один баланс для разных дел', text: 'Узнай о доступных способах пополнения и вывода внутри приложения.' },
    { image: 22, title: 'Укажи сумму', text: 'Открой пополнение, введи сумму и выбери источник. Итоговые условия видны перед подтверждением.' },
  ] },
  { label: 'Знакомство со SkinMarket', intro: 'От кошелька к игровому инвентарю.', steps: [
    { image: 9, title: 'Открой SkinMarket', text: 'Маркет скинов CS2 находится прямо в Wooppay. На экране знакомства указана комиссия продавца 0%.' },
    { image: 10, title: 'Подключи Steam', text: 'Войди через Steam и подготовь свою ссылку на обмен.' },
    { image: 11, title: 'Разберись в P2P', text: 'Предмет передаётся между игроками, расчёт проходит через кошелёк.' },
    { image: 12, title: 'Посмотри этапы сделки', text: 'Оплата, передача предмета, ожидание по правилам Steam и расчёт с продавцом.' },
    { image: 14, title: 'Выбери категорию', text: 'Изучи категории и новые предложения на главном экране маркета.' },
    { image: 15, title: 'Найди нужный предмет', text: 'Используй поиск, фильтры и сортировку каталога.' },
    { image: 16, title: 'Изучи характеристики', text: 'Проверь стоимость, состояние и свойства предмета до покупки.' },
    { image: 17, title: 'Пройди идентификацию', text: 'Если приложение запрашивает идентификацию, заверши её перед совершением сделки.' },
    { image: 19, title: 'Сравни предложения', text: 'Открой другой предмет и проверь его характеристики и цену.' },
    { image: 20, title: 'Укажи Trade Link', text: 'Добавь ссылку на обмен из своего Steam. Не передавай пароль или коды другим людям.' },
    { image: 21, title: 'Проверь правила оплаты', text: 'Прочитай, как средства удерживаются и передаются продавцу после завершения сделки.' },
  ] },
  { label: 'Покупка скина', intro: 'Весь путь сделки — перед глазами.', steps: [
    { image: 8, title: 'Зайди в маркет', text: 'Открой SkinMarket из приложения Wooppay.' },
    { image: 28, title: 'Выбери предложение', text: 'Посмотри доступные скины, их состояние и цену в тенге.' },
    { image: 27, title: 'Открой карточку', text: 'Проверь характеристики выбранного предмета и итоговую стоимость.' },
    { image: 30, title: 'Оплати из кошелька', text: 'Убедись, что баланса достаточно, и подтверди покупку в приложении.' },
    { image: 29, title: 'Следи за сделкой', text: 'Дождись продавца и предложения обмена в Steam. Перед принятием проверь предмет; расчёт зависит от правил сделки и Steam.' },
  ] },
]

export function WalletFlows() {
  const [flow, setFlow] = useState(0)
  const [step, setStep] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const dialog = useRef<HTMLDialogElement>(null)
  const zoomButton = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (expanded) {
      dialog.current?.showModal()
      const overflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => { document.body.style.overflow = overflow }
    }
    dialog.current?.close()

  }, [expanded])
  const current = flows[flow]
  const selected = current.steps[step]
  return <div className="wf-explorer">
    <div className="wf-tabs" role="tablist" aria-label="Сценарии использования">{flows.map((item, i) => <button key={item.label} id={`flow-tab-${i}`} role="tab" aria-selected={flow === i} aria-controls="flow-panel" tabIndex={flow === i ? 0 : -1} onClick={() => { setFlow(i); setStep(0) }} onKeyDown={event => { if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); const next = (i + (event.key === 'ArrowRight' ? 1 : -1) + flows.length) % flows.length; setFlow(next); setStep(0); document.getElementById(`flow-tab-${next}`)?.focus() } }}>{item.label}<span>0{current === item ? step + 1 : item.steps.length}</span></button>)}</div>
    <div className="wf-panel" id="flow-panel" role="tabpanel" aria-labelledby={`flow-tab-${flow}`}>
      <div className="wf-screen-area"><div className="wf-orbit"/><div className="wf-screen-label">WOOPPAY APP <span>РЕАЛЬНЫЙ ИНТЕРФЕЙС</span></div><button ref={zoomButton} className="wf-screen-button" onClick={() => setExpanded(true)} aria-label={`Увеличить экран: ${selected.title}`}><Image key={selected.image} src={`/wallet/screen-${selected.image}.webp`} width={320} height={660} alt={selected.title} className="wf-screen" sizes="(max-width: 700px) 240px, 320px"/><span><Maximize2 size={14}/> Рассмотреть экран</span></button><div className="wf-controls"><button onClick={() => setStep(value => Math.max(0, value - 1))} disabled={step === 0} aria-label="Предыдущий шаг"><ArrowLeft size={20}/></button><span>{String(step + 1).padStart(2, '0')} <i>/ {String(current.steps.length).padStart(2, '0')}</i></span><button onClick={() => setStep(value => Math.min(current.steps.length - 1, value + 1))} disabled={step === current.steps.length - 1} aria-label="Следующий шаг"><ArrowRight size={20}/></button></div></div>
      <div className="wf-step-list"><h3>{current.intro}</h3><div className="wf-selected" aria-live="polite"><span>ШАГ {String(step + 1).padStart(2, '0')}</span><h4>{selected.title}</h4><p>{selected.text}</p></div><div className="wf-step-buttons">{current.steps.map((item, i) => <button key={item.image} aria-pressed={i === step} onClick={() => setStep(i)}><span>{i < step ? <Check size={14}/> : String(i + 1).padStart(2, '0')}</span>{item.title}<ArrowRight size={16}/></button>)}</div><p className="wf-note">Суммы на экранах — примеры из приложения. Доступность операций, комиссии и лимиты проверяй перед подтверждением.</p></div>
    </div>
    <dialog ref={dialog} className="wf-lightbox" aria-label={selected.title} onCancel={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) setExpanded(false) }}><button onClick={() => setExpanded(false)} aria-label="Закрыть увеличенный экран"><X/></button>{expanded && <Image src={`/wallet/screen-${selected.image}.webp`} width={576} height={1280} alt={selected.title}/>}</dialog>
  </div>
}

export function PromoReel() {
  const [selected, setSelected] = useState(0)
  const names = ['Всё в одном', 'Скины CS2', 'Близкие за рубежом', 'Акции и кешбэк', 'Игры и сервисы', 'Поддержка', 'Как начать']
  return <div className="wf-reel"><div className="wf-reel-nav">{names.map((name, i) => <button key={name} aria-pressed={selected === i} onClick={() => { setSelected(i); document.getElementById(`promo-${i}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest', inline: 'center' }) }}>{name}</button>)}</div><div className="wf-reel-track" tabIndex={0} aria-label="Семь возможностей Wooppay из Google Play">{names.map((name, i) => <figure key={name} id={`promo-${i}`}><Image src={`/wallet/screen-${i}.webp`} width={288} height={512} alt={`Wooppay в Google Play: ${name}`} sizes="(max-width: 700px) 220px, 288px"/><figcaption><span>0{i + 1}</span>{name}</figcaption></figure>)}</div></div>
}
