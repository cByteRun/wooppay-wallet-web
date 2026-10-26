'use client'

import { useEffect, useRef, useState } from 'react'
import { Pause, Play } from 'lucide-react'

type Point = { x: number; y: number; z: number; bright: boolean }
const wallet = 'M -185 -125 Q -185 -150 -160 -150 L 155 -150 Q 180 -150 180 -125 L 180 125 Q 180 150 155 150 L -160 150 Q -185 150 -185 125 Z'
const karambit = 'M 168 -205 C 205 -70 175 44 45 83 L 3 71 L -18 93 L -39 82 L -62 111 L -83 99 L -109 130 L -139 116 L -157 139 C -211 167 -223 223 -169 236 C -117 249 -87 204 -112 170 L -74 142 L -53 151 L -28 125 L -6 136 L 26 107 C 159 109 258 -27 168 -205 Z M -167 171 A 23 23 0 1 0 -167 217 A 23 23 0 1 0 -167 171 Z'
const awp = 'M -235 -5 L -80 -5 L -80 -24 L -24 -24 L -24 -42 L 102 -42 L 102 -25 L 137 -25 L 137 -9 L 239 -9 L 239 -2 L 137 -2 L 130 16 L 67 16 L 61 45 L 35 42 L 27 15 L -31 15 L -51 64 L -75 62 L -66 22 L -111 22 L -130 43 L -233 66 Z M -45 -64 L -39 -81 L 54 -81 L 60 -65 L 107 -65 L 107 -44 L 53 -44 L 46 -51 L -34 -51 L -41 -43 L -70 -43 L -70 -65 Z'
const wp = 'M -102 -35 L -75 46 L -39 -6 L -13 46 L 11 -26 C 30 -90 118 -68 111 -8 C 107 35 78 46 40 38'
const labels = ['WALLET / ВСЁ НАЧИНАЕТСЯ ЗДЕСЬ', 'KARAMBIT / ТВОЙ СТИЛЬ В ИГРЕ', 'AWP / ТВОЙ СЛЕДУЮЩИЙ ХОД']

