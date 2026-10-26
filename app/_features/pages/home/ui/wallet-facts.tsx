import { ArrowUpRight, Calculator, ListFilter, History } from 'lucide-react'
import { getTranslator } from '@/shared/lib/i18n/server'
import { walletEvidence } from './wallet-evidence'

const features = [
  { icon: Calculator, number: '01', tag: 'ДО ПЕРЕВОДА', title: 'Сначала посчитай.', text: 'Калькулятор показывает курс и сумму зачисления до подтверждения. Сравни условия и выбери подходящее направление.', link: '#info-transfers', action: 'О переводах' },
  { icon: ListFilter, number: '02', tag: 'ДО ПОКУПКИ', title: 'Найди свой предмет.', text: 'В SkinMarket есть фильтры и сортировка. Сравни предложения скинов CS2 и выбери то, что подходит тебе.', link: '#skinmarket', action: 'К SkinMarket' },
  { icon: History, number: '03', tag: 'ПОСЛЕ СДЕЛКИ', title: 'Вернись к деталям.', text: 'История сделок SkinMarket помогает вернуться к своим операциям. Авторизация Steam доступна внутри приложения.', link: '#flows', action: 'Посмотреть шаги' },
]

export async function WalletFacts() {
  const t = await getTranslator()
  const metrics = [
    { value: walletEvidence.google.downloads, label: 'скачиваний в Google Play', source: 'GOOGLE PLAY', url: walletEvidence.google.url },
    { value: walletEvidence.google.rating, label: 'из 5 в Google Play', source: 'GOOGLE PLAY / US', url: walletEvidence.google.url },
    { value: walletEvidence.apple.rating, label: 'из 5 в App Store', source: 'APP STORE / KZ', url: walletEvidence.apple.url },
  ]
  return <section className="wf-facts" aria-labelledby="facts-heading">
    <div className="wf-wrap">
      <p className="wf-eyebrow"><span className="wf-status"/>{t('В ЦИФРАХ И ДЕТАЛЯХ')}</p>
      <div className="wf-heading"><h2 id="facts-heading">{t('За цифрами —')}<br/><span>{t('твои возможности.')}</span></h2><p>{t('От первой проверки суммы')}<br/>{t('до истории твоих сделок.')}</p></div>
      <div className="wf-facts-metrics">{metrics.map(metric => <a href={metric.url} target="_blank" rel="noreferrer" className="wf-fact-metric" key={metric.label}>
        <span className="wf-fact-source">{metric.source}<ArrowUpRight size={15} aria-hidden="true"/></span>
        <strong className="wf-dot-rating">{metric.value}</strong><span>{t(metric.label)}</span>
      </a>)}</div>
      <div className="wf-facts-date"><span>{t('Данные магазинов на')} <time dateTime={walletEvidence.checkedAt}>{walletEvidence.checkedLabel}</time></span><span>{t('Скачивания — не число активных пользователей. Рейтинги площадок считаются отдельно.')}</span></div>
      <div className="wf-facts-features">{features.map(feature => <article key={feature.number}>
        <div className="wf-fact-feature-top"><span>{feature.number} / {t(feature.tag)}</span><feature.icon size={24} strokeWidth={1.4} aria-hidden="true"/></div>
        <h3>{t(feature.title)}</h3><p>{t(feature.text)}</p><a className="wf-text-link" href={feature.link}>{t(feature.action)}<ArrowUpRight size={16} aria-hidden="true"/></a>
      </article>)}</div>
      <p className="wf-facts-note">{t('Функции — по описанию разработчика в магазинах приложений. Доступность и условия операции проверяй в приложении.')} <a href={walletEvidence.google.url} target="_blank" rel="noreferrer">{t('Описание приложения')} ↗</a></p>
    </div>
  </section>
}
