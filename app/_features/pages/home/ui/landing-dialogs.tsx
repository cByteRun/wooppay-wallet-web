'use client'
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
export function LandingDialogs() {
 const [section, setSection] = useState<keyof typeof content | null>(null)
 const dialog = useRef<HTMLDialogElement>(null)
 useEffect(() => {
  const click = (event: MouseEvent) => {
   if (window.location.pathname !== '/' || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
   const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href]')
   if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
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
 const item=section ? content[section] : null
 return <dialog ref={dialog} className="sk-info-dialog" aria-labelledby="sk-info-title" onClose={()=>setSection(null)} onClick={event=>{if(event.target===event.currentTarget){const r=event.currentTarget.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom) setSection(null)}}}><button autoFocus className="sk-info-close" aria-label="Закрыть" onClick={()=>setSection(null)}><X/></button>{item&&<><p className="sk-info-kicker">SKINMARKET × WOOPPAY / ИНФОРМАЦИЯ</p><h2 id="sk-info-title">{item.title}</h2><p>{item.answer}</p><ol>{item.steps.map((step,i)=><li key={step}><span>0{i+1}</span><p>{step}</p></li>)}</ol><div className="sk-info-links"><a href={OFFICIAL.documents} target="_blank" rel="noreferrer">Официальные документы <ArrowUpRight size={16}/></a><a href={OFFICIAL.commissions} target="_blank" rel="noreferrer">Комиссии <ArrowUpRight size={16}/></a></div><button className="sk-info-cta" onClick={()=>{setSection(null);document.getElementById('download')?.scrollIntoView({behavior:'smooth'})}}>Открыть Wooppay <ArrowUpRight size={18}/></button></>}</dialog>
}
