import type { MetadataRoute } from "next"
export default function sitemap(): MetadataRoute.Sitemap { const routes=["/","/features","/security","/faq","/download"]; return routes.map((url)=>({url:`https://wooppay.com${url}`,lastModified:new Date(),changeFrequency:"monthly",priority:url==="/"?1:.7})) }
