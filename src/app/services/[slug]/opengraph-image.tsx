import { OG_SIZE, ogImage } from '@/lib/og-image'
import { cmsGetService, cmsServicesByOrder } from '@/lib/content'

export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
  return cmsServicesByOrder.map((s) => ({ slug: s.slug }))
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = cmsGetService(slug)
  return ogImage({
    eyebrow: service?.name ?? 'Services',
    title: service?.tagline ?? 'Dedicated professionals, on your hours.',
    accent: service?.accent ?? 'default',
  })
}
