'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { ArrowDown, ArrowRight, Check, Pause, Play } from 'lucide-react'

const knife = 'M 500 32 C 456 66 451 115 438 145 C 418 192 363 234 300 253 L 270 225 L 246 242 L 261 265 L 213 302 L 197 292 L 172 311 L 184 330 L 139 363 L 154 389 L 228 347 L 243 358 L 263 341 L 250 326 L 296 289 C 388 286 473 223 490 152 C 501 105 495 71 500 32 Z M 163 355 A 22 22 0 1 0 163 399 A 22 22 0 1 0 163 355 Z'
const mark = 'M 92 100 L 188 315 L 272 173 L 336 315 L 515 56 L 448 328 L 337 435 L 267 321 L 190 435 L 67 150 Z'

export function DotScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const elapsed = useRef(0)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const scratch = document.createElement('canvas').getContext('2d')!
    const paths = [new Path2D(knife), new Path2D(mark)]
    const points = paths.map(path => {
      const result: { x: number; y: number; z: number }[] = []
      for (let y = 25; y < 440; y += 5.5) for (let x = 60; x < 520; x += 5.5) {
        if (scratch.isPointInPath(path, x, y, 'evenodd')) result.push({ x: x - 290, y: y - 230, z: Math.sin(x * .1 + y * .2) * 12 })
      }
      return result
    })
    let width = 600, height = 600, frame = 0, visible = true, time = elapsed.current, last = 0
    let pointerX = 0, pointerY = 0
    const resize = new ResizeObserver(entries => {
      const rect = entries[0].contentRect
      width = rect.width; height = rect.height
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    })
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const scale = Math.min(width / 610, height / 500)
      const phase = reduced.matches ? 0 : (time % 15000) / 15000
      const blend = phase < .4 ? 0 : phase < .5 ? (phase - .4) * 10 : phase < .87 ? 1 : (1 - phase) / .13
      const mix = blend * blend * (3 - 2 * blend)
      const a = points[0], b = points[1]
      const turn = reduced.matches ? .12 : Math.sin(time * .00035) * .25 + pointerX * .15
      const count = Math.max(a.length, b.length)
      for (let i = 0; i < count; i++) {
        const p = a[i % a.length], q = b[i % b.length]
        const x = p.x + (q.x - p.x) * mix, y = p.y + (q.y - p.y) * mix
        const z = p.z + Math.sin(i * .17 + time * .001) * 5
        const xx = x * Math.cos(turn) + z * Math.sin(turn)
        const zz = -x * Math.sin(turn) + z * Math.cos(turn)
        const perspective = 750 / (750 - zz)
        const wave = reduced.matches ? 0 : Math.sin(x * .02 + time * .001) * 4
        const px = width / 2 + xx * scale * perspective, py = height / 2 + (y + wave + pointerY * 8) * scale * perspective
        const glow = .55 + .45 * Math.sin(i * .37 + time * .0008)
        ctx.fillStyle = i % 13 === 0 ? `rgba(218,255,247,${glow})` : `rgba(76,249,213,${.35 + glow * .6})`
        ctx.beginPath(); ctx.arc(px, py, (1.1 + glow * .7) * scale * perspective, 0, Math.PI * 2); ctx.fill()
      }
      for (let i = 0; i < 60; i++) {
        const x = (Math.sin(i * 127.1) * .5 + .5) * width
        const y = ((i * 137 + time * .008) % (height + 40)) - 20
        ctx.fillStyle = i % 4 === 0 ? '#4cf9d560' : '#b3e5db28'
        ctx.fillRect(x, y, i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1)
      }
    }
    const loop = (now: number) => {
      if (visible && !document.hidden && !paused && !reduced.matches) { time += Math.min(now - last, 50); elapsed.current = time; draw() }
      last = now; frame = requestAnimationFrame(loop)
    }
    const pointer = (event: PointerEvent) => { const r = canvas.getBoundingClientRect(); pointerX = (event.clientX - r.left) / r.width - .5; pointerY = (event.clientY - r.top) / r.height - .5 }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    resize.observe(canvas); observer.observe(canvas); canvas.addEventListener('pointermove', pointer)
    frame = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect(); canvas.removeEventListener('pointermove', pointer) }
  }, [paused])
  return <div className="sm-scene"><div className="sm-orbit sm-orbit-one"/><div className="sm-orbit sm-orbit-two"/><div className="sm-scene-cross cross-one">+</div><div className="sm-scene-cross cross-two">+</div><canvas ref={canvasRef} aria-hidden="true"/><div className="sm-scene-label"><span className="sm-live-dot"/> W / BLADE · PARTICLE STUDY <span>001</span></div><button className="sm-motion-toggle" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Включить анимацию' : 'Приостановить анимацию'} aria-pressed={paused}>{paused ? <Play size={13}/> : <Pause size={13}/>}</button><noscript><svg className="sm-knife-fallback" viewBox="0 0 600 470" aria-hidden="true"><path d={knife} fill="#4cf9d5" fillRule="evenodd"/></svg></noscript></div>
}

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
  return <div className="sm-journey" ref={ref}><div className="sm-journey-header"><div><p className="sm-eyebrow">ОТ ЖЕЛАНИЯ ДО ИНВЕНТАРЯ</p><h2 id="how-heading">Три шага.<br/><span>И ты в игре.</span></h2></div><div className="sm-tabs" role="group" aria-label="Выберите инструкцию"><button aria-pressed={mode === 'buy'} onClick={() => { setMode('buy'); setActive(0) }}>Купить скин <ArrowRight size={15}/></button><button aria-pressed={mode === 'topup'} onClick={() => { setMode('topup'); setActive(0) }}>Пополнить кошелёк</button></div></div><div className="sm-journey-grid"><div className="sm-phone-sticky"><div className="sm-phone-glow"/><div className="sm-phone-stage">{steps.map((step, i) => <div key={`${mode}-${i}`} className={`sm-phone-layer ${active === i ? 'is-active' : ''}`} aria-hidden={active !== i}><Image src={`/skinmarket/${step.image}.webp`} alt={step.alt} width={650} height={step.image === 'topup' ? 1444 : 1337} sizes="(max-width: 700px) 230px, 310px" className={step.image === 'topup' ? 'sm-topup-shot' : ''}/></div>)}</div><p className="sm-phone-caption"><span className="sm-live-dot"/> РЕАЛЬНЫЙ ИНТЕРФЕЙС WOOPPAY <span>0{active + 1} / 03</span></p><div className="sm-phone-dots">{steps.map((_, i) => <button key={i} aria-label={`Перейти к шагу ${i + 1}`} aria-pressed={active === i} onClick={() => { setActive(i); document.getElementById(`journey-${mode}-${i}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }) }}/>)}</div></div><div className="sm-steps">{steps.map((step, i) => <article data-step={i} id={`journey-${mode}-${i}`} key={`${mode}-${i}`} className={`sm-step ${active === i ? 'is-active' : ''}`}><span className="sm-step-number">0{i + 1}</span><div><h3>{step.title}</h3><p>{step.text}</p>{i < 2 ? <ArrowDown size={20} className="sm-step-arrow"/> : <span className="sm-step-done"><Check size={15}/> Твой следующий уровень</span>}</div></article>)}</div></div><p className="sm-journey-note">Для сделок может потребоваться идентификация. Стоимость, комиссии и сроки проверяй в приложении. Суммы на экранах — примеры.</p></div>
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
