'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, ArrowRight, Pause, Play } from 'lucide-react'

export function PaymentMatrix() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [paused, setPaused] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return
    let width = 1, height = 1, frame = 0, time = 0, last = 0, visible = false
    const reduced = matchMedia('(prefers-reduced-motion: reduce)')
    function draw() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)
      const scale = Math.min(width / 760, 1.65)
      const morph = (1 - Math.cos(time * .00045)) / 2
      const dark = document.documentElement.dataset.walletTheme === 'dark'
      for (let i = 0; i < 1200; i++) {
        const u = (i % 60) / 59, v = Math.floor(i / 60) / 19
        const angle = u * Math.PI * 2 + time * .0001
        const radius = 82 + v * 37
        const ringX = Math.cos(angle) * radius
        const ringY = Math.sin(angle) * radius * .64
        // A torus unfolds into the rounded outline and clasp of a wallet.
        const edge = u * 4, side = Math.floor(edge), t = edge % 1
        const x = side === 0 ? -110 + t * 220 : side === 1 ? 110 : side === 2 ? 110 - t * 220 : -110
        const y = side === 0 ? -65 : side === 1 ? -65 + t * 130 : side === 2 ? 65 : 65 - t * 130
        const wx = x * (.79 + v * .21), wy = y * (.79 + v * .21)
        const px = width * .7 + (ringX * (1 - morph) + wx * morph) * scale
        const py = height / 2 + (ringY * (1 - morph) + wy * morph) * scale
        ctx.fillStyle = i % 3 ? (dark ? '#b49aff' : '#7351f5') : (dark ? '#7abaff' : '#3665ff')
        ctx.globalAlpha = .25 + v * .55
        ctx.beginPath(); ctx.arc(px, py, 1.15 * Math.max(scale, .65), 0, Math.PI * 2); ctx.fill()
      }
      for (let route = 0; route < 6; route++) {
        const direction = route < 3 ? -1 : 1
        const lane = route % 3 - 1
        for (let i = 0; i < 65; i++) {
          const progress = (i / 65 + time * .00007) % 1
          const x = width * .7 + direction * (140 * scale + progress * width * .46)
          const y = height / 2 + lane * (30 + progress * 65) + Math.sin(progress * Math.PI * 2 + time * .001) * 9
          ctx.globalAlpha = Math.sin(progress * Math.PI) * .65
          ctx.fillStyle = route % 2 ? '#7351f5' : '#5799ff'
          ctx.beginPath(); ctx.arc(x, y, i % 9 === 0 ? 2.5 : 1.2, 0, Math.PI * 2); ctx.fill()
        }
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
      <div className="wf-network-top"><span className="wf-network-label"><span className="wf-status"/> WOOPPAY / E-WALLET</span><span className="wf-network-label">СОЗДАНО В КАЗАХСТАНЕ ↗</span></div>
      <div className="wf-network-grid">
        <div className="wf-network-copy">
          <p className="wf-network-label">ОТ ЧЕЛОВЕКА К ЧЕЛОВЕКУ</p>
          <h2 id="wf-network-title">Твой мир.<br/>Твои люди.<br/><span>Твой Wooppay.</span></h2>
          <p className="wf-network-description">Делиться. Обмениваться. Быть ближе.<br/>Электронный кошелёк, который связывает твои повседневные платежи и игровой мир.</p>
          <a className="wf-button" href="#flows">Выбрать свой сценарий <ArrowUpRight size={20}/></a>
        </div>
        <div className="wf-network-visual" aria-label="P2P: от тебя через Wooppay к другим людям">
          <span className="wf-network-orbit" aria-hidden="true"/>
          <div className="wf-network-person wf-network-you"><span>01 / ОТПРАВИТЕЛЬ</span><strong>Ты</strong><span>ТВОИ ПЛАНЫ ↗</span></div>
          <div className="wf-network-core"><span>PEER TO PEER</span><strong>P<span>2</span>P</strong><span>ЛЮДИ В ЦЕНТРЕ</span></div>
          <div className="wf-network-person wf-network-friend"><span>02 / ПОЛУЧАТЕЛЬ</span><strong>Твои люди</strong><span>БЛИЖЕ С WOOPPAY ↗</span></div>
          <span className="wf-network-route">ТЫ <ArrowRight size={16}/> WOOPPAY <ArrowRight size={16}/> ТВОЙ МИР</span>
        </div>
      </div>
      <div className="wf-network-bottom"><p>Из Казахстана.<br/><strong>С первым шагом в будущее.</strong></p><p>Wooppay — первая зарегистрированная<br/>платёжная организация Казахстана.</p><a href="#skinmarket">P2P-маркет скинов CS2 <ArrowUpRight size={18}/></a></div>
    </div>
    <button type="button" className="wf-payment-pause" aria-label={paused ? 'Включить фоновую анимацию' : 'Остановить фоновую анимацию'} aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? <Play size={15}/> : <Pause size={15}/>}</button>
  </section>
}
