'use client'

import { useTransition } from 'react'
import { useLocale, useTranslation } from './provider'
import type { Locale } from './translate'
import { setLocale } from './actions'

export function LanguageSwitch() {
  const locale = useLocale()
  const t = useTranslation()
  const [pending, startTransition] = useTransition()

  function select(next: Locale) {
    if (next === locale) return
    startTransition(async () => { await setLocale(next) })
  }

  return <div className="language-switch" role="group" aria-label={t('Язык сайта')} aria-busy={pending}>
    {(['ru', 'en'] as const).map(value => <button key={value} type="button" lang={value}
      aria-label={value === 'ru' ? 'Русский' : 'English'} aria-pressed={locale === value}
      disabled={pending} onClick={() => select(value)}>{value.toUpperCase()}</button>)}
  </div>
}
