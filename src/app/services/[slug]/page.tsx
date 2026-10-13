import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ServiceTemplate } from '@/components/services/service-template'
import { getService, services } from '@/data/services'

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = getService(slug)
  if (!service) return {}
  return {
    title: `${service.name} for U.S. Businesses`,
    description: service.excerpt,
  }
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = getService(slug)
  if (!service) notFound()
  return <ServiceTemplate service={service} />
}
