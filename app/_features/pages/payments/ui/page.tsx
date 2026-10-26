import { ServicePage } from '@/pages/service/ui/service-page'
import { pageMetadata } from '@/shared/lib/seo/metadata'
export const metadata = pageMetadata('/payments')
export default function Page() { return <ServicePage service="payments" /> }
