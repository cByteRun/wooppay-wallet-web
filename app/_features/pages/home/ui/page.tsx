import { LanguageSwitch } from '@/shared/lib/i18n/language-switch'
import { getTranslator } from '@/shared/lib/i18n/server'
import Image from 'next/image'
import Link from 'next/link'
import localFont from 'next/font/local'
import { ArrowUpRight, ArrowDown, Smartphone, Globe2, ShieldCheck, Send, Gamepad2, Wallet, Check } from 'lucide-react'
import { pageMetadata } from '@/shared/lib/seo/metadata'
import { OFFICIAL } from '@/shared/config/official-resources'
import { StructuredData } from '@/shared/ui/structured-data'
import { DownloadGateway } from '@/features/app-download/ui/download-gateway'
import { WalletFlows, PromoReel } from './wallet-flows'
import { WalletMatrix } from './wallet-matrix'
import { ThemeSwitch } from './theme-switch'
import { WalletFacts } from './wallet-facts'
import { WalletReviews } from './wallet-reviews'
import { PaymentMatrix } from './payment-matrix'
import { WalletDialogs } from './wallet-dialogs'
import './wallet-landing.css'

export function generateMetadata() { return pageMetadata('/') }
const display = localFont({ src: '../../../../../public/fonts/exo2-variable.ttf', variable: '--wallet-display', weight: '100 900', display: 'swap' })
const body = localFont({ src: '../../../../../public/fonts/ubuntu-regular.ttf', variable: '--wallet-body', weight: '400', display: 'swap' })
const faq = [
  { question: 'Что такое Wooppay Wallet?', answer: 'Wooppay Wallet — приложение электронного кошелька для платежей, пополнений и цифровых сервисов. В нём также доступен P2P-маркет скинов CS2 SkinMarket.' },
  { question: 'Как начать пользоваться?', answer: 'Скачай Wooppay по ссылке в App Store или Google Play, зарегистрируйся и выбери нужный сервис. Для отдельных операций приложение может предложить пройти идентификацию.' },
  { question: 'Где узнать комиссии и лимиты?', answer: 'Проверь итоговую сумму, комиссию, курс и ограничения в приложении до подтверждения операции. Открой «Тарифы и лимиты» внизу сайта, чтобы перейти к действующим условиям Wooppay.' },
  { question: 'Как устроена покупка скинов?', answer: 'Подключи Steam, добавь Trade Link, выбери скин и оплати его из кошелька. Продавец передаёт предмет через Steam. Статус, период ожидания и условия расчёта отображаются в приложении.' },
  { question: 'Что делать, если перевод не прошёл?', answer: 'Проверь статус операции и обратись в поддержку: укажи номер телефона кошелька, дату, сумму и способ пополнения. Эти данные помогут найти платёж. Не передавай пароль и коды подтверждения.' },
  { question: 'Нужна ли идентификация?', answer: 'Для отдельных операций нужна идентификация. Доступный способ и требования проверяй в приложении до пополнения кошелька: они могут зависеть от статуса пользователя и выбранной операции.' },
  { question: 'Куда обратиться за помощью?', answer: 'Открой поддержку в приложении или напиши на spp@wooppay.com. Официальный Telegram поддержки — @wooppay_support. Не сообщай никому пароль и коды подтверждения.' },
]
async function Brand() {
  const t = await getTranslator()
 return <Link href="/" className="wf-brand" aria-label={t("Wooppay Wallet — главная")}><Image src="/skinmarket/woop-mark.svg" alt="" width={38} height={38}/><span>wooppay<small>WALLET</small></span></Link> }
function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="wf-eyebrow">{children}</p> }

