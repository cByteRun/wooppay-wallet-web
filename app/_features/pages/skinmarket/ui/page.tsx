import { ServicePage } from '@/pages/service/ui/service-page'
import { pageMetadata } from '@/shared/lib/seo/metadata'
export function generateMetadata() { return pageMetadata('/skinmarket') }
export default function Page() {
 return <ServicePage service="skinmarket" /> }
