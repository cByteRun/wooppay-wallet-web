import { getTranslator } from '@/shared/lib/i18n/server'
import Image from 'next/image'
import inventory from '../../../../../public/skinmarket/originals/inventory.png'

export async function TradeArt() {
  const t = await getTranslator()

  return <Image src={inventory} alt={t("Инвентарь CS2 в Steam")} unoptimized style={{ width: '100%', height: 'auto' }}/>
}
