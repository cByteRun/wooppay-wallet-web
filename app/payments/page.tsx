import { ServicePage } from '@/components/service-page'
import { pageMetadata } from '@/shared/lib/seo/metadata'
export const metadata = pageMetadata('/payments')
export default function Page() { return <ServicePage service="payments" /> }
