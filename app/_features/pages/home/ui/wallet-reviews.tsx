import { getLocale, getTranslator } from '@/shared/lib/i18n/server'
import { ArrowLeft, ArrowRight, ArrowUpRight, Quote } from 'lucide-react'

const reviews = [
  { name: 'appleuserfromkz', initials: 'AP', date: '2022-12-06', label: '06.12.2022', title: 'Все круто!', text: 'Полезное приложение, был приятно удивлен, когда узнал что оно казахстанское.', tone: 'purple', source: 'APP STORE' },
  { name: 'Руслан Абильдин', initials: 'РА', date: '2025-04-15', label: '15.04.2025', text: 'лучший способ не запариваясь пополнять PSN аккаунт. И не только, на самом деле. А ещё там игры из Стима, которых в Стиме не купить. И оплатить много чего можно', tone: 'purple' },
  { name: 'Bogdan Shmatov', initials: 'BS', date: '2022-12-18', label: '18.12.2022', text: 'Пользуюсь на iOS, классное приложение. Рекомендую. Плавно работает, так и хочется нажимать на кнопку "оплатить". Много новых сервисов и акций ещё и cash back есть.', tone: 'blue' },
  { name: 'Mansur Mahmadov', initials: 'MM', date: '2026-05-04', label: '04.05.2026', text: 'Для меня очень полезно', tone: 'green' },
  { name: 'A Google user', initials: 'G', date: '2018-10-11', label: '11.10.2018', text: 'Хороший, надежный сервис. Неужели) app вышел)', tone: 'purple' },
]

export async function WalletReviews() {
  const [t, locale] = await Promise.all([getTranslator(), getLocale()])
  return <section className="wf-reviews" aria-labelledby="reviews-heading">
    <div className="wf-wrap">
      <div className="wf-reviews-meta"><p className="wf-eyebrow"><span className="wf-status"/>{t('ОТЗЫВЫ ПОЛЬЗОВАТЕЛЕЙ')}</p><span>WOOPPAY APP / RATINGS & REVIEWS</span></div>
      <div className="wf-reviews-intro">
        <div><h2 id="reviews-heading">{t('У каждого свой ритм.')}<br/><span>{t('И свой Wooppay.')}</span></h2><p>{t('Платят, играют, делятся впечатлениями.')}<br/>{t('Отзывы о Wooppay App из App Store и Google Play.')}</p><a href="#download" className="wf-text-link">{t('Забрать свой Wooppay')}<ArrowUpRight size={18}/></a></div>
        <div className="wf-reviews-rating">
          <div className="wf-rating-caption"><span>WOOPPAY APP</span><span>APP STORE</span></div>
          <div className="wf-rating-value"><span className="wf-dot-rating">4.4</span><span>/ 5</span></div>
          <div className="wf-rating-bottom"><span className="wf-rating-stars" aria-label={t('4,4 из 5 звёзд')}><span aria-hidden="true">★★★★★</span></span><span>{t('333 оценки')}</span></div>
          <p>{t('По данным предоставленной подборки отзывов')}</p>
        </div>
      </div>
      <div className="wf-reviews-toolbar"><span>{t('ХОРОШИЕ СЛОВА. РЕАЛЬНЫЙ ОПЫТ.')} <span className="wf-review-count">05</span></span><span>{t('Листайте отзывы')} <ArrowLeft size={15} aria-hidden="true"/><ArrowRight size={15} aria-hidden="true"/></span></div>
      <div className="wf-reviews-grid" tabIndex={0} role="region" aria-label={t('Отзывы пользователей — горизонтальная прокрутка')}>
        {reviews.map((review, index) => <figure className={`wf-review wf-review-${review.tone}`} key={review.name}>
          <div className="wf-review-top"><span className="wf-review-number">0{index + 1}<span aria-hidden="true"> /</span></span><Quote size={23} strokeWidth={1.5} aria-hidden="true"/></div>
          {'title' in review && <h3>{t(review.title)}</h3>}
          <blockquote lang={locale}>{t(review.text)}</blockquote>
          <figcaption><span className="wf-review-avatar" aria-hidden="true">{t(review.initials)}</span><span><strong>{t(review.name)}</strong><time dateTime={review.date}>{review.label}</time></span><span className="wf-review-source">{'source' in review ? review.source : 'GOOGLE PLAY'}</span></figcaption>
        </figure>)}
      </div>
    </div>
  </section>
}
