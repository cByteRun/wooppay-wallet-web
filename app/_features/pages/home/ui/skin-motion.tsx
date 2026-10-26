'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, ArrowRight } from 'lucide-react'
import { AppScreen } from './skin-art'
import type { ComponentProps } from 'react'

type JourneyStep = { title: string; text: string; image: ComponentProps<typeof AppScreen>['screen']; label: string }

// Foreground commission display; the page background is a separate SVG composition.
export function MatrixScene() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const elapsedRef = useRef(0)
  useEffect(() => {
    const onToggle = (event: Event) => setPaused((event as CustomEvent<boolean>).detail)
    window.addEventListener('skin-motion-toggle', onToggle)
    return () => window.removeEventListener('skin-motion-toggle', onToggle)
  }, [])
  useEffect(() => {
    const element = canvas.current
    if (!element) return
    const ctx = element.getContext('2d')
    if (!ctx) return
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    let width = 0, height = 0, frame = 0, visible = true, elapsed = elapsedRef.current, previous = 0
    const shapes: { x: number; y: number }[][] = []
    const buffer = document.createElement('canvas')
    buffer.width = 480; buffer.height = 240
    const ink = buffer.getContext('2d')!
    for (const glyph of ['0%', '₸', 'logo']) {
      ink.clearRect(0, 0, 480, 240)
      ink.fillStyle = '#fff'; ink.textAlign = 'center'; ink.textBaseline = 'middle'; ink.font = `900 ${glyph === '0%' ? 210 : 230}px Arial`
      if (glyph === 'logo') {
        ink.save(); ink.translate(112, 0); ink.scale(4, 4)
        ink.strokeStyle = '#fff'; ink.lineWidth = 4; ink.lineCap = 'round'; ink.lineJoin = 'round'
        ink.stroke(new Path2D('m12 25 7 21 9-14 7 14 5-17c3-10 17-9 17 2 0 9-7 13-15 11'))
        ink.stroke(new Path2D('m29 22 2 4')); ink.beginPath(); ink.arc(51, 14, 4, 0, Math.PI * 2); ink.fill(); ink.restore()
      } else ink.fillText(glyph, 240, 133)
      const pixels = ink.getImageData(0, 0, 480, 240).data
      const points = []
      for (let y = 0; y < 240; y += 6) for (let x = 0; x < 480; x += 6) if (pixels[(y * 480 + x) * 4 + 3] > 100) points.push({ x: x / 480 - .5, y: y / 240 - .5 })
      shapes.push(points)
    }
    const resize = new ResizeObserver(() => {
      const box = element.getBoundingClientRect(); width = box.width; height = box.height
      const dpr = Math.min(devicePixelRatio, 2)
      element.width = width * dpr; element.height = height * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    })
    resize.observe(element)
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    observer.observe(element)
    const draw = (time: number) => {
      frame = requestAnimationFrame(draw)
      const dt = previous ? Math.min(time - previous, 50) : 0; previous = time
      if (!visible || document.hidden) return
      if (!paused && !media.matches) elapsed += dt
      elapsedRef.current = elapsed
      ctx.clearRect(0, 0, width, height)
      const t = elapsed / 1000
      const phase = t / 6, current = Math.floor(phase) % shapes.length, next = (current + 1) % shapes.length
      const progress = Math.min(1, Math.max(0, (phase % 1 - .7) / .3))
      const blend = progress * progress * (3 - 2 * progress)
      const a = shapes[current], b = shapes[next]
      const scale = Math.min(width * .92, 550)
      for (let i = 0; i < Math.max(a.length, b.length); i++) {
        const p = a[i % a.length], q = b[i % b.length]
        const x = (p.x + (q.x - p.x) * blend) * scale
        const y = (p.y + (q.y - p.y) * blend) * scale * .5
        const shimmer = .6 + .4 * Math.sin(i * .32 + t * 2)
        ctx.fillStyle = i % 13 === 0 ? `rgba(139,104,255,${shimmer})` : `rgba(0,240,240,${shimmer})`
        ctx.beginPath(); ctx.arc(width / 2 + x + Math.sin(t + y * .009) * 5, height * .43 + y, 1.45, 0, Math.PI * 2); ctx.fill()
      }
      // Elliptical transaction paths visually carry the inventory into the wallet.
      for (let i = 0; i < 90; i++) {
        const angle = i / 90 * Math.PI * 2 + t * .24
        const x = Math.cos(angle) * width * .43, y = Math.sin(angle) * height * .18
        ctx.fillStyle = `rgba(181,159,255,${.2 + .5 * Math.pow((Math.sin(angle) + 1) / 2, 4)})`
        ctx.beginPath(); ctx.arc(width / 2 + x, height * .65 + y + x * .12, i % 9 === 0 ? 2.2 : 1, 0, Math.PI * 2); ctx.fill()
      }
    }
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect() }
  }, [paused])
  return <><canvas ref={canvas} className="sk-matrix" aria-hidden="true"/><button className="sk-motion-toggle" onClick={() => window.dispatchEvent(new CustomEvent('skin-motion-toggle', { detail: !paused }))} aria-pressed={paused} aria-label={paused ? 'Продолжить анимацию' : 'Приостановить анимацию'}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button></>
}

