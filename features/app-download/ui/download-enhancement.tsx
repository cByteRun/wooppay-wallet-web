'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import { detectPlatform } from '../model/platform'

export function DownloadEnhancement({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (root.current) root.current.dataset.platform = detectPlatform(navigator.userAgent, navigator.maxTouchPoints)
  }, [])
  return <div ref={root} className="app-download" onClick={event => {
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>('a[data-store]')
    if (!link) return
    // Transport-free event: a consent-aware analytics adapter may subscribe.
    window.dispatchEvent(new CustomEvent('wooppay:app-download', { detail: { store: link.dataset.store, placement: link.dataset.placement, path: window.location.pathname } }))
  }}>{children}</div>
}
