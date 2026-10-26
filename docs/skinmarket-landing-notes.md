# SkinMarket landing rebuild — 26 October 2026

The homepage now leads with SkinMarket and the supplied positioning: «Первая официальная P2P-платформа скинов в Казахстане. Без комиссии продавца.» The exclusivity wording comes from the client brief; the supplied mobile onboarding and Play Store artwork show the zero-commission offer. No competitor statistics, reviews, transaction totals, or fabricated savings counters are used.

The page follows one sequence: offer → three illustrated benefits → three transaction steps → one e-wallet presentation → FAQ → store downloads and Telegram. The old three-chapter particle universe and separate security/partner panels are no longer mounted on the homepage. Existing service pages remain linked from the wallet section and site footer.

## Visual implementation

- New isolated stylesheet: `skin-rebuild.css`. Charcoal/olive background, lime for the seller benefit and lavender for Wooppay money/services.
- Two canvas rhythms: a slow topographic background field and a foreground dot matrix morphing 0% → ₸ → the existing Wooppay monogram, with transaction orbits around the real market screenshot. Uses native Canvas; no external animation assets or dependencies.
- Each canvas observes its container size and viewport visibility, caps pixel ratio, freezes when the tab is hidden, and respects reduced-motion preferences. One pause control freezes both canvas animations and the phone motion. CSS phone motion also respects reduced motion.
- Real marketplace/payment/trade WebPs come from the supplied mobile materials. Desktop transaction steps change the sticky phone display on scroll and support explicit step selection. Mobile renders the relevant screen next to each step.
- The one wallet presentation uses a locally optimized version of the supplied Google Play artwork (`google_play/unnamed.webp`).
- Official store URLs and locally generated store-specific QR codes are reused. Mobile shows store buttons; desktop also shows both QR codes. Community links use the requested `https://t.me/skinmarket_official`.
- Metadata, WebPage structured data and Open Graph now lead with SkinMarket and the 0% seller fee.

Settlement copy retains the waiting period shown in the supplied app rather than promising instant payout. The fee qualifier distinguishes the seller fee from funding/withdrawal terms. Example amounts are marked as examples.

## Validation

TypeScript and ESLint pass. Browser checks at 1440 px and 390 px pass: no horizontal overflow, no JavaScript errors, working pause, FAQ and scroll-step selection, mobile step screenshots, mobile QR hiding, and reduced-motion support. Production build succeeds with `npx next build --webpack` (20 generated pages); Turbopack encountered an environment process/port restriction.

---

## Previous implementation notes (archive)

# Wooppay Wallet — новая ось продукта

## Тезисы в одном предложении

1. **Wooppay — кошелёк, в котором скины становятся частью повседневных финансов.** Выбран: объединяет SkinMarket с основной ролью электронного кошелька и объясняет продукт игрокам и партнёрам.
2. Wooppay объединяет покупку и продажу скинов CS2, повседневные платежи и международные пополнения в одном приложении.
3. Wooppay — один кошелёк для твоего инвентаря в CS2 и дел за пределами игры.

Первый экран: **«Твои скины. Твои деньги. Один кошелёк.»**

Короткое описание: «Электронный кошелёк со SkinMarket CS2 внутри: покупка и продажа скинов, повседневные платежи и международные пополнения в одном приложении».

## Новый визуальный язык

- Округлая WP-монограмма, вдохновлённая знаком из предоставленного экрана приложения; лавандовый контейнер и лаймовая точка. Это концепция обновления, а не утверждённый корпоративный логотип. SVG: `public/skinmarket/woop-mark.svg`, favicon: `app/icon.svg`.
- Графит, лаванда, лайм; крупная типографика, светлая секция повседневных сервисов, лавандовый блок партнёров.
- Один sticky dot matrix сюжет: кошелёк с WP → керамбит → AWP. Объекты построены программно из точек с глубиной и перспективной проекцией; внешние 3D-модели не используются. Переходы зависят от прокрутки, есть движение и реакция на курсор, пауза, reduced-motion и SVG без JavaScript.
- Текст объясняет путь «скины → баланс кошелька → повседневные услуги». Нет обещания тратить скины напрямую или мгновенно выводить деньги во время Steam hold.
- Источники: предоставленное описание приложения, два мобильных скриншота, `root_animation_hook.mp4`, предыдущая проверка фактов ниже.
- Партнёрский CTA ведёт на существующий ресурс для бизнеса; новая форма и обработка заявок не добавлялись.
- Обновлены metadata, WebPage JSON-LD и Open Graph. FAQ, реальные экраны приложения, ссылки магазинов и QR-коды сохранены.

---

## Предыдущая реализация и исходные материалы (архив)

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
