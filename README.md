# Wooppay Wallet

Next.js App Router. SEO-исследование и ограничения: [docs/seo-research-2026.md](docs/seo-research-2026.md).

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run typecheck
npm run check:seo
```

В окружении, запрещающем локальные порты Turbopack, сборка: `npm run build -- --webpack`.

Скопируйте `.env.example` в `.env.local`. `SITE_URL` — согласованный origin, одинаковый для canonical и sitemap. Индексация по умолчанию выключена (`noindex`); для production установить `SITE_INDEXING_ENABLED=true` **перед сборкой**. Не включать для stage. Sitemap при выключенной индексации пустой, robots разрешает чтение noindex.

Архитектура в стиле FSD: `app/` — маршруты; `entities/wallet/model` — продуктовые данные; `features/app-download` — установка; `shared/config`, `shared/lib/seo`, `shared/ui` — общая инфраструктура. `components/` сохраняет композицию существующих экранов и совместимые импорты. Массовое переименование ради структуры не улучшает SEO.

`wooppay:app-download` — локальное DOM-событие для будущего consent-aware адаптера аналитики. Доставка событий в GA/Amplitude и атрибуция установок не подключены. Сканирование QR напрямую в магазин не измеряется сайтом.

SEO-проверка использует Node.js 24 и читает готовые `.next/server/app` артефакты. Запускайте с теми же `SITE_URL` и `SITE_INDEXING_ENABLED`, что использовались при сборке. Например, после production-сборки: `SITE_INDEXING_ENABLED=true npm run check:seo`.
