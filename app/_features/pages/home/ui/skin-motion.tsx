'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, ArrowRight, Check } from 'lucide-react'
import { AppScreen } from './skin-art'
import type { ComponentProps } from 'react'

type JourneyStep = { title: string; text: string; image: ComponentProps<typeof AppScreen>['screen']; label: string }

// A perspective particle current turns inventory into money across the page.
export function MatrixScene({ background = false }: { background?: boolean }) {
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
      if (background) {
        const mobile = width < 760
        const scroll = window.scrollY * .00018
        const unit = Math.min(width * .42, 510)
        ctx.globalCompositeOperation = 'lighter'
        const dot = (x: number, y: number, z: number, cyan: boolean, intensity: number) => {
          const perspective = 2.8 / (2.8 + z)
          const px = width * .5 + x * unit * perspective
          const py = height * .5 + y * unit * perspective
          const edge = Math.min(1, Math.abs(px / width - .5) * 2)
          const alpha = intensity * (.16 + edge * .84)
          ctx.fillStyle = cyan ? `rgba(0,239,229,${alpha})` : `rgba(162,132,255,${alpha})`
          ctx.beginPath(); ctx.arc(px, py, Math.max(.65, perspective * 1.25), 0, Math.PI * 2); ctx.fill()
        }
        // Angular, parallel rails carry the entire packet through the transaction.
        const points = [[-1.85, -1.5], [-1.2, -.85], [-1.2, -.2], [.9, .45], [.9, 1.05], [1.9, 1.8]]
        for (let rail = 0; rail < (mobile ? 9 : 15); rail++) {
          const offset = (rail - (mobile ? 4 : 7)) * .035
          for (let segment = 0; segment < points.length - 1; segment++) {
            const start = points[segment], end = points[segment + 1]
            for (let step = 0; step < 65; step++) {
              const p = step / 65
              const travel = segment + p
              const packet = ((travel - t * .26 - scroll) % 5 + 5) % 5
              const intensity = packet < .48 ? .55 : .1
              dot(start[0] + (end[0] - start[0]) * p + offset,
                (start[1] + (end[1] - start[1]) * p) * height / (unit * 2.4) + offset,
                .3 + rail * .025, segment > 2, intensity)
            }
          }
        }
        // Exploded rectangular layers: inventory tray → protected deal → wallet.
        const outlines = [
          [[-.68, -.45], [.68, -.45], [.68, .45], [-.68, .45], [-.68, -.45]],
          [[0, -.64], [.57, -.38], [.48, .3], [0, .66], [-.48, .3], [-.57, -.38], [0, -.64]],
          [[-.68, -.43], [.54, -.43], [.68, -.29], [.68, -.12], [.14, -.12], [.14, .22], [.68, .22], [.68, .46], [-.68, .46], [-.68, -.43]],
        ]
        for (let object = 0; object < 6; object++) {
          const kind = object % 3
          const side = object % 2 ? 1 : -1
          const cx = side * (width / unit * .49)
          const cy = (object / 5 - .5) * height / unit * .95
          const yaw = side * .48 + Math.sin(t * .16 + object) * .12
          const float = Math.sin(t * .24 + object * 2) * .035
          const outline = outlines[kind]
          for (let layer = 7; layer >= 0; layer--) {
            const depth = layer * .055
            for (let segment = 0; segment < outline.length - 1; segment++) {
              const a = outline[segment], b = outline[segment + 1]
              for (let step = 0; step < 24; step++) {
                const p = step / 24
                const x = a[0] + (b[0] - a[0]) * p
                const y = a[1] + (b[1] - a[1]) * p
                dot(cx + x * Math.cos(yaw) + depth * Math.sin(yaw),
                  cy + y + x * .22 + float, depth + .1, kind === 2,
                  layer === 0 ? .48 : .12)
              }
            }
          }
          // Internal symbols are built from the same dot grid as the objects.
          const glyph = shapes[kind === 2 ? 1 : 0]
          for (let i = 0; i < glyph.length; i += 3) {
            const p = glyph[i]
            dot(cx + p.x * .85 * Math.cos(yaw), cy + p.y * .43 + p.x * .18 + float,
              .08, kind === 2, .38)
          }
        }
        ctx.globalCompositeOperation = 'source-over' 
      } else {
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
    }
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect() }
  }, [background, paused])
  return <><canvas ref={canvas} className={background ? 'sk-field' : 'sk-matrix'} aria-hidden="true"/>{!background && <button className="sk-motion-toggle" onClick={() => window.dispatchEvent(new CustomEvent('skin-motion-toggle', { detail: !paused }))} aria-pressed={paused} aria-label={paused ? 'Продолжить анимацию' : 'Приостановить анимацию'}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>}</>
}

