'use client'
import { useTranslation } from '@/shared/lib/i18n/provider'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { X, ArrowUpRight } from 'lucide-react'
import { serviceContent, faqItems } from '@/entities/wallet/model/content'
import { OFFICIAL } from '@/shared/config/official-resources'
import { skinFaq } from './landing-content'

const extra = {
  faq: { title: 'Вопросы и ответы', answer: 'Всё перед первым трейдом.', steps: skinFaq.map(item => `${item.question} ${item.answer}`) },
  security: { title: 'Сделка под контролем', answer: 'Передача предмета проходит через Steam, расчёты — через Wooppay.', steps: ['Проверяй предмет и аккаунт получателя в Steam.', 'Не передавай пароли и коды подтверждения.', 'Проверяй условия и статус операции в приложении.'] },
  documents: { title: 'Документы и оператор', answer: 'Действующие соглашения и правила системы доступны на официальном сайте Wooppay.', steps: ['Перед операцией ознакомься с условиями выбранного сервиса.', 'Тарифы, сроки и ограничения проверяй до подтверждения.'] },
  features: { title: 'Один кошелёк. Больше возможностей.', answer: faqItems[2].answer, steps: ['Покупка и продажа скинов CS2.', 'Оплата повседневных услуг.', 'Пополнения и история операций.'] },
}
const content = { ...serviceContent, ...extra }
export function LandingDialogs({ telegramQr }: { telegramQr: string }) {
  const t = useTranslation()

 const [section, setSection] = useState<keyof typeof content | 'telegram' | null>(null)
 const dialog = useRef<HTMLDialogElement>(null)
 useEffect(() => {
  const click = (event: MouseEvent) => {
   if (window.location.pathname !== '/' || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
   const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
   if (!anchor || anchor.hasAttribute('download')) return
   if (anchor.href === 'https://t.me/skinmarket_official' && !anchor.hasAttribute('data-telegram-direct')) { event.preventDefault(); setSection('telegram'); return }
   if (anchor.target === '_blank') return
   const url = new URL(anchor.href)
   if (url.origin !== location.origin) return
   const key = url.pathname.split('/')[1]
   if (key === 'download') { event.preventDefault(); document.getElementById('download')?.scrollIntoView({behavior:'smooth'}); return }
   if (Object.hasOwn(content,key)) { event.preventDefault(); setSection(key as keyof typeof content) }
  }
  document.addEventListener('click',click,true)
  return () => document.removeEventListener('click',click,true)
 },[])
 useEffect(() => {
  if (!section) return
  const node = dialog.current
  const overflow = document.body.style.overflow
  node?.showModal(); document.body.style.overflow='hidden'
  return () => { node?.close(); document.body.style.overflow=overflow }
 },[section])
 const localizedContent = { ...content, faq: { ...content.faq, steps: skinFaq.map(item => `${t(item.question)} ${t(item.answer)}`) } }
 const item=section && section !== 'telegram' ? localizedContent[section] : null
 return <dialog ref={dialog} className="sk-info-dialog" aria-labelledby="sk-info-title" onClose={()=>setSection(null)} onClick={event=>{if(event.target===event.currentTarget){const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) setSection(null)}}}><button autoFocus className="sk-info-close" aria-label={t("Закрыть")} onClick={()=>setSection(null)}><X/></button>{section === 'telegram' && <><p className="sk-info-kicker">{t("СООБЩЕСТВО SKINMARKET / TELEGRAM")}</p><h2 id="sk-info-title">{t("Свои люди.")}<br/>{t("Свои скины.")}</h2><p>{t("Отсканируй QR-код камерой телефона, чтобы открыть канал SkinMarket в Telegram.")}</p><figure className="sk-telegram-qr"><Image unoptimized src={telegramQr} width={280} height={280} alt={t("QR-код Telegram-канала SkinMarket")}/><figcaption>@skinmarket_official</figcaption></figure><a className="sk-info-cta" href="https://t.me/skinmarket_official" data-telegram-direct target="_blank" rel="noreferrer">{t("Перейти в Telegram-канал")} <ArrowUpRight size={18}/></a></>}{item&&<><p className="sk-info-kicker">{t("SKINMARKET × WOOPPAY / ИНФОРМАЦИЯ")}</p><h2 id="sk-info-title">{t(item.title)}</h2><p>{t(item.answer)}</p><ol>{item.steps.map((step,i)=><li key={step}><span>0{i+1}</span><p>{t(step)}</p></li>)}</ol><div className="sk-info-links"><a href={OFFICIAL.documents} target="_blank" rel="noreferrer">{t("Официальные документы")} <ArrowUpRight size={16}/></a><a href={OFFICIAL.commissions} target="_blank" rel="noreferrer">{t("Комиссии")} <ArrowUpRight size={16}/></a></div><button className="sk-info-cta" onClick={()=>{setSection(null);document.getElementById('download')?.scrollIntoView({behavior:'smooth'})}}>{t("Открыть Wooppay")} <ArrowUpRight size={18}/></button></>}</dialog>
}
