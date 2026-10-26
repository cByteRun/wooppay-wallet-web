// A quiet bridge between a digital item, wallet balance, and everyday payments.
export function EcosystemBackground() {
  return <div className="sk-ecosystem-background" aria-hidden="true">
    <svg className="sk-background-inventory" viewBox="0 0 480 640" fill="none">
      <defs><linearGradient id="inventory-light" x1="30" y1="60" x2="420" y2="590" gradientUnits="userSpaceOnUse"><stop stopColor="#b59aff" stopOpacity=".2"/><stop offset="1" stopColor="#9575ff" stopOpacity="0"/></linearGradient></defs>
      <path d="M240 40 420 180 360 440 240 590 70 420 30 190Z" fill="url(#inventory-light)" stroke="#b59aff" strokeOpacity=".22"/>
      <path d="m240 40 50 200 130-60M30 190l260 50 70 200M70 420l220-180-50 350M30 190l40 230 170 170" stroke="#b59aff" strokeOpacity=".16"/>
      <path d="m240 40-80 210 80 340M30 190l130 60 200 190" stroke="#b59aff" strokeOpacity=".09"/>
    </svg>
    <svg className="sk-background-balance" viewBox="0 0 560 760" fill="none">
      <defs><linearGradient id="balance-light" x1="80" y1="100" x2="500" y2="660" gradientUnits="userSpaceOnUse"><stop stopColor="#00efef" stopOpacity=".12"/><stop offset="1" stopColor="#00efef" stopOpacity="0"/></linearGradient></defs>
      <circle cx="350" cy="260" r="202" fill="url(#balance-light)" stroke="#00efef" strokeOpacity=".18" strokeWidth="2"/>
      <circle cx="350" cy="260" r="170" stroke="#00efef" strokeOpacity=".08"/>
      <path d="M292 217h116m-116 27h116m-58 0v95" stroke="#00efef" strokeOpacity=".2" strokeWidth="12"/>
      <path d="M350 462v72q0 30-30 30H160q-30 0-30 30v40m220-100q0 30 30 30h100" stroke="#00efef" strokeOpacity=".14" strokeWidth="2"/>
      <rect x="106" y="634" width="48" height="78" rx="10" stroke="#00efef" strokeOpacity=".2" strokeWidth="2"/>
      <path d="M122 698h16m310-151h62v40h-62zm0 12h62" stroke="#00efef" strokeOpacity=".2" strokeWidth="2"/>
    </svg>
    <div className="sk-background-vignette"/>
  </div>
}
