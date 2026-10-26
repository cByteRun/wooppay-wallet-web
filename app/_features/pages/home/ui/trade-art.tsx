/** Resolution-independent artwork: all surfaces, dots and the skin are SVG paths. */
export function TradeArt() {
  return <div className="sk-trade-art">
    <svg viewBox="0 0 620 720" role="img" aria-labelledby="trade-art-title trade-art-desc">
      <title id="trade-art-title">Твой скин превращается в тенге. Комиссия продавца — 0%.</title>
      <desc id="trade-art-desc">Пример сделки: продажа скина за 45 000 тенге, комиссия 0 тенге, зачисление 45 000 тенге в Wooppay.</desc>
      <defs>
        <pattern id="trade-grid" width="16" height="16" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="#7b86ad" opacity=".3"/></pattern>
        <pattern id="trade-dots" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="3.5" cy="3.5" r="2.15" fill="#73fff0"/></pattern>
        <linearGradient id="trade-blade" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e5ddff"/><stop offset=".3" stopColor="#a785ff"/><stop offset=".58" stopColor="#6245c5"/><stop offset=".8" stopColor="#00d8dd"/><stop offset="1" stopColor="#c5ffff"/></linearGradient>
        <linearGradient id="trade-panel" x2="1" y2="1"><stop stopColor="#303447"/><stop offset="1" stopColor="#1b1e30"/></linearGradient>
        <linearGradient id="trade-trail" x2="0" y2="1"><stop stopColor="#a68aff"/><stop offset="1" stopColor="#00efdc"/></linearGradient>
        <filter id="trade-shadow" x="-30%" y="-30%" width="170%" height="180%"><feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#080a18" floodOpacity=".55"/></filter>
      </defs>
      <rect x="10" y="32" width="600" height="640" rx="28" fill="url(#trade-grid)"/>
      <g fill="none" stroke="#7d87a0" strokeOpacity=".4"><path d="M12 70V34h36M572 34h36v36M12 632v36h36M572 668h36v-36"/><ellipse cx="306" cy="337" rx="274" ry="216" strokeDasharray="2 10" transform="rotate(-24 306 337)"/></g>
      <g fontFamily="monospace" fontSize="11" letterSpacing="2" fill="#afb9d2"><text x="32" y="18">INVENTORY → REAL MONEY</text><text x="588" y="18" textAnchor="end">KZ / 001</text></g>
      <path className="sk-deal-trail" d="M177 300C12 405 374 348 475 430S577 560 410 588" fill="none" stroke="url(#trade-trail)" strokeWidth="3" strokeDasharray="2 10" strokeLinecap="round"/>
      <g transform="translate(46 100) rotate(-10 150 160)" filter="url(#trade-shadow)">
        <rect width="288" height="332" rx="22" fill="url(#trade-panel)" stroke="#68638f"/>
        <rect x="16" y="16" width="256" height="222" rx="12" fill="#161a2a"/>
        <rect x="16" y="16" width="256" height="222" rx="12" fill="url(#trade-grid)"/>
        <path d="M35 207 252 46M35 47l217 160" stroke="#9575ff" strokeOpacity=".16"/>
        <text x="30" y="40" fontFamily="monospace" fontSize="10" letterSpacing="2" fill="#bbabff">★ CS2 / SKIN</text>
        <g transform="translate(47 51) scale(.7)">
          <path d="M221 9C253 117 215 190 120 196L91 180C161 161 190 124 188 65Z" fill="url(#trade-blade)" stroke="#d5caff" strokeWidth="2"/>
          <path d="M221 9C233 113 204 164 120 196" fill="none" stroke="#c8fffa" strokeWidth="3"/>
          <path d="m94 173 29 22-19 20-16-7-15 18-16-7-14 20-19-9 10-26 29-18Z" fill="#373c54" stroke="#8f96ad" strokeWidth="3"/>
          <path d="M25 218C-9 208-27 247-6 265c25 22 56-4 41-26" fill="none" stroke="#929bb6" strokeWidth="13"/>
          <path d="m77 193 15 10m-32 9 13 9m-29 5 11 8" stroke="#0ce8df" strokeWidth="3"/>
        </g>
        <rect x="30" y="207" width="88" height="20" rx="10" fill="#9575ff" fillOpacity=".2"/><text x="74" y="221" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#c6b6ff">ИЗ ИНВЕНТАРЯ</text>
        <text x="23" y="265" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700" fill="#fff">Твой следующий трейд</text>
        <text x="23" y="291" fontFamily="Arial,sans-serif" fontSize="13" fill="#b5bfd8">Скин CS2 · пример продажи</text>
        <text x="23" y="318" fontFamily="Arial,sans-serif" fontSize="22" fontWeight="700" fill="#fff">45 000 ₸</text><circle cx="253" cy="308" r="13" fill="#00efdf"/><path d="m248 308 4 4 7-8" fill="none" stroke="#12313b" strokeWidth="2"/>
      </g>
      <g transform="translate(330 92)">
        <text x="0" y="0" fill="#c9d1e7" fontFamily="monospace" fontSize="11" letterSpacing="1.2">КОМИССИЯ ПРОДАВЦА</text>
        <g fill="url(#trade-dots)"><path d="M10 29H76L90 43V143L76 157H10L-4 143V43ZM23 52V134H63V52Z" fillRule="evenodd"/><path d="m105 151 71-122h22l-71 122ZM108 29h30v38h-30Zm10 10v18h10V39Zm49 74h30v38h-30Zm10 10v18h10v-18Z" fillRule="evenodd"/></g>
        <text x="-3" y="195" fill="#f3f7ff" fontFamily="Arial,sans-serif" fontSize="20" fontWeight="700">Вся сумма — тебе.</text>
        <path d="M0 218h185" stroke="#00efdf" strokeOpacity=".4"/><text x="0" y="242" fill="#aab6ce" fontFamily="monospace" fontSize="11">SELLER FEE: 0 ₸</text>
      </g>
      <g transform="translate(156 449) rotate(3 200 100)" filter="url(#trade-shadow)">
        <path d="M0 20Q0 0 20 0H390Q410 0 410 20V185L400 192 390 185 380 192 370 185 360 192 350 185 340 192 330 185 320 192 310 185 300 192 290 185 280 192 270 185 260 192 250 185 240 192 230 185 220 192 210 185 200 192 190 185 180 192 170 185 160 192 150 185 140 192 130 185 120 192 110 185 100 192 90 185 80 192 70 185 60 192 50 185 40 192 30 185 20 192 10 185 0 192Z" fill="#bcfff1"/>
        <circle cx="37" cy="34" r="13" fill="#143b40"/><path d="m31 34 4 4 8-9" fill="none" stroke="#bcfff1" strokeWidth="2"/>
        <text x="61" y="39" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="15" fill="#143b40">Скин продан. Деньги — твои.</text>
        <text x="24" y="104" fontFamily="Arial,sans-serif" fontWeight="700" fontSize="54" letterSpacing="-2" fill="#11373e">+45 000 ₸</text>
        <path d="M24 126H386" stroke="#143b40" strokeOpacity=".25" strokeDasharray="4 4"/>
        <text x="24" y="155" fontFamily="Arial,sans-serif" fontSize="14" fill="#24565a">На кошелёк Wooppay</text><text x="386" y="155" textAnchor="end" fontFamily="monospace" fontWeight="700" fontSize="13" fill="#143b40">KZT ↗</text>
      </g>
      <g fontFamily="monospace" fontSize="10" fill="#aeb9d0"><text x="32" y="702">STEAM → SKINMARKET → WOOPPAY</text><text x="588" y="702" textAnchor="end">СУММА — ПРИМЕР</text></g>
    </svg>
  </div>
}
