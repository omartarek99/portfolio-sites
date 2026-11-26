import { pageMetadata } from '@/components/marketing/page-meta'
import { AboutSection } from '@/components/marketing/sections'

export const generateMetadata = () => pageMetadata('/about', 'about')

export default function AboutPage() {
  return <AboutSection />
}