const steps: JourneyStep[] = [
  { title: 'Подключи Steam', text: 'Открой SkinMarket в Wooppay. Войди через Steam и добавь свою ссылку на обмен.', image: 'market', label: '01 / ТВОЙ ИНВЕНТАРЬ' },
  { title: 'Подтверди сделку', text: 'Выбери скин или выставь свой. Покупатель оплачивает заказ, продавец передаёт предмет через Steam.', image: 'payment', label: '02 / СДЕЛКА МЕЖДУ ИГРОКАМИ' },
  { title: 'Получи тенге', text: 'После завершения сделки и периода ожидания деньги поступят в кошелёк Wooppay. Комиссия продавца — 0%.', image: 'trade', label: '03 / ДЕНЬГИ В WOOPPAY' },
]
const journeys: Record<string, JourneyStep[]> = {
  '3 шага': steps,
  'Знакомство': [
    { title: 'Торгуй скинами', text: 'SkinMarket внутри Wooppay: покупай и продавай предметы CS2 напрямую между игроками.', image: 'intro', label: '01 / ЗНАКОМСТВО' },
    { title: 'Подключи свой Steam', text: 'Авторизуйся через Steam и добавь TradeLink для передачи предметов.', image: 'steam', label: '02 / ПОДКЛЮЧЕНИЕ' },
    steps[0],
  ],
  'Покупка': [steps[0], { title: 'Выбери свой скин', text: 'Открой маркет, выбери предмет и проверь его характеристики и условия предложения.', image: 'item', label: '02 / ВЫБОР ПРЕДМЕТА' }, { title: 'Оплати и прими предмет', text: 'Подтверди оплату в Wooppay. Проверь предложение обмена и прими предмет в Steam.', image: 'payment', label: '03 / ПОКУПКА' }],
  'Продажа': [steps[0], { title: 'Выставь предмет', text: 'Выбери скин из своего инвентаря, укажи цену и дождись покупателя.', image: 'market', label: '02 / ПРОДАЖА' }, steps[2]],
  'Оплата': [ { title: 'Проверь заказ', text: 'Сверь название предмета, его характеристики и условия сделки перед оплатой.', image: 'payment', label: '01 / ЗАКАЗ' }, { title: 'Подтверди оплату', text: 'Выбери кошелёк Wooppay и проверь итоговую сумму. Оплата удерживается на время сделки.', image: 'payment', label: '02 / ОПЛАТА' }, { title: 'Следи за статусом', text: 'Передача предмета проходит через Steam. Статус и результат сделки доступны в приложении.', image: 'trade', label: '03 / РЕЗУЛЬТАТ' }],
}
export function TradeJourney() {
  const [journey, setJourney] = useState<keyof typeof journeys>('3 шага')
  const steps = journeys[journey]
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.tradeStep)) }, { rootMargin: '-25% 0px -40% 0px' })
    ref.current?.querySelectorAll('[data-trade-step]').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [journey])
  return <><div className="sk-journey-tabs" role="tablist" aria-label="Сценарий сделки">{Object.keys(journeys).map(name => <button key={name} id={`journey-tab-${name}`} role="tab" aria-selected={journey === name} aria-controls="journey-panel" tabIndex={journey === name ? 0 : -1} onKeyDown={event => { const names = Object.keys(journeys); const index = names.indexOf(name); const next = event.key === 'ArrowRight' ? (index + 1) % names.length : event.key === 'ArrowLeft' ? (index + names.length - 1) % names.length : event.key === 'Home' ? 0 : event.key === 'End' ? names.length - 1 : -1; if (next >= 0) { event.preventDefault(); setJourney(names[next] as keyof typeof journeys); setActive(0); document.getElementById(`journey-tab-${names[next]}`)?.focus() } }} onClick={() => { setJourney(name as keyof typeof journeys); setActive(0) }}>{name}</button>)}</div><div id="journey-panel" role="tabpanel" aria-labelledby={`journey-tab-${journey}`} className="sk-journey" ref={ref}><div className="sk-journey-visual"><div className="sk-journey-orbit"/><div className="sk-journey-phone">{steps.map((step, i) => <div key={`${journey}-${i}`} aria-hidden={i !== active} style={{ display: i === active ? 'block' : 'none' }}><AppScreen className="is-active" screen={step.image}/></div>)}</div><div className="sk-journey-status"><span className="sk-live"/>{steps[active].label}</div></div><div className="sk-journey-steps">{steps.map((step, i) => <article key={step.title} data-trade-step={i} id={`trade-step-${i}`} className={active === i ? 'is-active' : ''}><button onClick={() => { setActive(i); document.getElementById(`trade-step-${i}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }) }} aria-pressed={active === i}><span>0{i + 1}</span><h3>{step.title}</h3><ArrowRight size={22}/></button><p>{step.text}</p><AppScreen className="sk-step-preview" screen={step.image}/>{i === 2 && <small><Check size={14}/> Условия и сроки — до подтверждения сделки</small>}</article>)}</div></div></>
}