export default async function Home() {
  const t = await getTranslator()

  return <main className={`wf-root ${display.variable} ${body.variable}`} id="top">
    <StructuredData data={{ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faq.map(item => ({ '@type': 'Question', name: t(item.question), acceptedAnswer: { '@type': 'Answer', text: t(item.answer) } })) }}/>
    <a href="#content" className="wf-skip">{t("К содержимому")}</a>
    <header className="wf-header wf-wrap"><Brand/><nav aria-label={t("Главная навигация")}><a href="#possibilities">{t("Возможности")}</a><a href="#flows">{t("Как пользоваться")}</a><a href="#trust">{t("Безопасность")}</a><a href="#faq">{t("Помощь")}</a></nav><div className="wf-header-actions"><a className="wf-nav-cta" href="#download">{t("Скачать приложение")} <ArrowUpRight size={16}/></a><LanguageSwitch/><ThemeSwitch/></div></header>
    <section className="wf-hero wf-wrap" id="content"><div className="wf-hero-copy"><Eyebrow><span className="wf-status"/> {t("КОШЕЛЁК ДЛЯ ТВОЕЙ ЖИЗНИ")}</Eyebrow><h1>{t("Всё твоё.")}<br/><span>{t("В одном")}</span><br/>Wooppay<span className="wf-period">.</span></h1><p className="wf-lead">{t("Деньги, игры и повседневные дела.")}<br/>{t("Один кошелёк, чтобы быть в своём ритме.")}</p><div className="wf-hero-actions"><a className="wf-button" href="#download">{t("Забрать свой Wooppay")} <ArrowUpRight size={20}/></a><a className="wf-text-link" href="#flows">{t("Посмотреть, как работает")} <ArrowDown size={16}/></a></div><div className="wf-hero-meta"><span><Check size={14}/> {t("iOS и Android")}</span><span>{t("СОЗДАНО ДЛЯ КАЗАХСТАНА")} <span className="wf-kz">KZ</span></span></div></div><div className="wf-hero-art"><WalletMatrix/><div className="wf-hero-phone"><Image src="/wallet/screen-7.webp" width={302} height={537} alt={t("Главный экран Wooppay: баланс, сервисы и пополнение")} priority sizes="(max-width: 700px) 230px, 302px"/></div><div className="wf-float wf-float-balance"><Wallet size={18}/><span><small>{t("ТВОЙ ЭЛЕКТРОННЫЙ КОШЕЛЁК")}</small>{t("Планы? На балансе.")}</span><ArrowUpRight size={18}/></div><div className="wf-float wf-float-game"><Gamepad2 size={22}/><span>{t("Из игры.")}<br/><strong>{t("В жизнь.")}</strong></span></div><div className="wf-art-caption">{t("₸ / ПЛАТИ · ПОПОЛНЯЙ · ИГРАЙ")}</div></div></section>
    <WalletDialogs/>
    <PaymentMatrix/>
    <WalletReviews/>
    <section className="wf-possibilities wf-wrap" id="possibilities"><div className="wf-heading"><div><h2>{t("Жизнь разная.")}<br/><span>{t("Кошелёк один.")}</span></h2></div><p>{t("Для утренних планов, вечерних каток")}<br/>{t("и людей, которые всегда рядом.")}</p></div><div className="wf-bento"><Link href="#info-payments" className="wf-service wf-service-daily"><span className="wf-card-index">{t("КАЖДЫЙ ДЕНЬ")} <ArrowUpRight/></span><div className="wf-daily-art" aria-hidden="true"><div><Smartphone/><span>{t("Связь")}</span></div><div><Globe2/><span>{t("Интернет")}</span></div><div><Wallet/><span>{t("Услуги")}</span></div></div><h3>{t("На связи.")}<br/>{t("Без лишних движений.")}</h3><p>{t("Мобильная связь, интернет и коммунальные услуги — оплачивай из приложения.")}</p></Link><Link href="#info-transfers" className="wf-service wf-service-world"><span className="wf-card-index">{t("БЛИЖЕ, ЧЕМ КАЖЕТСЯ")} <ArrowUpRight/></span><div className="wf-world-art" aria-hidden="true"><div>₸</div><span>·····················</span><div>↗</div></div><h3>{t("Расстояние есть.")}<br/>{t("Близость остаётся.")}</h3><p>{t("Пополняй зарубежные карты и кошельки. Проверяй направление, курс и сумму до отправки.")}</p></Link><Link href="#info-features" className="wf-service wf-service-play"><span className="wf-card-index">{t("ТВОЙ DIGITAL")} <ArrowUpRight/></span><Gamepad2 className="wf-game-art" strokeWidth={1}/><div><h3>{t("Ещё один уровень.")}<br/>{t("Ещё больше твоего.")}</h3><p>{t("Игровые пополнения и цифровые сервисы. Всё, что делает свободное время твоим.")}</p></div><span className="wf-play-label">{t("ИГРАЙ ПО-СВОЕМУ ↗")}</span></Link></div></section>
    <WalletFacts/>
    <section className="wf-skin" id="skinmarket"><div className="wf-wrap wf-skin-grid"><div><h2>{t("Твой скин.")}<br/>{t("Твой стиль.")}<br/><span>{t("Твой ход.")}</span></h2><p className="wf-lead">{t("Покупай и продавай скины CS2.")}<br/>{t("Из игрового инвентаря — в баланс кошелька.")}</p><div className="wf-zero"><strong>0<span>%</span></strong><p>{t("КОМИССИЯ")}<br/>{t("ПРОДАВЦА SKINMARKET")}</p></div><a href="#flows" className="wf-button">{t("Пройти путь сделки")} <ArrowUpRight size={20}/></a><p className="wf-fine">{t("Условия сделки, идентификации и расчёта проверяй в приложении. Срок передачи и ожидания зависит от правил Steam.")}</p></div><div className="wf-skin-art"><span className="wf-skin-ring"/><Image className="wf-skin-knife" src="/skinmarket/originals/tiger-tooth.png" alt={t("Скин ножа CS2 Tiger Tooth")} width={650} height={650} sizes="(max-width: 700px) 90vw, 600px"/><div className="wf-skin-ticket"><span>{t("ИНВЕНТАРЬ CS2")}</span><strong>{t("СКИН → ₸")}</strong><small>{t("ТВОЯ ИГРА. ТВОЙ БАЛАНС.")}</small></div><div className="wf-skin-path"><span>STEAM</span><i>↔</i><span>SKINMARKET</span><i>↔</i><span>WOOPPAY</span></div></div></div></section>
    <section className="wf-flows wf-wrap" id="flows"><div className="wf-heading"><div><h2>{t("Всё начинается")}<br/><span>{t("с одного действия.")}</span></h2></div><p>{t("Выбирай сценарий и проходи шаг за шагом.")}<br/>{t("Так это выглядит в самом приложении.")}</p></div><WalletFlows/></section>
    <section className="wf-showcase"><div className="wf-wrap"><div className="wf-heading"><div><h2>{t("Твоя жизнь.")}<br/><span>{t("Семь ракурсов.")}</span></h2></div><p>{t("Листай возможности.")}<br/>{t("Находи то, что нужно именно тебе.")}</p></div><PromoReel/></div></section>
    <section className="wf-trust wf-wrap" id="trust"><div className="wf-trust-art" aria-hidden="true"><div className="wf-shield"><ShieldCheck strokeWidth={1}/></div><span>{t("НА СВЯЗИ. ПОД ЗАЩИТОЙ.")}</span><div className="wf-trust-dots"/></div><div><h2>{t("Твой кошелёк.")}<br/><span>{t("Твои правила.")}</span></h2><div className="wf-trust-row"><ShieldCheck/><div><h3>{t("Проверяй перед подтверждением")}</h3><p>{t("Итоговая сумма, комиссия и условия операции — в приложении до оплаты.")}</p></div></div><div className="wf-trust-row"><Smartphone/><div><h3>{t("Береги доступ к своему")}</h3><p>{t("Не передавай пароль и коды подтверждения. Устанавливай приложение из официальных магазинов.")}</p></div></div><div className="wf-trust-row"><Send/><div><h3>{t("Помощь рядом")}</h3><p>{t("Поддержка в приложении, по почте и в официальном Telegram.")}</p></div></div><Link href="#info-security" className="wf-text-link">{t("Подробнее о безопасности")} <ArrowUpRight size={18}/></Link></div></section>
    <section className="wf-faq wf-wrap" id="faq"><div><h2>{t("Давай")}<br/><span>{t("разберёмся.")}</span></h2><Link href="#info-faq" className="wf-text-link">{t("Все вопросы и инструкции")} <ArrowUpRight size={17}/></Link></div><div>{faq.map(item => <details key={item.question}><summary>{t(item.question)}<span>+</span></summary><p>{t(item.answer)}</p></details>)}</div></section>
    <section className="wf-partners wf-wrap"><div><Eyebrow>{t("ДЛЯ БИЗНЕСА И ПАРТНЁРОВ")}</Eyebrow><h3>{t("Больше возможностей. Вместе.")}</h3><p>{t("Познакомьтесь с компанией и решениями Wooppay для приёма платежей.")}</p></div><a className="wf-outline-button" href={OFFICIAL.business}>{t("Обсудить сотрудничество")} <ArrowUpRight size={18}/></a></section>
    <section className="wf-download" id="download"><div className="wf-wrap"><h2>{t("Планы меняются.")}<br/><span>{t("Wooppay с тобой.")}</span></h2><p>{t("Скачай приложение. Остальное — в твоём ритме.")}</p><DownloadGateway variant="landing"/><div className="wf-download-bottom"><Brand/><a href={OFFICIAL.telegram}>{t("Поддержка в Telegram")} <ArrowUpRight size={16}/></a><a href="#top">{t("Вернуться наверх ↑")}</a></div></div></section>
  </main>
}
