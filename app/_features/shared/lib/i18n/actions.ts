'use server'

import { cookies } from 'next/headers'
import { LOCALE_COOKIE, type Locale } from './translate'

export async function setLocale(locale: Locale) {
  if (locale !== 'ru' && locale !== 'en') throw new Error('Unsupported locale')
  const store = await cookies()
  store.set(LOCALE_COOKIE, locale, {
    path: '/', maxAge: 60 * 60 * 24 * 365, sameSite: 'lax', httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  })
}