export function WalletUniverse() {
  const ref = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  const [scene, setScene] = useState(0)
  const clock = useRef(0)
  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    const scratch = document.createElement('canvas').getContext('2d')!
    const shapes = [wallet, karambit, awp].map((d, index) => {
      const path = new Path2D(d), logo = new Path2D(wp)
      scratch.lineWidth = 12
      const candidates: Point[] = []
      for (let y = -245; y < 245; y += 4) for (let x = -250; x < 250; x += 4) {
        if (!scratch.isPointInPath(path, x, y, 'evenodd')) continue
        const edge = !scratch.isPointInPath(path, x + 5, y) || !scratch.isPointInPath(path, x - 5, y) || !scratch.isPointInPath(path, x, y + 5) || !scratch.isPointInPath(path, x, y - 5)
        const isLogo = index === 0 && scratch.isPointInStroke(logo, x, y)
        const depth = index === 0 ? 38 : index === 1 ? 12 : 18
        candidates.push({ x, y, z: depth, bright: isLogo || edge || (index === 0 && x > 112 && Math.abs(y) < 27) })
        if (edge) for (const z of [-depth, 0]) candidates.push({ x, y, z, bright: true })
      }
      return Array.from({ length: 3400 }, (_, i) => candidates[Math.floor(i / 3400 * candidates.length)])
    })
    let width = 700, height = 700, frame = 0, last = 0, visible = true, target = 0, current = 0, pointerX = 0, pointerY = 0
    const draw = () => {
      const time = clock.current
      ctx.clearRect(0, 0, width, height)
      const scale = Math.min(width / 590, height / 570)
      // A moving field of dots connects the object to the whole scene.
      for (let y = 12; y < height; y += 23) for (let x = 12; x < width; x += 23) {
        const wave = Math.sin(x * .009 + y * .012 + time * .00025)
        ctx.fillStyle = `rgba(174,156,230,${.035 + (wave + 1) * .025})`
        ctx.fillRect(x, y + wave * 5, 1.3, 1.3)
      }
      const a = Math.min(1, Math.floor(current)), b = a + 1
      const raw = current - a, mix = raw * raw * (3 - 2 * raw)
      const turn = -.25 + Math.sin(time * .00022) * .24 + pointerX * .18
      const tilt = -.12 + pointerY * .12
      const projected = shapes[a].map((p, i) => {
        const q = shapes[b][i]
        const x = p.x + (q.x - p.x) * mix, y = p.y + (q.y - p.y) * mix, z = p.z + (q.z - p.z) * mix
        const rx = x * Math.cos(turn) + z * Math.sin(turn), rz = -x * Math.sin(turn) + z * Math.cos(turn)
        const ry = y * Math.cos(tilt) - rz * Math.sin(tilt), zz = y * Math.sin(tilt) + rz * Math.cos(tilt)
        const perspective = 850 / (850 - zz)
        return { x: width / 2 + rx * scale * perspective, y: height / 2 + (ry + Math.sin(time * .0007) * 8) * scale * perspective, z: zz, r: perspective * scale, bright: mix < .5 ? p.bright : q.bright }
      }).sort((p, q) => p.z - q.z)
      for (const p of projected) {
        const alpha = Math.max(.2, Math.min(1, .55 + p.z / 230))
        ctx.fillStyle = p.bright ? `rgba(218,255,148,${alpha + .15})` : `rgba(181,157,255,${alpha})`
        ctx.beginPath(); ctx.arc(p.x, p.y, (p.bright ? 1.65 : 1.05) * p.r, 0, Math.PI * 2); ctx.fill()
      }
    }
    const scroll = () => {
      const chapters = Array.from(document.querySelectorAll<HTMLElement>('[data-universe]'))
      const anchors = chapters.map(el => el.getBoundingClientRect().top + scrollY)
      const position = scrollY + innerHeight * .2
      target = position < anchors[1] ? Math.max(0, Math.min(1, (position - anchors[0]) / (anchors[1] - anchors[0]))) : 1 + Math.max(0, Math.min(1, (position - anchors[1]) / (anchors[2] - anchors[1])))
      // Keep each object settled through most of its chapter; morph between chapters.
      const base = Math.floor(target), fraction = target - base
      target = Math.min(2, base + Math.max(0, Math.min(1, (fraction - .45) / .5)))
      setScene(Math.round(target))
      if (reduced.matches) { current = Math.round(target); draw() }
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height
      const dpr = Math.min(devicePixelRatio || 1, 2)
      canvas.width = width * dpr; canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); scroll(); draw()
    })
    const loop = (now: number) => {
      if (visible && !document.hidden && !paused && !reduced.matches) {
        clock.current += Math.min(now - last, 45)
        current += (target - current) * .075
        draw()
      }
      last = now; frame = requestAnimationFrame(loop)
    }
    const pointer = (event: PointerEvent) => { const r = canvas.getBoundingClientRect(); pointerX = (event.clientX - r.left) / r.width - .5; pointerY = (event.clientY - r.top) / r.height - .5 }
    const visibility = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    const motionChange = () => { current = Math.round(target); draw() }
    resize.observe(canvas); visibility.observe(canvas)
    window.addEventListener('scroll', scroll, { passive: true }); canvas.addEventListener('pointermove', pointer); reduced.addEventListener('change', motionChange)
    scroll(); frame = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(frame); resize.disconnect(); visibility.disconnect(); window.removeEventListener('scroll', scroll); canvas.removeEventListener('pointermove', pointer); reduced.removeEventListener('change', motionChange) }
  }, [paused])
  return <div className="wp-particle-stage"><div className="wp-stage-top"><span>WOOPPAY OBJECTS</span><span>0{scene + 1} / 03</span></div><div className="wp-stage-glow"/><canvas ref={ref} aria-hidden="true"/><div className="wp-object-name">{labels[scene]}</div><div className="wp-stage-bottom"><span>СКРОЛЛЬ, ЧТОБЫ ИССЛЕДОВАТЬ ↓</span><button onClick={() => setPaused(value => !value)} aria-pressed={paused} aria-label={paused ? 'Включить анимацию' : 'Приостановить анимацию'}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button></div><noscript><svg viewBox="-260 -250 520 500" aria-hidden="true"><path d={wallet} fill="none" stroke="#b8a1ff" strokeWidth="3" strokeDasharray="1 6"/><path d={wp} fill="none" stroke="#d8ff75" strokeWidth="9"/></svg></noscript></div>
}
