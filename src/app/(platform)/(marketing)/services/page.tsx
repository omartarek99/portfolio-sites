import { pageMetadata } from '@/components/marketing/page-meta'
import { Performance } from '@/components/marketing/Performance'
import { StepsSection, WorkSection } from '@/components/marketing/sections'

export const generateMetadata = () => pageMetadata('/services', 'services')

/** Services: the work by service, how fast it is, and how a project runs. */
export default function ServicesPage() {
  return (
    <>
      <WorkSection />
      <Performance />
      <StepsSection />
    </>
  )
}
