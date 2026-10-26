'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play, ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'

// Two independent rhythms: a quiet topographic field and a morphing dot display.
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
        const spacing = width < 600 ? 24 : 28
        for (let x = 0; x < width; x += spacing) for (let y = 0; y < height; y += spacing) {
          const wave = Math.sin(x * .007 + y * .009 - t * .18)
          const ribbon = Math.pow((wave + 1) / 2, 8)
          ctx.fillStyle = `rgba(165,190,149,${.025 + ribbon * .13})`
          ctx.beginPath(); ctx.arc(x, y + Math.sin(x * .008 + t * .15) * 10, .8 + ribbon * 1.1, 0, Math.PI * 2); ctx.fill()
        }
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
          ctx.fillStyle = i % 13 === 0 ? `rgba(189,167,255,${shimmer})` : `rgba(204,255,119,${shimmer})`
          ctx.beginPath(); ctx.arc(width / 2 + x + Math.sin(t + y * .009) * 5, height * .33 + y, 1.45, 0, Math.PI * 2); ctx.fill()
        }
        // Elliptical transaction paths visually carry the inventory into the wallet.
        for (let i = 0; i < 90; i++) {
          const angle = i / 90 * Math.PI * 2 + t * .24
          const x = Math.cos(angle) * width * .43, y = Math.sin(angle) * height * .18
          ctx.fillStyle = `rgba(181,159,255,${.2 + .5 * Math.pow((Math.sin(angle) + 1) / 2, 4)})`
          ctx.beginPath(); ctx.arc(width / 2 + x, height * .57 + y + x * .2, i % 9 === 0 ? 2.2 : 1, 0, Math.PI * 2); ctx.fill()
        }
      }
    }
    frame = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); observer.disconnect() }
  }, [background, paused])
  return <><canvas ref={canvas} className={background ? 'sk-field' : 'sk-matrix'} aria-hidden="true"/>{!background && <button className="sk-motion-toggle" onClick={() => window.dispatchEvent(new CustomEvent('skin-motion-toggle', { detail: !paused }))} aria-pressed={paused} aria-label={paused ? 'Продолжить анимацию' : 'Приостановить анимацию'}>{paused ? <Play size={14}/> : <Pause size={14}/>}</button>}</>
}

const steps = [
  { title: 'Подключи Steam', text: 'Открой SkinMarket в Wooppay. Войди через Steam и добавь свою ссылку на обмен.', image: 'market', label: '01 / ТВОЙ ИНВЕНТАРЬ' },
  { title: 'Подтверди сделку', text: 'Выбери скин или выставь свой. Покупатель оплачивает заказ, продавец передаёт предмет через Steam.', image: 'payment', label: '02 / СДЕЛКА МЕЖДУ ИГРОКАМИ' },
  { title: 'Получи тенге', text: 'После завершения сделки и периода ожидания деньги поступят в кошелёк Wooppay. Комиссия продавца — 0%.', image: 'trade', label: '03 / ДЕНЬГИ В WOOPPAY' },
]
export function TradeJourney() {
  const [active, setActive] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(entries => { for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.tradeStep)) }, { rootMargin: '-25% 0px -40% 0px' })
    ref.current?.querySelectorAll('[data-trade-step]').forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
  return <div className="sk-journey" ref={ref}><div className="sk-journey-visual"><div className="sk-journey-orbit"/><div className="sk-journey-phone">{steps.map((step, i) => <Image key={step.image} src={`/skinmarket/${step.image}.webp`} alt={i === active ? step.title + ' — экран приложения Wooppay' : ''} aria-hidden={i !== active} width={650} height={1337} sizes="280px" className={i === active ? 'is-active' : ''}/>)}</div><div className="sk-journey-status"><span className="sk-live"/>{steps[active].label}</div></div><div className="sk-journey-steps">{steps.map((step, i) => <article key={step.title} data-trade-step={i} id={`trade-step-${i}`} className={active === i ? 'is-active' : ''}><button onClick={() => { setActive(i); document.getElementById(`trade-step-${i}`)?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }) }} aria-pressed={active === i}><span>0{i + 1}</span><h3>{step.title}</h3><ArrowRight size={22}/></button><p>{step.text}</p><Image className="sk-step-preview" src={`/skinmarket/${step.image}.webp`} alt={step.title + " — экран Wooppay"} width={650} height={1337} sizes="115px"/>{i === 2 && <small><Check size={14}/> Условия и сроки — до подтверждения сделки</small>}</article>)}</div></div>
}
