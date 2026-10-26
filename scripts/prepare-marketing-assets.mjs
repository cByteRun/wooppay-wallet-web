// Rebuild PNG assets from local references without resizing or lossy encoding.
import sharp from 'sharp'
import { copyFile, mkdir } from 'node:fs/promises'

const target = 'public/skinmarket/originals'
const references = 'docs/tmp_external_reference'
await mkdir(target, { recursive: true })
const phones = {
  market: 'Маркет-2.460f396c.png',
  item: 'Карточка_товара.305695fc.png',
  payment: 'Покупка-1.cc5c4158.png',
  trade: 'Покупатель_Шаг_39.38b90601.png',
}
for (const [name, file] of Object.entries(phones)) {
  await copyFile(`${references}/wooppay_app_mobile/wooppay 3steps/${file}`, `${target}/${name}.png`)
}
await copyFile(`${references}/wooppay_app_mobile/iPhone_14_Pro-2.96b6e2b5.png`, `${target}/intro.png`)
await copyFile(`${references}/steam market/steam inventory.png`, `${target}/inventory.png`)

// Crop only the item artwork, leaving UI labels and prices outside the image.
// Flood-fill the flat screenshot background from the edges; retain original item pixels.
async function itemCutout(source, name, region) {
  const { data, info } = await sharp(source).extract(region).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const background = [...data.subarray(0, 3)]
  const seen = new Uint8Array(info.width * info.height)
  const queue = []
  const add = index => {
    if (seen[index]) return
    seen[index] = 1
    const p = index * 4
    if (Math.max(...background.map((value, channel) => Math.abs(data[p + channel] - value))) > 14) return
    data[p + 3] = 0
    queue.push(index)
  }
  for (let x = 0; x < info.width; x++) { add(x); add((info.height - 1) * info.width + x) }
  for (let y = 0; y < info.height; y++) { add(y * info.width); add(y * info.width + info.width - 1) }
  for (let head = 0; head < queue.length; head++) {
    const index = queue[head], x = index % info.width, y = Math.floor(index / info.width)
    if (x) add(index - 1)
    if (x + 1 < info.width) add(index + 1)
    if (y) add(index - info.width)
    if (y + 1 < info.height) add(index + info.width)
  }
  await sharp(data, { raw: info }).png({ compressionLevel: 9 }).toFile(`${target}/${name}.png`)
}
await itemCutout(`${references}/steam market/Нож-бабочка  Легенды stewam market.png`, 'lore', { left: 35, top: 82, width: 200, height: 150 })
await itemCutout('public/skinmarket/hero-tiger-tooth.png', 'tiger-tooth', { left: 100, top: 230, width: 360, height: 280 })
await itemCutout(`${target}/item.png`, 'aquamarine', { left: 140, top: 510, width: 820, height: 450 })
