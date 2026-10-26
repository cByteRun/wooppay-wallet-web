'use client'
import { useTranslation } from '@/shared/lib/i18n/provider'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Pause, Play } from 'lucide-react'

export function PaymentMatrix() {
  const t = useTranslation()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let width = 1, height = 1, frame = 0, time = 0, last = 0, visible = false
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    function draw() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, width, height)
      const visual = canvas.parentElement?.querySelector('.wf-network-visual')
      const bounds = visual?.getBoundingClientRect()
      const section = canvas.getBoundingClientRect()
      const cx = bounds ? bounds.left - section.left + bounds.width / 2 : width * .72
      const cy = bounds ? bounds.top - section.top + bounds.height / 2 : height / 2
      const scale = Math.min((bounds?.width ?? width * .45) / 480, 1.5)
      const dark = document.documentElement.dataset.walletTheme === 'dark'
      const points: { x: number; y: number; z: number; radius: number; alpha: number; color: string }[] = []
      // Two open, interwoven surfaces: individual worlds sharing one space.
      // The slow deformation preserves the composition without a central axle.
      for (let world = 0; world < 2; world++) {
        for (let row = 0; row < 24; row++) {
          const v = row / 23
          for (let column = 0; column < 100; column++) {
            const u = column / 100 * Math.PI * 2
            const phase = world * Math.PI
            const angle = u + phase + time * .000035
            const breath = Math.sin(u * 3 + time * .00022 + phase) * 9
            const radius = 151 + Math.sin(v * Math.PI) * 30 + breath
            const tube = (v - .5) * 98
            const x = Math.cos(angle) * (radius + tube * Math.cos(u * 2))
            const y = Math.sin(angle) * (radius * .76 + tube * .45)
            const z = Math.sin(u * 2 + phase + time * .00008) * 62 + tube * Math.sin(u * 2)
            // Tilt each world in a different plane, opening a quiet space for P2P.
            const tilt = world === 0 ? -.48 : .52
            const offset = world === 0 ? -47 : 47
            const rx = x * Math.cos(tilt) - y * Math.sin(tilt) + offset
            const ry = x * Math.sin(tilt) + y * Math.cos(tilt) + (world === 0 ? -24 : 24)
            const perspective = 650 / (650 - z)
            const depth = (z + 110) / 220
            const edge = Math.sin(v * Math.PI)
            points.push({
              x: cx + rx * scale * perspective,
              y: cy + ry * scale * perspective,
              z,
              radius: (.65 + depth * .95) * Math.max(scale, .7),
              alpha: (.12 + depth * .52) * (.35 + edge * .65),
              color: world === 0 ? (dark ? '#b49aff' : '#7351f5') : (dark ? '#85c5ed' : '#408cba'),
            })
          }
        }
      }
      points.sort((a, b) => a.z - b.z)
      for (const point of points) {
        ctx.globalAlpha = point.alpha
        ctx.fillStyle = point.color
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width; height = entry.contentRect.height
      const ratio = Math.min(devicePixelRatio || 1, 2)
      canvas.width = width * ratio; canvas.height = height * ratio
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0); draw()
    })
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting })
    const theme = new MutationObserver(draw)
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-wallet-theme'] })
    function loop(now: number) {
      if (visible && !paused && !reduced.matches && !document.hidden) { time += Math.min(now - last, 40); draw() }
      last = now; frame = requestAnimationFrame(loop)
    }
    resize.observe(canvas); observer.observe(canvas); frame = requestAnimationFrame(loop)
    return () => { resize.disconnect(); observer.disconnect(); theme.disconnect(); cancelAnimationFrame(frame) }
  }, [paused])
  return <section className="wf-payment-matrix wf-network" aria-labelledby="wf-network-title">
    <canvas ref={canvasRef} aria-hidden="true"/>
    <div className="wf-wrap wf-network-content">
      <div className="wf-network-top"><span className="wf-network-label"><span className="wf-status"/> {t("WOOPPAY / ЭЛЕКТРОННЫЙ КОШЕЛЁК")}</span><span className="wf-network-label">{t("СОЗДАНО В КАЗАХСТАНЕ ↗")}</span></div>
      <div className="wf-network-grid">
        <div className="wf-network-copy">
          <p className="wf-network-label">{t("ОТ ЧЕЛОВЕКА К ЧЕЛОВЕКУ")}</p>
          <h2 id="wf-network-title">{t("Твой мир.")}<br/>{t("Твои люди.")}<br/><span>{t("Твой Wooppay.")}</span></h2>
          <p className="wf-network-description">{t("Делиться. Обмениваться. Быть ближе.")}<br/>{t("Электронный кошелёк, который связывает твои повседневные платежи и игровой мир.")}</p>
          <a className="wf-button" href="#flows">{t("Выбрать свой сценарий")} <ArrowUpRight size={20}/></a>
        </div>
        <div className="wf-network-visual" aria-label={t("P2P: от тебя через Wooppay к другим людям")}>
          <div className="wf-network-signal wf-network-signal-coffee"><span className="wf-network-signal-caption">{t("МАЛЕНЬКИЙ ПОВОД")}</span><p>{t("За кофе")} <span>{t("— тебе.")}</span></p><span className="wf-network-signal-trail" aria-hidden="true"/></div>
          <div className="wf-network-core"><span>{t("P2P-ПЕРЕВОДЫ")}</span><strong>P<span>2</span>P</strong><span>{t("ЛЮДИ В ЦЕНТРЕ")}</span></div>
          <div className="wf-network-signal wf-network-signal-evening"><span className="wf-network-signal-trail" aria-hidden="true"/><span className="wf-network-signal-caption">{t("ОБЩИЕ ПЛАНЫ")}</span><p>{t("На вечер")} <span>{t("— вместе.")}</span></p></div>
          <div className="wf-network-connection"><span aria-hidden="true">··· ↗</span><p>{t("Между нами")}<br/><em>{t("больше, чем переводы.")}</em></p></div>
        </div>
      </div>
      <div className="wf-network-bottom"><p>{t("Из Казахстана.")}<br/><strong>{t("С первым шагом в будущее.")}</strong></p><p>{t("Wooppay — первая зарегистрированная")}<br/>{t("платёжная организация Казахстана.")}</p><a href="#skinmarket">{t("P2P-маркет скинов CS2")} <ArrowUpRight size={18}/></a></div>
    </div>
    <button type="button" className="wf-payment-pause" aria-label={t(paused ? 'Включить фоновую анимацию' : 'Остановить фоновую анимацию')} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button>
  </section>
}
