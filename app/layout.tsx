import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  metadataBase: new URL("https://wooppay.com"),
  title: { default: "Wooppay Wallet — цифровой кошелек для ежедневных платежей", template: "%s | Wooppay Wallet" },
  description: "Wooppay Wallet — удобные платежи, переводы и контроль расходов в одном приложении.",
  keywords: ["Wooppay Wallet", "электронный кошелек", "мобильные платежи", "переводы", "оплата услуг"],
  openGraph: { title: "Wooppay Wallet", description: "Ваши деньги. Ваш контроль.", type: "website", locale: "ru_RU" },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>
}
