import 'server-only'
import { cache } from 'react'
import { headers } from 'next/headers'
import { createTranslator, normalizeLocale } from './translate'

export const getLocale = cache(async () => normalizeLocale((await headers()).get('x-wooppay-locale') ?? undefined))
export async function getTranslator() {
  return createTranslator(await getLocale())
}
