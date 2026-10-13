import { OG_SIZE, ogImage } from '@/lib/og-image'
import { cmsGetInsight, cmsInsightsByDate } from '@/lib/content'

export const size = OG_SIZE
export const contentType = 'image/png'

export function generateStaticParams() {
  return cmsInsightsByDate.map((i) => ({ slug: i.slug }))
}

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const insight = cmsGetInsight(slug)
  return ogImage({
    eyebrow: 'Insights',
    title: insight?.title ?? 'Akrostech Insights',
  })
}
