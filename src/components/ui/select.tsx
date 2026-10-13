'use client'

import * as SelectPrimitive from '@radix-ui/react-select'
import { CaretDown, Check } from '@phosphor-icons/react'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Select — Radix Select restyled to Meridian tokens, dark + light variants.
 * Fully keyboard operable (Arrow keys, Enter, Esc) via Radix.
 */

function Select({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root {...props} />
}

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & { error?: boolean }
>(function SelectTrigger({ className, children, error, ...props }, ref) {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      aria-invalid={!!error}
      className={cn(
        'border-line-dark bg-ink-950 text-paper-50 hover:border-indigo-glow/50 focus:border-indigo-glow data-[surface=light]:border-graphite-900/20 data-[surface=light]:text-graphite-900 aria-[invalid=true]:border-signal-coral flex min-h-[44px] w-full cursor-pointer items-center justify-between gap-2 rounded-[12px] border px-4 py-3 text-left transition-colors duration-150 focus:outline-none data-[placeholder]:text-mist-400/60 data-[surface=light]:bg-white',
        className,
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <CaretDown aria-hidden="true" weight="bold" className="size-4 shrink-0 text-mist-400" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
})

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(function SelectContent({ className, children, position = 'popper', ...props }, ref) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        position={position}
        className={cn(
          'glass z-50 max-h-72 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[12px] p-1 data-[surface=light]:bg-white/95',
          className,
        )}
        {...props}
      >
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
})

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(function SelectItem({ className, children, ...props }, ref) {
  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(
        'text-paper-50 data-[highlighted]:bg-akros-indigo/25 data-[surface=light]:text-graphite-900 data-[surface=light]:data-[highlighted]:bg-akros-indigo/10 relative flex cursor-pointer items-center justify-between gap-2 rounded-[8px] px-3 py-2.5 text-[15px] outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator>
        <Check aria-hidden="true" weight="bold" className="text-aurora-teal size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
})

const SelectValue = SelectPrimitive.Value

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue }
