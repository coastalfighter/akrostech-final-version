import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr'
import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Button — primary (lime pill), secondary (outline), ghost (text link).
 *
 * Hover: the arrow slides diagonally out and a fresh one slides in. Press
 * scales to 0.97. Focus uses the global lime ring. Every size keeps a 44px+
 * touch target. Pure CSS, so it renders on the server.
 */

const buttonVariants = cva(
  'group/btn relative inline-flex cursor-pointer items-center justify-center gap-3 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color,transform] duration-200 select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-lime text-ink hover:bg-cream',
        secondary:
          'border border-cream/25 text-cream hover:border-cream hover:bg-cream hover:text-ink',
        ghost: 'text-cream hover:text-lime',
      },
      size: {
        sm: 'min-h-[44px] px-5 text-sm',
        md: 'min-h-[52px] px-7 text-[15px]',
        lg: 'min-h-[60px] px-8 text-base',
      },
    },
    compoundVariants: [{ variant: 'ghost', className: 'px-0' }],
    defaultVariants: { variant: 'primary', size: 'md' },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  /** Merge the button styling onto a single child element (e.g. a Next.js Link). */
  asChild?: boolean
  /** Show the trailing arrow. Defaults to true. */
  arrow?: boolean
}

function ArrowSwap({ ghost }: { ghost: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'relative inline-flex size-5 shrink-0 items-center justify-center overflow-hidden',
        !ghost && 'rounded-full',
      )}
    >
      <ArrowUpRight
        weight="bold"
        className="absolute size-4 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5"
      />
      <ArrowUpRight
        weight="bold"
        className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0"
      />
    </span>
  )
}

function Button({
  className,
  variant = 'primary',
  size,
  asChild = false,
  arrow = true,
  children,
  type,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)
  const arrowEl = arrow ? <ArrowSwap ghost={variant === 'ghost'} /> : null

  if (asChild) {
    const child = React.Children.only(children) as React.ReactElement<{
      className?: string
      children?: React.ReactNode
    }>
    return React.cloneElement(
      child,
      { ...(props as Record<string, unknown>), className: cn(classes, child.props.className) },
      <>
        <span>{child.props.children}</span>
        {arrowEl}
      </>,
    )
  }

  return (
    <button type={type ?? 'button'} className={classes} {...props}>
      <span>{children}</span>
      {arrowEl}
    </button>
  )
}

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
        'border-cream/20 text-cream hover:border-lime hover:text-lime inline-flex min-h-[44px] min-w-[44px] cursor-pointer items-center justify-center rounded-full border transition-colors duration-200 [&_svg]:size-5',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export { Button, IconButton, buttonVariants }
