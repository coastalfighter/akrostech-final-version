import { OG_SIZE, ogImage } from '@/lib/og-image'

export const size = OG_SIZE
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return ogImage({
    eyebrow: 'Akrostech Consulting LLC',
    title: 'Your team, on your clock.',
  })
}
