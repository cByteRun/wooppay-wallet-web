import english from './en.json'

export const LOCALE_COOKIE = 'wooppay-locale'
export const DEFAULT_LOCALE = 'ru'
export type Locale = 'ru' | 'en'
export const languageTag = (locale: Locale) => locale === 'en' ? 'en' : 'ru-KZ'
export const normalizeLocale = (value?: string): Locale => value === 'en' ? 'en' : DEFAULT_LOCALE
const messages: Record<string, string> = english

// Russian source messages are stable dictionary keys and the default translation.
export function createTranslator(locale: Locale) {
  return function t<T>(value: T, parameters?: Record<string, string | number>): T {
    if (typeof value !== 'string') {
      if (Array.isArray(value)) return value.map(item => t(item)) as T
      return value
    }
    const message = locale === 'en' ? messages[value] ?? value : value
    return (parameters ? message.replace(/\{(\w+)\}/g, (token, key: string) =>
      parameters[key] === undefined ? token : String(t(parameters[key]))) : message) as T
  }
}
export type Translator = ReturnType<typeof createTranslator>
