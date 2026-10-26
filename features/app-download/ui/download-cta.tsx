import { Apple, Play } from 'lucide-react'
import { STORE_LINKS } from '@/shared/config/site'
import { DownloadEnhancement } from './download-enhancement'

export function DownloadCta() {
  return <DownloadEnhancement><div className="download-links flex flex-wrap justify-center gap-3">
    <a data-store="ios" data-placement="cta" href={STORE_LINKS.ios} className="store-link inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold"><Apple aria-hidden="true" size={18} /> Скачать в App Store</a>
    <a data-store="android" data-placement="cta" href={STORE_LINKS.android} className="store-link inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-5 py-3 text-sm font-semibold"><Play aria-hidden="true" size={17} /> Скачать в Google Play</a>
  </div></DownloadEnhancement>
}
