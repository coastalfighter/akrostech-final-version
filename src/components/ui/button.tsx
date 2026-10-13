'use client'

import { Slot } from '@radix-ui/react-slot'
import { ArrowRight } from '@phosphor-icons/react'
import { cva, type VariantProps } from 'class-variance-authority'
import { motion, useReducedMotion } from 'framer-motion'
import * as React from 'react'
import { SPRING_SOFT } from '@/lib/motion'
import { cn, stripNativeDragHandlers } from '@/lib/utils'

/**
 * Button — primary (indigo pill), secondary (outline), ghost (text).
 *
 * - Primary hover: magnetic pull toward the cursor (max 8px); label slides up
 *   with a duplicate sliding in from below; arrow shifts 4px.
 * - Secondary hover: Meridian gradient sweeps around the border (.btn-secondary).
 * - Ghost hover: underline draws left→right; arrow nudges.
 * - Press: scales to 0.97. Focus: 2px ring + 2px offset (global CSS).
 * - All motion disabled under prefers-reduced-motion or coarse pointers.
 * - Minimum touch target 44px on every size.
 */

const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-150 select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-5 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-akros-indigo text-white shadow-[0_0_24px_rgba(91,92,246,0.35)] hover:bg-indigo-glow hover:shadow-[0_0_32px_rgba(139,140,255,0.45)] active:bg-akros-indigo',
        secondary:
          'btn-secondary border border-line-dark bg-transparent text-paper-50 hover:border-transparent data-[surface=light]:border-graphite-900/25 data-[surface=light]:text-graphite-900',
        ghost:
          'group/ghost text-paper-50 data-[surface=light]:text-graphite-900 hover:text-indigo-glow data-[surface=light]:hover:text-akros-indigo',
      },
      size: {
        sm: 'min-h-[44px] px-5 text-sm',
        md: 'min-h-[52px] px-7 text-base',
        lg: 'min-h-[60px] px-9 text-lg',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Render as a child element (e.g. Next.js Link) via Radix Slot. */
  asChild?: boolean
  /** Magnetic pull toward the cursor. Defaults to true for primary. */
  magnetic?: boolean
  /** Show the trailing arrow icon. Defaults to true. */
  arrow?: boolean
}

const MAGNETIC_MAX = 8 // px

function Button({
  className,
  variant = 'primary',
  size,
  asChild = false,
  magnetic,
  arrow = true,
  children,
  onMouseMove,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const reduceMotion = useReducedMotion()
  const [offset, setOffset] = React.useState({ x: 0, y: 0 })
  const enableMagnetic = magnetic ?? variant === 'primary'
  const canAnimate = !reduceMotion && enableMagnetic

  const handleMouseMove = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onMouseMove?.(event as React.MouseEvent<HTMLButtonElement>)
      if (!canAnimate) return
      // Skip magnetic pull on touch — no hover cursor to follow.
      if (window.matchMedia('(pointer: coarse)').matches) return
      const rect = event.currentTarget.getBoundingClientRect()
      const x = event.clientX - (rect.left + rect.width / 2)
      const y = event.clientY - (rect.top + rect.height / 2)
      const distance = Math.hypot(x, y) || 1
      const pull = Math.min(distance / 4, MAGNETIC_MAX)
      setOffset({ x: (x / distance) * pull, y: (y / distance) * pull })
    },
    [canAnimate, onMouseMove],
  )

  const handleMouseLeave = React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      onMouseLeave?.(event as React.MouseEvent<HTMLButtonElement>)
      setOffset({ x: 0, y: 0 })
    },
    [onMouseLeave],
  )

  const renderInner = (content: React.ReactNode) => {
    const labelContent = (
      <span className="relative inline-flex flex-col overflow-hidden leading-none">
        <span
          className={cn(
            'transition-transform duration-150',
            canAnimate && 'group-hover/btn:-translate-y-full',
          )}
        >
          {content}
        </span>
        {canAnimate && (
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-y-full transition-transform duration-150 group-hover/btn:translate-y-0"
          >
            {content}
          </span>
        )}
      </span>
    )

    const arrowElement = arrow ? (
      <ArrowRight
        aria-hidden="true"
        weight="bold"
        className={cn(
          'transition-transform duration-150',
          canAnimate && 'group-hover/btn:translate-x-1',
          variant === 'ghost' && 'group-hover/ghost:translate-x-1',
        )}
      />
    ) : null

    if (variant === 'ghost') {
      return (
        <>
          <span className="relative">
            {content}
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-150 group-hover/ghost:scale-x-100"
            />
          </span>
          {arrowElement}
        </>
      )
    }
    return (
      <>
        {labelContent}
        {arrowElement}
      </>
    )
  }

  if (asChild) {
    // Merge the button styling onto the child element (e.g. Next.js Link)
    // and rebuild its content with the label/arrow decoration.
    const child = React.Children.only(children) as React.ReactElement<{
      children?: React.ReactNode
    }>
    return (
      <motion.span
        className="group/btn inline-flex"
        animate={canAnimate ? { x: offset.x, y: offset.y } : undefined}
        transition={SPRING_SOFT}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <Slot
          className={cn(buttonVariants({ variant, size }), className)}
          {...(props as React.HTMLAttributes<HTMLElement>)}
        >
          {React.cloneElement(child, undefined, renderInner(child.props.children))}
        </Slot>
      </motion.span>
    )
  }

  return (
    <motion.button
      type={props.type ?? 'button'}
      className={cn('group/btn', buttonVariants({ variant, size }), className)}
      animate={canAnimate ? { x: offset.x, y: offset.y } : undefined}
      transition={SPRING_SOFT}
      whileTap={{ scale: 0.97 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...stripNativeDragHandlers(props)}
    >
      {renderInner(children)}
    </motion.button>
  )
}
Button.displayName = 'Button'

/** Icon-only button. Always provide an aria-label. */
function IconButton({
  className,
  children,
  ref,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  ref?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        'border-line-dark hover:border-indigo-glow hover:text-paper-50 data-[surface=light]:border-graphite-900/25 data-[surface=light]:hover:border-akros-indigo data-[surface=light]:hover:text-graphite-900 inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border text-mist-400 transition-colors duration-150 data-[surface=light]:text-slate-600 [&_svg]:size-5',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
IconButton.displayName = 'IconButton'

export { Button, IconButton, buttonVariants }
