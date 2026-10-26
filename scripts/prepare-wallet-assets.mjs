import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'
const source = 'docs/tmp_external_reference/wooppay_app_mobile'
const target = 'public/wallet'
await fs.mkdir(target, { recursive: true })
const files = (await fs.readdir(source, { recursive: true })).filter(file => /\.(jpg|png|webp)$/.test(file)).sort()
await Promise.all(files.map(async (file, index) => {
  let image = sharp(path.join(source, file))
  if (file.startsWith('google_play/photo')) image = image.extract({ left: 0, top: 125, width: 576, height: 1024 })
  await image.resize({ width: 640, withoutEnlargement: true }).webp({ quality: 84 }).toFile(path.join(target, `screen-${index}.webp`))
}))
console.log(`Prepared ${files.length} wallet references`)
