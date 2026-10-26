'use client'
import NextLink from 'next/link'
import type { ComponentProps } from 'react'
import { useLocale } from './provider'

// Keep internal navigation in the selected, crawlable language version.
export default function LocalizedLink({ href, ...props }: ComponentProps<typeof NextLink>) {
  const locale = useLocale()
  const localized = typeof href === 'string' && href.startsWith('/') && !href.startsWith('//') && !/^\/en(?:\/|$|[?#])/.test(href)
    ? locale === 'en' ? `/en${href === '/' ? '' : href}` : href
    : href
  return <NextLink href={localized} {...props}/>
}
