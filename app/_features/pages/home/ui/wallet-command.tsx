'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowDown, ArrowUp, ArrowUpRight, Building2, Command, Download, FileText, Gamepad2, Globe2, HelpCircle, Search, Send, ShieldCheck, Smartphone, Wallet, X } from 'lucide-react'
import Link from '@/shared/lib/i18n/link'
import { useTranslation } from '@/shared/lib/i18n/provider'
import { OFFICIAL } from '@/shared/config/official-resources'

const destinations = [
  { href: '#possibilities', icon: Wallet, title: 'Возможности кошелька', description: 'Платежи, пополнения и цифровые сервисы в одном приложении.', tags: 'wallet app услуги оплата', audience: 'personal' },
  { href: '#flows', icon: Smartphone, title: 'Как пользоваться', description: 'Путь от первого пополнения до сделки в SkinMarket.', tags: 'шаги инструкция start', audience: 'personal' },
  { href: '#skinmarket', icon: Gamepad2, title: 'SkinMarket CS2', description: 'Steam, Trade Link, покупка и продажа скинов.', tags: 'counter strike skins скин игры', audience: 'personal' },
  { href: '/tariffs', icon: Globe2, title: 'Тарифы и лимиты', description: 'Где проверить комиссию, курс и ограничения операции.', tags: 'деньги комиссия перевод идентификация limits fees', audience: 'personal' },
  { href: '#trust', icon: ShieldCheck, title: 'Безопасность кошелька', description: 'Проверка операций и защита доступа к приложению.', tags: 'security пароль код', audience: 'all' },
  { href: '#faq', icon: HelpCircle, title: 'Вопросы и ответы', description: 'Установка, идентификация, платежи и помощь.', tags: 'faq помощь вопрос help', audience: 'personal' },
  { href: '#download', icon: Download, title: 'Скачать Wooppay', description: 'Официальные App Store и Google Play, QR-коды.', tags: 'ios android iphone скачать download', audience: 'personal' },
  { href: '#partners', icon: Building2, title: 'Партнёрам и банкам', description: 'Экосистема Wooppay и знакомство с компанией.', tags: 'business bank банк партнер партнёр b2b', audience: 'business' },
  { href: '#partner-contact', icon: Send, title: 'Обсудить сотрудничество', description: 'Контакт команды и вводные для вашего проекта.', tags: 'integration api интеграция бизнес банк', audience: 'business' },
  { href: '/documents', icon: FileText, title: 'Документы и оператор', description: 'Соглашения, правила и реестр Национального Банка.', tags: 'legal pci dss условия лицензия', audience: 'business' },
  { href: '#community', icon: Globe2, title: 'Wooppay на связи', description: 'Telegram, Instagram и официальные ресурсы.', tags: 'social новости соцсети медиа instagram telegram', audience: 'all' },
  { href: OFFICIAL.telegram, icon: HelpCircle, title: 'Поддержка в Telegram', description: 'Если ответа в FAQ недостаточно — @wooppay_support.', tags: 'support ошибка платеж помощь', audience: 'all' },
]
type Audience = 'all' | 'personal' | 'business'

