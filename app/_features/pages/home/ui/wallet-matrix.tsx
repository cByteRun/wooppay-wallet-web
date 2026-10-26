'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

// A single lattice bends into a wallet, a transfer route and a game controller.
export function WalletMatrix() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduce = matchMedia('(prefers-reduced-motion: reduce)')
    let width = 600, height = 600, frame = 0, time = 0, last = 0, visible = true
    const points = Array.from({ length: 2600 }, (_, i) => {
      const u = (i % 65) / 64, v = Math.floor(i / 65) / 39
      const angle = u * Math.PI * 2
      return { u, v, x: Math.cos(angle) * (155 + Math.cos(v * Math.PI * 2) * 43), y: Math.sin(angle) * (155 + Math.cos(v * Math.PI * 2) * 43), z: Math.sin(v * Math.PI * 2) * 43 }
    })
    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const scale = Math.min(width / 520, height / 520)
      const angle = -.55 + Math.sin(time * .00016) * .22
      const rotation = time * .0001
      for (const p of points) {
        const a = Math.atan2(p.y, p.x) + rotation
        const radius = Math.hypot(p.x, p.y)
        const x = Math.cos(a) * radius, y = Math.sin(a) * radius
        const yy = y * Math.cos(angle) - p.z * Math.sin(angle)
        const z = y * Math.sin(angle) + p.z * Math.cos(angle)
        const size = (1.15 + (z + 180) / 300) * scale
        const alpha = .2 + (z + 180) / 420
        ctx.fillStyle = p.v > .58 ? `rgba(151,128,255,${alpha})` : `rgba(93,178,255,${alpha})`
        ctx.beginPath(); ctx.arc(width / 2 + x * scale, height / 2 + yy * scale, size, 0, Math.PI * 2); ctx.fill()
      }
      // The small satellites make the same dots flow out into the page.
      for (let i = 0; i < 55; i++) {
        const a = i * 2.39996 + time * .000035, r = 214 + i % 5 * 15
        ctx.fillStyle = `rgba(184,176,255,${.12 + i % 4 * .08})`
        ctx.beginPath(); ctx.arc(width / 2 + Math.cos(a) * r * scale, height / 2 + Math.sin(a) * r * .72 * scale, 1.2 * scale, 0, Math.PI * 2); ctx.fill()
      }
    }
    const resize = new ResizeObserver(([entry]) => { width = entry.contentRect.width; height = entry.contentRect.height; const ratio = Math.min(devicePixelRatio || 1, 2); canvas.width = width * ratio; canvas.height = height * ratio; ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw() })
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    const loop = (now: number) => { if (visible && !document.hidden && !paused && !reduce.matches) { time += Math.min(now - last, 40); draw() }; last = now; frame = requestAnimationFrame(loop) }
    resize.observe(canvas); observer.observe(canvas); frame = requestAnimationFrame(loop)
    return () => { resize.disconnect(); observer.disconnect(); cancelAnimationFrame(frame) }
  }, [paused])
  return <div className="wf-matrix"><canvas ref={ref} aria-hidden="true"/><div className="wf-matrix-core"><span>₸</span><small>ОДИН БАЛАНС.<br/>ТЫСЯЧИ ПЛАНОВ.</small></div><span className="wf-matrix-tag">WOOPPAY / CONNECTED LIFE</span><button aria-label={paused ? 'Включить анимацию' : 'Остановить анимацию'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={16}/> : <Pause size={16}/>}</button></div>
}
