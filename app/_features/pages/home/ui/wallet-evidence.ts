// Public store snapshot checked on 2026-10-26. These are not live counters.
// Store scores differ by storefront and must never be averaged together.
export const walletEvidence = {
  checkedAt: '2026-10-26',
  checkedLabel: '26.10.2026',
  apple: { url: 'https://apps.apple.com/kz/app/wooppay-app/id913826829', rating: '4.4', count: 331, storefront: 'KZ' },
  google: { url: 'https://play.google.com/store/apps/details?hl=en_US&id=com.wooppay.wooppayapplication', rating: '4.3', downloads: '100K+', reviewCountLabel: '1.95K', storefront: 'US' },
  maps: { url: 'https://yandex.kz/maps/ru/org/wooppay/132949379076/reviews/' },
} as const
