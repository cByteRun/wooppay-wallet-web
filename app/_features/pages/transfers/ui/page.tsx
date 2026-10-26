import { ServicePage } from '@/pages/service/ui/service-page'
import { pageMetadata } from '@/shared/lib/seo/metadata'
export const metadata = pageMetadata('/transfers')
export default function Page() { return <ServicePage service="transfers" /> }
