import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL, INDEXING_ENABLED } from '@/shared/config/site'
import { StructuredData } from '@/shared/ui/structured-data'
import { walletSchema } from '@/entities/wallet/model/schema'
import './globals.css'
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Wooppay Wallet — электронный кошелёк', template: '%s | Wooppay Wallet' },
  description: 'Wooppay Wallet: приложение для платежей, пополнений и цифровых сервисов.',
  robots: { index: INDEXING_ENABLED, follow: true },
  other: { 'apple-itunes-app': 'app-id=913826829' },
}
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru-KZ"><body><StructuredData data={walletSchema} />{children}<footer className="border-t border-white/10 px-6 py-8"><nav aria-label="Разделы сайта" className="mx-auto flex max-w-7xl flex-wrap gap-6 text-sm text-slate-300">{[['/payments','Оплата услуг'],['/transfers','Пополнения'],['/skinmarket','SkinMarket CS2'],['/tariffs','Тарифы и лимиты'],['/faq','Вопросы и ответы'],['/download','Скачать приложение']].map(([href,label]) => <Link key={href} href={href}>{label}</Link>)}</nav></footer></body></html>
}