export function WalletCommand() {
  const t = useTranslation()
  const dialog = useRef<HTMLDialogElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const list = useRef<HTMLDivElement>(null)
  const previousOverflow = useRef('')
  const [query, setQuery] = useState('')
  const [audience, setAudience] = useState<Audience>('all')
  const [active, setActive] = useState(0)
  const results = destinations.filter(item => (audience === 'all' || item.audience === audience || item.audience === 'all') && `${t(item.title)} ${t(item.description)} ${item.title} ${item.tags}`.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()))

  function open(filter: Audience = 'all') {
    if (!dialog.current || dialog.current.open) return
    setQuery(''); setAudience(filter); setActive(0)
    previousOverflow.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialog.current.showModal()
    input.current?.focus()
  }
  function close() {
    document.body.style.overflow = previousOverflow.current
    dialog.current?.close()
  }
  useEffect(() => {
    const element = dialog.current
    function shortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        if (element?.open) { document.body.style.overflow = previousOverflow.current; element.close(); return }
        setQuery(''); setAudience('all'); setActive(0)
        previousOverflow.current = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        element?.showModal(); input.current?.focus()
      }
    }
    document.addEventListener('keydown', shortcut)
    return () => {
      document.removeEventListener('keydown', shortcut)
      if (element?.open) document.body.style.overflow = previousOverflow.current
    }
  }, [])
  useEffect(() => { list.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' }) }, [active])

  return <div className="wf-command-hub">
    <div className="wf-command-caption"><span className="wf-status"/>{t('ТВОЙ КОРОТКИЙ ПУТЬ')}</div>
    <button type="button" className="wf-command-trigger" onClick={() => open()} aria-haspopup="dialog"><Search size={20}/><span>{t('Найти раздел, ответ или контакт')}</span><kbd><Command size={13}/> / Ctrl K</kbd></button>
    <div className="wf-audiences"><button type="button" onClick={() => open('personal')}><Smartphone size={15}/>{t('Мне для себя')}<ArrowUpRight size={14}/></button><button type="button" onClick={() => open('business')}><Building2 size={15}/>{t('Партнёрам и банкам')}<ArrowUpRight size={14}/></button></div>
    <dialog ref={dialog} className="wf-command-dialog" aria-labelledby="command-title" onKeyDown={event => { if (event.key === 'Escape') { event.preventDefault(); close() } }} onCancel={() => { document.body.style.overflow = previousOverflow.current }} onClose={() => { if (!dialog.current?.open) document.body.style.overflow = previousOverflow.current }} onClick={event => { if (event.target === event.currentTarget) { const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) close() } }}>
      <div className="wf-command-top"><span className="wf-eyebrow" id="command-title"><span className="wf-status"/>WOOPPAY / {t('НАВИГАЦИЯ')}</span><button type="button" onClick={close} aria-label={t('Закрыть')}><X size={19}/><kbd>Esc</kbd></button></div>
      <div className="wf-command-input"><Search size={23}/><input ref={input} autoFocus type="search" role="combobox" aria-label={t('Поиск по сайту')} aria-autocomplete="list" aria-expanded="true" aria-controls="command-results" aria-activedescendant={results.length ? `command-result-${active}` : undefined} value={query} placeholder={t('Например: Steam, комиссия, банк…')} onChange={event => { setQuery(event.target.value); setActive(0) }} onKeyDown={event => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') { event.preventDefault(); setActive(value => results.length ? (value + (event.key === 'ArrowDown' ? 1 : -1) + results.length) % results.length : 0) }
        if (event.key === 'Enter') { event.preventDefault(); list.current?.querySelector<HTMLAnchorElement>(`[data-index="${active}"]`)?.click() }
      }}/></div>
      <div className="wf-command-filters">{([['all', 'Всё'], ['personal', 'Для себя'], ['business', 'Для бизнеса']] as const).map(([value, label]) => <button type="button" key={value} aria-pressed={audience === value} onClick={() => { setAudience(value); setActive(0); input.current?.focus() }}>{t(label)}</button>)}</div>
      <div ref={list} id="command-results" className="wf-command-results" role="listbox" aria-label={t('Разделы сайта')}>{results.map((item, index) => <Link key={item.href} href={item.href} id={`command-result-${index}`} role="option" aria-selected={index === active} data-index={index} className="wf-command-result" onClick={close}><span className="wf-command-icon"><item.icon size={21} strokeWidth={1.5}/></span><span><strong>{t(item.title)}</strong><small>{t(item.description)}</small></span><ArrowUpRight size={18}/></Link>)}{!results.length ? <div className="wf-command-empty"><Search size={30}/><p>{t('Пока ничего не найдено.')}</p><span>{t('Попробуй «тарифы», «Steam» или «партнёры».')}</span><a href="#faq" onClick={close}>{t('Вопросы и ответы')} ↗</a></div> : null}</div>
      <div className="wf-command-footer"><span><ArrowUp size={12}/><ArrowDown size={12}/>{t('выбрать')} · ↵ {t('открыть')}</span><span aria-live="polite">{t('Найдено:')} {results.length}</span></div>
    </dialog>
  </div>
}
