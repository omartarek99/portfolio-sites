import { pageMetadata } from '@/components/marketing/page-meta'
import { FaqSection } from '@/components/marketing/sections'

export const generateMetadata = () => pageMetadata('/faq', 'faq')

export default function FaqPage() {
  return <FaqSection />
}
