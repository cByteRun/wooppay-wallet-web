import { CompanyCard } from '@/pages/home/ui/company-card'
import Link from '@/shared/lib/i18n/link'
import { LanguageSwitch } from '@/shared/lib/i18n/language-switch'
import { getTranslator } from '@/shared/lib/i18n/server'
import { pageMetadata } from '@/shared/lib/seo/metadata'
import '../_features/pages/home/ui/wallet-landing.css'

export function generateMetadata() { return pageMetadata('/partners') }
export default async function PartnersPage() {
  const t = await getTranslator()
  return <main className="wf-root"><header className="wf-header wf-wrap"><Link href="/" className="wf-brand">wooppay.</Link><LanguageSwitch/></header><h1 className="wf-wrap" style={{ paddingTop: 48, fontSize: 'clamp(32px, 5vw, 64px)' }}>{t('Wooppay для банков и бизнес-партнёров')}</h1><CompanyCard/></main>
}
