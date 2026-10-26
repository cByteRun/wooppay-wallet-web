'use client'
import { usePathname } from 'next/navigation'
import { useLocale, useTranslation } from './provider'

export function LanguageSwitch() {
  const locale = useLocale()
  const t = useTranslation()
  const pathname = usePathname().replace(/^\/en(?=\/|$)/, '') || '/'
  return <div role="group" className="language-switch" aria-label={t('Язык сайта')}>
    {(['ru', 'en'] as const).map(value => <a key={value} lang={value} hrefLang={value}
      href={value === 'en' ? `/en${pathname === '/' ? '' : pathname}` : pathname}
      aria-label={value === 'ru' ? 'Русский' : 'English'} aria-current={locale === value ? 'page' : undefined}>{value.toUpperCase()}</a>)}
  </div>
}
