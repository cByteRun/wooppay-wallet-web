import { OFFICIAL } from '@/shared/config/official-resources'

export function OfficialHelp() {
  return <aside className="mt-10 rounded-3xl border border-white/15 bg-white/5 p-7" aria-label="Официальная поддержка">
    <h2 className="text-2xl font-semibold">Не нашли ответ по своей операции?</h2>
    <p className="mt-4 leading-7 text-slate-300">Лимит и доступность услуги зависят от аккаунта и операции. Если условия не показаны или платёж не поступил, уточните их у поддержки Wooppay. Подготовьте дату, сумму, способ оплаты и номер операции. Пароль и коды подтверждения передавать нельзя.</p>
    <ul className="mt-5 flex flex-wrap gap-5 text-violet-200 underline">
      <li><a href={OFFICIAL.supportEmail}>Написать на spp@wooppay.com</a></li>
      <li><a href={OFFICIAL.telegram}>Поддержка в Telegram</a></li>
      <li><a href={OFFICIAL.help}>Официальная справка и чат</a></li>
    </ul>
  </aside>
}
