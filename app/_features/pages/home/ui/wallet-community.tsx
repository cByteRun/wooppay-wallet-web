import { ArrowUpRight, Camera, Send, Gamepad2, Globe2 } from 'lucide-react'
import { OFFICIAL } from '@/shared/config/official-resources'
import { getTranslator } from '@/shared/lib/i18n/server'

const channels = [
  { icon: Send, href: OFFICIAL.walletTelegram, tag: '01 / TELEGRAM', title: 'В своём ритме.', text: 'Канал Wooppay Wallet. Новости приложения и обновления — в твоей ленте.', action: 'Читать канал' },
  { icon: Camera, href: OFFICIAL.instagram, tag: '02 / INSTAGRAM', title: 'Ближе к жизни.', text: 'Wooppay в Instagram: новости кошелька и публикации команды.', action: '@wp_wallet' },
  { icon: Gamepad2, href: OFFICIAL.skinmarketTelegram, tag: '03 / SKINMARKET', title: 'В своей игре.', text: 'Отдельный канал SkinMarket: всё о площадке скинов CS2 в Wooppay.', action: 'Войти в комьюнити' },
]
export async function WalletCommunity() {
  const t = await getTranslator()
  return <section className="wf-community wf-wrap" id="community" aria-labelledby="community-title"><p className="wf-eyebrow"><span className="wf-status"/>{t('08 / ОСТАЁМСЯ НА СВЯЗИ')}</p><div className="wf-heading"><h2 id="community-title">{t('Твой круг.')}<br/><span>{t('Твой Wooppay.')}</span></h2><p>{t('Приложение — для дел. Соцсети — чтобы быть в курсе. Поддержка — когда нужна помощь.')}</p></div><div className="wf-community-grid">{channels.map(item => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="wf-community-card"><span className="wf-card-index">{item.tag}<ArrowUpRight size={17}/></span><item.icon className="wf-community-symbol" size={45} strokeWidth={1.1}/><h3>{t(item.title)}</h3><p>{t(item.text)}</p><span className="wf-text-link">{t(item.action)}<ArrowUpRight size={16}/></span></a>)}</div><div className="wf-community-note"><Globe2 size={18}/><p>{t('Нужны условия конкретной операции? Начни с FAQ и действующих документов. Для вопроса по своему платежу переходи в поддержку.')}</p><a href="#faq">FAQ <ArrowUpRight size={16}/></a></div></section>
}
