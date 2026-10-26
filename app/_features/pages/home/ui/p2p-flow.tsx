import { getTranslator } from '@/shared/lib/i18n/server'
import { UserRound } from 'lucide-react'

export async function P2PFlow() {
  const t = await getTranslator()

  return <div className="sk-p2p" aria-label={t("P2P-обмен: продавец передаёт скин покупателю через Steam, оплата в тенге поступает продавцу через Wooppay после завершения сделки")}>
    <div className="sk-p2p-person"><UserRound size={21} aria-hidden="true"/><span>{t("Продавец")}<small>{t("Твой инвентарь")}</small></span></div>
    <div className="sk-p2p-routes">
      <span className="sk-p2p-skin">{t("Скин")} <small>{t("через Steam")}</small><b aria-hidden="true">→</b></span>
      <span className="sk-p2p-cash"><b aria-hidden="true">←</b> {t("Тенге")} <small>{t("через Wooppay")}</small></span>
    </div>
    <div className="sk-p2p-person"><UserRound size={21} aria-hidden="true"/><span>{t("Покупатель")}<small>{t("Твой следующий трейд")}</small></span></div>
    <p>{t("P2P / СДЕЛКА МЕЖДУ ИГРОКАМИ")}</p>
  </div>
}
