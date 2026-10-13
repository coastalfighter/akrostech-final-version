import Link from 'next/link'
import { Arcs } from '@/components/brand/arcs'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/layout'

/** 404 — off the map, with the ways back. */
export default function NotFound() {
  return (
    <main className="bg-forest-deep relative isolate flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20">
      <Arcs className="absolute inset-x-0 bottom-0 -z-10 h-[50vh] w-full" />
      <Container>
        <p className="text-sage text-xs tracking-[0.22em] uppercase">Error 404</p>
        <h1 className="display-xl mt-6">
          Off the <span className="accent">map.</span>
        </h1>
        <p className="text-cream/80 mt-8 max-w-[48ch] text-lg leading-relaxed">
          This page doesn’t exist — or it moved when we rebuilt the site. Here are the ways back.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild size="lg" variant="secondary">
            <Link href="/services">Explore services</Link>
          </Button>
        </div>
      </Container>
    </main>
  )
}
