import { UserRound } from 'lucide-react'

export function P2PFlow() {
  return <div className="sk-p2p" aria-label="P2P-обмен: продавец передаёт скин покупателю через Steam, оплата в тенге поступает продавцу через Wooppay после завершения сделки">
    <div className="sk-p2p-person"><UserRound size={21} aria-hidden="true"/><span>Продавец<small>Твой инвентарь</small></span></div>
    <div className="sk-p2p-routes">
      <span className="sk-p2p-skin">Скин <small>через Steam</small><b aria-hidden="true">→</b></span>
      <span className="sk-p2p-cash"><b aria-hidden="true">←</b> Тенге <small>через Wooppay</small></span>
    </div>
    <div className="sk-p2p-person"><UserRound size={21} aria-hidden="true"/><span>Покупатель<small>Твой следующий трейд</small></span></div>
    <p>P2P / СДЕЛКА МЕЖДУ ИГРОКАМИ</p>
  </div>
}
