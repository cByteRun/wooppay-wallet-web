import Image from 'next/image'
import inventory from '../../../../../public/skinmarket/originals/inventory.png'

export function TradeArt() {
  return <Image src={inventory} alt="Инвентарь CS2 в Steam" unoptimized style={{ width: '100%', height: 'auto' }}/>
}