const journeys: Record<string, JourneyStep[]> = {
  'Первый трейд': [
    { title: 'Нажми «Маркет»', text: 'Открой SkinMarket в Wooppay и перейди в маркет скинов CS2.', image: 'market', label: '01 / МАРКЕТ' },
    { title: 'Выбери скин', text: 'Открой понравившийся предмет. Проверь цену в тенге, износ и характеристики.', image: 'item', label: '02 / ТВОЙ СКИН' },
    { title: 'Оплати кошельком', text: 'Проверь сумму и подтверди оплату в Wooppay. Если баланс нужно пополнить, сделай это перед покупкой.', image: 'payment', label: '03 / ОПЛАТА' },
    { title: 'Отслеживай передачу', text: 'Открой сделки и следи за статусом. Дождись предложения продавца и прими предмет в Steam.', image: 'trade', label: '04 / ПЕРЕДАЧА В STEAM' },
  ],
  'Продать скин': [
    { title: 'Подключи инвентарь', text: 'Авторизуйся через Steam и привяжи Trade Link, чтобы работать со своими предметами CS2.', image: 'tradelink', label: '01 / СВОЙ STEAM' },
    { title: 'Выставь и передай скин', text: 'Выбери предмет для продажи и укажи цену. Когда покупатель оплатит заказ, передай предмет через обмен в Steam.', image: 'trade', label: '02 / ПРЕДЛОЖЕНИЕ И ОБМЕН' },
    { title: 'Получи тенге в кошелёк', text: 'После завершения сделки и периода ожидания деньги поступят в Wooppay. Комиссия продавца SkinMarket — 0%.', image: 'settlement', label: '03 / СКИН → ТЕНГЕ' },
  ],
  'Пополнить': [
    { title: 'Выбери способ', text: 'Открой пополнение в Wooppay. Доступные источники средств отображаются в приложении.', image: 'fundingIntro', label: '01 / ИСТОЧНИК СРЕДСТВ' },
    { title: 'Укажи сумму', text: 'Введи сумму и выбери источник. Проверь комиссию и итог до подтверждения операции.', image: 'funding', label: '02 / ПОПОЛНЕНИЕ БАЛАНСА' },
    { title: 'Используй баланс', text: 'С кошелька можно оплачивать покупки в SkinMarket, связь, интернет и другие доступные услуги.', image: 'fundingIntro', label: '03 / ОДИН БАЛАНС' },
  ],
  'За пределами игры': [
    { title: 'Поддерживай близких', text: 'Пополняй зарубежные карты и электронные кошельки. Калькулятор покажет курс и сумму получения до подтверждения.', image: 'international', label: '01 / МЕЖДУНАРОДНЫЕ НАПРАВЛЕНИЯ' },
    { title: 'Оплачивай игровые сервисы', text: 'Находи игровые пополнения, подписки и другие цифровые сервисы в приложении Wooppay.', image: 'gaming', label: '02 / ИГРЫ И ПОДПИСКИ' },
    { title: 'Собери свой кошелёк', text: 'Выбирай нужные возможности: повседневные платежи, переводы и покупки. Всё в одном приложении.', image: 'preferences', label: '03 / WOOPPAY НА КАЖДЫЙ ДЕНЬ' },
  ],
}
export function TradeJourney() {
  const [journey, setJourney] = useState<keyof typeof journeys>('Первый трейд')
  const [active, setActive] = useState(0)
  const steps = journeys[journey]
  const step = steps[active]
  const selectJourney = (name: string) => { setJourney(name); setActive(0) }
  return <>
    <div className="sk-journey-tabs" role="tablist" aria-label="Сценарии использования Wooppay">{Object.keys(journeys).map(name => <button key={name} id={`journey-tab-${name}`} role="tab" aria-selected={journey === name} aria-controls="journey-panel" tabIndex={journey === name ? 0 : -1} onKeyDown={event => {
      const names = Object.keys(journeys), index = names.indexOf(name)
      const next = event.key === 'ArrowRight' ? (index + 1) % names.length : event.key === 'ArrowLeft' ? (index + names.length - 1) % names.length : event.key === 'Home' ? 0 : event.key === 'End' ? names.length - 1 : -1
      if (next >= 0) { event.preventDefault(); selectJourney(names[next]); document.getElementById(`journey-tab-${names[next]}`)?.focus() }
    }} onClick={() => selectJourney(name)}>{name}</button>)}</div>
    <div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${journey}`} className="sk-matrix-console">
      <div className="sk-console-display">
        <div className="sk-console-head"><span>WOOPPAY / TOUCH TO EXPLORE</span><span>0{active + 1} / 0{steps.length}</span></div>
        <button className="sk-touch-screen" onClick={() => setActive(value => (value + 1) % steps.length)} aria-label={active === steps.length - 1 ? 'Посмотреть сценарий сначала' : `Следующий шаг: ${steps[active + 1].title}`}>
          <span className="sk-screen-frame"><span className={`sk-screen-crop sk-crop-${step.image}`} key={`${journey}-${active}`}><AppScreen screen={step.image}/></span></span>
          <span className="sk-touch-hint">{active === steps.length - 1 ? '↺ НАЖМИ, ЧТОБЫ ПОВТОРИТЬ' : '+ НАЖМИ НА ЭКРАН — СЛЕДУЮЩИЙ ШАГ'}</span>
        </button>
        <div className="sk-dot-progress" aria-hidden="true">{steps.map((_, index) => <span key={index} className={index <= active ? 'is-lit' : ''}>{Array.from({ length: 15 }, (_, dot) => <i key={dot}/>)}</span>)}</div>
      </div>
      <div className="sk-console-copy">
        <p className="sk-eyebrow">{journey === 'Первый трейд' ? 'ТВОЙ ТРЕЙД. ЧЕТЫРЕ ДЕЙСТВИЯ.' : journey.toUpperCase()}</p>
        <div className="sk-console-readout" aria-live="polite" aria-atomic="true"><span className="sk-console-index">0{active + 1}</span><h3>{step.title}</h3><p>{step.text}</p></div>
        <div className="sk-console-keys" role="group" aria-label="Шаги сценария">{steps.map((item, index) => <button key={item.title} aria-pressed={index === active} onClick={() => setActive(index)}><span>0{index + 1}</span><span>{item.title}</span><ArrowRight size={18}/></button>)}</div>
        <p className="sk-console-note">Интерфейс Wooppay · нажимай на экран или выбери шаг</p>
      </div>
    </div>
  </>
}
