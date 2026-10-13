import { readFileSync, writeFileSync } from 'node:fs'
import { services } from '../src/data/services.ts'

for (const s of services) {
  const p = `content/services/${s.slug}.mdx`
  const t = readFileSync(p, 'utf8')
  const updated = t.replace(/^excerpt:/m, `name: '${s.name}'\nexcerpt:`)
  writeFileSync(p, updated)
  console.log('named', s.slug)
}
