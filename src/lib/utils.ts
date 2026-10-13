import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge class names, resolving Tailwind conflicts. The standard shadcn `cn`. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Strip native event handlers that framer-motion redefines with incompatible
 * types (drag handlers → pan gestures, animation handlers → animation
 * definitions) before spreading props onto a motion component. Native
 * drag-and-drop and CSS-animation events on animated components are not a
 * supported pattern in this design system.
 */
const STRIPPED_PROPS = [
  'onDrag',
  'onDragStart',
  'onDragEnd',
  'onAnimationStart',
  'onAnimationEnd',
  'onAnimationIteration',
] as const

export function stripNativeDragHandlers<T extends Record<string, unknown>>(
  props: T,
): Omit<T, (typeof STRIPPED_PROPS)[number]> {
  const clone = { ...props }
  for (const key of STRIPPED_PROPS) {
    delete clone[key]
  }
  return clone
}
