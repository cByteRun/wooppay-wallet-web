import Image from 'next/image'
import Link from '@/shared/lib/i18n/link'
import { ArrowUpRight, Check, Link2, Wallet } from 'lucide-react'
import { getTranslator } from '@/shared/lib/i18n/server'
const steps = [
  { icon: Link2, number: '01', title: 'Сначала — твой Steam.', text: 'Открой SkinMarket в Wooppay, подключи Steam и укажи Trade Link. Проверь требования к идентификации до сделки.', tag: 'STEAM → SKINMARKET' },
  { icon: Check, number: '02', title: 'Потом — твой выбор.', text: 'Найди предмет в каталоге или выставь свой на продажу. Сравни характеристики, цену и итоговую сумму перед подтверждением.', tag: 'ВЫБОР → СДЕЛКА' },
  { icon: Wallet, number: '03', title: 'Дальше — по статусу.', text: 'Передача предмета проходит через Steam. Проверь обмен, период ожидания и статус расчёта в приложении: сделка не заканчивается одним нажатием.', tag: 'STEAM → WOOPPAY' },
]
export async function SkinStory() {
  const t = await getTranslator()
  return <section className="wf-skin-story" aria-labelledby="skin-story-title"><div className="wf-wrap wf-story-grid"><div className="wf-story-sticky"><p className="wf-eyebrow">{t('04 / ИЗ ИГРЫ В ЖИЗНЬ')}</p><h2 id="skin-story-title">{t('За каждым скином —')}<br/><span>{t('свой путь.')}</span></h2><div className="wf-story-object"><Image src="/skinmarket/originals/tiger-tooth.png" alt={t('Скин ножа CS2 Tiger Tooth')} width={420} height={420} sizes="(max-width: 760px) 80vw, 380px"/><span>CS2 / P2P / ₸</span></div><Link href="/skinmarket" className="wf-text-link">{t('Подробнее о SkinMarket')}<ArrowUpRight size={17}/></Link></div><div className="wf-story-steps">{steps.map(step => <article key={step.number}><div className="wf-story-top"><span>{step.number} / 03</span><step.icon size={24}/></div><h3>{t(step.title)}</h3><p>{t(step.text)}</p><span className="wf-story-tag">{t(step.tag)}</span></article>)}</div></div></section>
}
