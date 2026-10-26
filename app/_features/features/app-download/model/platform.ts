export function detectPlatform(userAgent: string, touchPoints: number): 'ios' | 'android' | 'other' {
  if (/android/i.test(userAgent)) return 'android'
  if (/iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && touchPoints > 1)) return 'ios'
  return 'other'
}
