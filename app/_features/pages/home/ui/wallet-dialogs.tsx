'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { faqItems, serviceContent } from '@/entities/wallet/model/content'
import { OFFICIAL } from '@/shared/config/official-resources'

const sections = {
  ...serviceContent,
  features: {
    title: 'Возможности Wooppay Wallet',
    answer: faqItems[2].answer,
    steps: ['Оплачивай мобильную связь, интернет и повседневные услуги.', 'Пополняй зарубежные карты и кошельки по доступным направлениям.', 'Выбирай игровые пополнения и цифровые сервисы в каталоге приложения.', 'Покупай и продавай скины CS2 в SkinMarket.'],
  },
  security: {
    title: 'Безопасность кошелька',
    answer: 'Устанавливай Wooppay из официальных магазинов. Проверяй реквизиты, сумму, комиссию и условия каждой операции до подтверждения.',
    steps: ['Никому не передавай пароль и коды подтверждения.', 'Проверяй аккаунт получателя и предмет при передаче скинов через Steam.', 'Сохраняй сведения об операции и проверяй её статус в приложении.', 'Если нужна помощь, обращайся в поддержку через приложение или официальные контакты.'],
  },
  documents: {
    title: 'Документы и оператор',
    answer: 'Правила системы, соглашения и действующие комиссии размещены на официальном сайте Wooppay. Ознакомься с ними перед использованием кошелька.',
    steps: ['Проверь условия выбранного сервиса и требования к идентификации.', 'Уточни действующие комиссии и ограничения до подтверждения операции.'],
  },
  faq: {
    title: 'Вопросы и помощь',
    answer: 'Начни со скачивания Wooppay из App Store или Google Play. Зарегистрируйся и выбери нужный сервис. Доступность операций и требования к идентификации проверяй в приложении.',
    steps: ['Комиссии, курс и лимиты зависят от услуги и аккаунта: проверь их перед подтверждением.', 'Если платёж не поступил, подготовь дату, сумму и номер операции для поддержки.', 'Поддержка: spp@wooppay.com и Telegram @wooppay_support. Пароли и коды подтверждения сообщать нельзя.'],
  },
}

// Render every section on the server so the product information is present in HTML.
export function WalletDialogs() {
  const container = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dialogs = Array.from(container.current?.querySelectorAll('dialog') ?? [])
    let active: HTMLDialogElement | undefined
    let previousOverflow = ''
    const close = () => {
      if (!active) return
      active.close()
      active = undefined
      document.body.style.overflow = previousOverflow
    }
    const openFromHash = () => {
      const next = dialogs.find(dialog => `#${dialog.id}` === window.location.hash)
      if (next === active) return
      close()
      if (next) {
        previousOverflow = document.body.style.overflow
        active = next
        next.showModal()
        document.body.style.overflow = 'hidden'
      }
    }
    const onClose = () => {
      if (!active || active.open) return
      active = undefined
      document.body.style.overflow = previousOverflow
      if (window.location.hash.startsWith('#info-')) {
        history.replaceState(null, '', window.location.pathname + window.location.search)
      }
    }
    const onClick = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      if (!anchor || anchor.target === '_blank') return
      const url = new URL(anchor.href)
      if (url.origin !== location.origin || url.pathname !== '/' || !dialogs.some(dialog => `#${dialog.id}` === url.hash)) return
      event.preventDefault()
      if (location.hash !== url.hash) history.pushState(null, '', url.hash)
      openFromHash()
    }
    dialogs.forEach(dialog => dialog.addEventListener('close', onClose))
    document.addEventListener('click', onClick, true)
    window.addEventListener('hashchange', openFromHash)
    window.addEventListener('popstate', openFromHash)
    openFromHash()
    return () => {
      dialogs.forEach(dialog => dialog.removeEventListener('close', onClose))
      document.removeEventListener('click', onClick, true)
      window.removeEventListener('hashchange', openFromHash)
      window.removeEventListener('popstate', openFromHash)
      close()
    }
  }, [])

  return <div ref={container}>{Object.entries(sections).map(([key, item]) => <dialog
    key={key}
    id={`info-${key}`}
    className="wf-info-dialog"
    aria-labelledby={`info-${key}-title`}
    onClick={event => {
      if (event.target !== event.currentTarget) return
      const rect = event.currentTarget.getBoundingClientRect()
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) event.currentTarget.close()
    }}
  >
    <form method="dialog" className="wf-info-close"><button autoFocus aria-label="Закрыть"><X size={22}/></button></form>
    <h2 id={`info-${key}-title`}>{item.title}</h2>
    <p>{item.answer}</p>
    <ul>{item.steps.map(step => <li key={step}>{step}</li>)}</ul>
    <div className="wf-info-links">
      {key === 'documents' || key === 'tariffs' ? <><a href={OFFICIAL.documents} target="_blank" rel="noreferrer">Документы Wooppay <ArrowUpRight size={16}/></a><a href={OFFICIAL.commissions} target="_blank" rel="noreferrer">Действующие комиссии <ArrowUpRight size={16}/></a></> : null}
      {key === 'faq' || key === 'security' ? <><a href={OFFICIAL.supportEmail}>Написать в поддержку <ArrowUpRight size={16}/></a><a href={OFFICIAL.telegram} target="_blank" rel="noreferrer">Поддержка в Telegram <ArrowUpRight size={16}/></a></> : null}
    </div>
    <a className="wf-button" href="#download" onClick={event => event.currentTarget.closest('dialog')?.close()}>Скачать Wooppay <ArrowUpRight size={18}/></a>
  </dialog>)}</div>
}
