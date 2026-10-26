# Wooppay Wallet

Демонстрационный проект, разрабатываемый по заказу для Wooppay; до согласования не является утверждённым официальным ресурсом бренда. Все права на бренд Wooppay, товарные знаки, логотипы и мобильные приложения принадлежат Wooppay и соответствующим правообладателям. См. [статус демо и права](docs/features/localization-trust.md#статус-демо-и-права).

Next.js App Router. [Roadmap](ROADMAP.md), [архитектура](docs/architecture.md), [SEO feature](docs/features/seo-discovery.md). SEO-исследование и ограничения: [docs/seo-research-2026.md](docs/seo-research-2026.md).

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

FSD-код находится в приватной папке `app/_features/`: `pages/` — экраны, `widgets/` — общие блоки, `features/` — действия, `entities/` — продуктовые данные, `shared/` — инфраструктура. Алиас `@/` указывает на `app/_features/`. Файлы `app/**/page.tsx` остаются тонкими входами маршрутов. `_features` исключена из маршрутизации Next.js; публичный URL `/features` сохранён. Подробнее — [архитектура](docs/architecture.md).

`wooppay:app-download` — локальное DOM-событие для будущего consent-aware адаптера аналитики. Доставка событий в GA/Amplitude и атрибуция установок не подключены. Сканирование QR напрямую в магазин не измеряется сайтом.

SEO-проверка использует Node.js 24 и читает готовые `.next/server/app` артефакты. Запускайте с теми же `SITE_URL` и `SITE_INDEXING_ENABLED`, что использовались при сборке. Например, после production-сборки: `SITE_INDEXING_ENABLED=true npm run check:seo`.
