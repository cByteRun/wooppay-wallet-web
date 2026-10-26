import Link from '@/shared/lib/i18n/link'
import { ArrowUpRight, Building2, MapPin, Send } from 'lucide-react'
import { OFFICIAL } from '@/shared/config/official-resources'
import { getTranslator } from '@/shared/lib/i18n/server'

const directions = [
  { title: 'Кошелёк для пользователей', text: 'Wooppay Wallet — электронный кошелёк в Казахстане. Мобильная связь, интернет, коммунальные услуги, пополнение зарубежных карт и цифровые сервисы доступны в приложении для iOS и Android.', href: '/features', action: 'Возможности приложения' },
  { title: 'Платежи для бизнеса', text: 'В экосистеме Wooppay есть Woopkassa — решение для приёма платежей. Банкам, интернет-магазинам и сервисам стоит начать с описания своего платёжного сценария: подключение, расчёты и условия интеграции обсуждаются с командой.', href: OFFICIAL.business, action: 'Перейти в Woopkassa' },
  { title: 'SkinMarket для CS2', text: 'SkinMarket — площадка покупки и продажи игровых предметов CS2 внутри Wooppay. Вход через Steam, каталог и история сделок объединены с кошельком. Условия передачи предмета и зачисления денег проверяйте до сделки.', href: OFFICIAL.skinmarket, action: 'Открыть SkinMarket' },
]
const materials = [
  { title: 'Оператор и реестр', text: 'ТОО «WOOPPAY» (ВУППЭЙ). На корпоративном сайте указан номер учётной регистрации платёжной организации №09-17-001. Сведения о системе электронных денег можно проверить в реестре Национального Банка Казахстана.', href: OFFICIAL.registry, action: 'Реестр Национального Банка' },
  { title: 'Документы и условия', text: 'Клиентское соглашение, правила системы электронных денег, правила SkinMarket и политики обработки персональных данных доступны в официальном разделе документов. Комиссия и лимит зависят от услуги и статуса кошелька.', href: OFFICIAL.documents, action: 'Официальные документы' },
  { title: 'Безопасность платежей', text: 'В публикации об аудите за 2025 год Wooppay сообщает о соответствии PCI DSS Level 1, версия 4.0.1. Для проверки актуального статуса и области действия аудита запросите подтверждающие документы у команды.', href: OFFICIAL.securityReport, action: 'Публикация об аудите 2025' },
]

export async function CompanyCard() {
  const t = await getTranslator()
  return <section className="wf-company wf-wrap" id="partners" aria-labelledby="company-heading">
    <p className="wf-eyebrow"><Building2 size={16} aria-hidden="true"/>{t('10 / WOOPPAY ДЛЯ БИЗНЕСА И БАНКОВ')}</p>
    <div className="wf-heading"><h2 id="company-heading">{t('Один продукт.')}<br/><span>{t('Понятный партнёр.')}</span></h2><p>{t('Платежи, цифровые сервисы и игровая экосистема в Казахстане. Знакомство с Wooppay начинается здесь.')}</p></div>
    <div className="wf-company-grid">{directions.map((item, index) => <article key={item.title}><span className="wf-partner-index">0{index + 1}<ArrowUpRight size={19}/></span><h3>{t(item.title)}</h3><p>{t(item.text)}</p><Link href={item.href} className="wf-text-link">{t(item.action)}<ArrowUpRight size={16}/></Link></article>)}</div>
    <div className="wf-company-heading"><h3>{t('Факты, которые можно проверить')}</h3><p>{t('Первоисточники для знакомства с компанией и проверки документов перед сотрудничеством.')}</p></div>
    <div className="wf-company-grid wf-company-docs">{materials.map(item => <article key={item.title}><h4>{t(item.title)}</h4><p>{t(item.text)}</p><a href={item.href} target="_blank" rel="noopener noreferrer" className="wf-text-link">{t(item.action)}<ArrowUpRight size={16}/></a></article>)}</div>
    <div className="wf-company-contact" id="partner-contact"><div><p className="wf-eyebrow">{t('ДАВАЙТЕ ОБСУДИМ ВАШ СЦЕНАРИЙ')}</p><h3>{t('Банкам, сервисам и партнёрам')}</h3><p>{t('Напишите команде Wooppay: название компании, рынок, нужный способ оплаты и предполагаемый объём операций. Это поможет обсудить подходящее решение и следующий шаг интеграции.')}</p><a className="wf-button" href={OFFICIAL.partnersEmail}>{t('Написать о сотрудничестве')}<ArrowUpRight size={18}/></a><p className="wf-company-email">marketing@wooppay.com</p></div><div><MapPin size={28} aria-hidden="true"/><h3>{t('Wooppay в Караганде')}</h3><p>{t('Офис по карточке 2ГИС: ул. Алалыкина, 12/1, БЦ «Возрождение», 3 этаж. Перед визитом уточните время и место встречи у команды.')}</p><p>{t('Адрес разработчика в Google Play: проспект Нурсултана Назарбаева, 15, Караганда. Это отдельный адрес; для визита используйте карточку офиса.')}</p><div className="wf-company-links"><a href={OFFICIAL.maps2gis} target="_blank" rel="noopener noreferrer">{t('2ГИС')} ↗</a><a href={OFFICIAL.googleMaps} target="_blank" rel="noopener noreferrer">Google Maps ↗</a><a href={OFFICIAL.telegram}>{t('Поддержка')} ↗</a></div></div></div>
    <details className="wf-map-disclosure"><summary><MapPin size={18}/>{t("Посмотреть офис на карте")}<span>+</span></summary><iframe className="wf-company-map" title={t('Карта: офис Wooppay в Караганде')} src="https://www.google.com/maps?q=Wooppay%20Alalykina%2012%2F1%20Karaganda&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen/></details>
    <p className="wf-company-source">{t('Проверено 26.10.2026. Адрес офиса — по 2ГИС; сведения о разработчике — по Google Play; регистрация и аудит — по корпоративным материалам Wooppay.')} <a href={OFFICIAL.company}>{t('Сайт компании')} ↗</a></p>
    <div className="wf-company-guides"><Link className="wf-text-link" href="/partners">{t('Партнёрам')} <ArrowUpRight size={16}/></Link><h3>{t('Ответы перед первой операцией')}</h3><div>{[['/tariffs','Тарифы и лимиты'],['/faq','Вопросы и ответы'],['/payments','Оплата услуг'],['/transfers','Пополнения'],['/skinmarket','SkinMarket CS2'],['/documents','Документы и оператор']].map(([href,label]) => <Link href={href} key={href}>{t(label)} <ArrowUpRight size={15}/></Link>)}</div><a href={OFFICIAL.skinmarketTelegram} className="wf-text-link" target="_blank" rel="noopener noreferrer"><Send size={18}/>{t('Telegram: Wooppay SkinMarket')} ↗</a></div>
  </section>
}
