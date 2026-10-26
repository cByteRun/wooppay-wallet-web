# Skinmarket landing — references and decisions

Implemented on `/`, 26 October 2026. The existing wallet pages and official store links remain reachable.

**Original direction:** W Blade, an angular W with a blade-like right edge. Editable SVG in `public/skinmarket/woop-mark.svg`, related favicon in `app/icon.svg`. Graphite, electric mint, restrained green panels, monospace annotations, and large Russian typography.

**Positioning:** «Твой следующий скин. Уже в твоём кошельке». The value is the combination of a CS2 marketplace, payment from Wooppay, and everyday wallet services in one app. No competitor's price, scale, ratings, or exclusivity claims were reused.

## Text recognised from the supplied screens

Visual text recognition was performed directly on the reference screenshots, including a contact sheet and full-size onboarding screen. No external OCR service received the files.

- `photo_5402376140732702462_y.jpg`: «Торгуй скинами без переплат», «КОМИССИЯ 0%».
- `photo_5402376140732702463_y.jpg`: «Подключи аккаунт Steam», «Войди через Steam», «Привяжи TradeLink».
- `photo_5402376140732702464_y.jpg`: «P2P — напрямую без посредников».
- `photo_5402376140732702465_y.jpg`: «Прозрачно при каждом шаге»; buyer pays; funds are frozen until completion; seller sends the Steam trade; waiting according to Steam rules; seller receives money. The screen explicitly labels a seven-day hold.
- `photo_5402376140732702466_y.jpg`: «Пополняй и выводи легко»; available funding/withdrawal methods are shown inside the application.
- `photo_5402376140732702470_y.jpg`: identification is requested before transactions. The claimed unlimited privileges were not used as general landing promises.
- `photo_5402376140732702473_y.jpg`: «Введите ваш Trade Link»; explains its role in receiving the item.
- `photo_5402376140732702474_y.jpg`: purchase/payment explanation and three stages of a protected transaction.
- `photo_5402376140732702475_y.jpg`: «Пополнение», amount, source of funds, confirmation.
- `wooppay 3steps/`: genuine catalog, item, wallet payment and trade status screens. Converted to local WebP assets for the landing.

The top-up sequence reuses the available top-up screen for the first two steps; it does not fabricate a successful payment receipt. Screens show example amounts and the page says so.

## Factual checks and FAQ

- [Official app description](https://play.google.com/store/apps/details?hl=en_US&id=com.wooppay.wooppayapplication): verifies the marketplace/wallet combination and daily payment services.
- [Official agreements](https://www.wooppay.com/site/agreement): current entry point for service terms, including Skinmarket.
- [Skinmarket rules](https://www.wooppay.com/files/Правила_использования_сервиса_Skinmarket_в_рамках_Cистемы_WOOPPAY.pdf): authentication and identification requirements, buyer/seller transaction roles, and Steam account linkage. These requirements take precedence over aspirational marketing language.

Eight visible, server-rendered FAQ answers cover the service, buying, Steam/Trade Link, payment stages, waiting, funding/fees, identification, and support. FAQPage JSON-LD uses the exact same answers. Seven days is attributed to the supplied app screen and is not presented as an unconditional current Steam guarantee. No unconditional zero-commission, instant settlement, or unlimited-account claims.

## Implementation and verification

- Server-rendered content and static generation; canvas and scroll enhancements are client islands.
- Canvas uses depth projection, point morphing, pointer response, a pause button, reduced-motion support, and visibility-aware drawing.
- Sticky phone changes with the visible step; the two scenarios are selectable. All explanatory steps remain in HTML.
- Real store links and independently decodable store QR codes retain the existing download components.
- Title/description/canonical/social cards, favicon, WebPage and FAQ schema. Existing staging indexing policy remains in force; production indexing requires the configured project flag.
- `npm run lint`, `npm run typecheck`, production build with `npm run build -- --webpack`, and `npm run check:seo` passed.
- Chromium exercised widths 360, 390, 768, 1024, and 1440, buy/top-up scroll transitions, accordion expansion, animation pause, download anchor, loaded images, and content without JavaScript. No horizontal overflow or page errors. Turbopack encountered an environment process/port restriction; Webpack completed successfully.
