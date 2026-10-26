'use client'

import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-wallet-theme'] })
  return () => observer.disconnect()
}

export function ThemeSwitch() {
  const theme = useSyncExternalStore(subscribe, () => document.documentElement.dataset.walletTheme || 'light', () => 'light')
  function select(theme: 'light' | 'dark') {
    document.documentElement.dataset.walletTheme = theme
    try { localStorage.setItem('wooppay-theme', theme) } catch { /* Theme still works without storage. */ }
  }
  return <div className="wf-theme-switch" role="group" aria-label="Цветовая тема">
    <button type="button" className="wf-theme-light" aria-pressed={theme === 'light'} aria-label="Светлая тема" onClick={() => select('light')}><Sun size={16}/><span>Светлая</span></button>
    <button type="button" className="wf-theme-dark" aria-pressed={theme === 'dark'} aria-label="Тёмная тема" onClick={() => select('dark')}><Moon size={16}/><span>Тёмная</span></button>
  </div>
}
