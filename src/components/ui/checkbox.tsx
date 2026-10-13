'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from '@phosphor-icons/react'
import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Checkbox — Radix Checkbox restyled to Meridian tokens.
 * ConsentCheckbox pairs it with consent copy (never pre-checked).
 */

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(function Checkbox({ className, ...props }, ref) {
  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer border-line bg-ink hover:border-lime data-[state=checked]:border-lime data-[state=checked]:bg-lime flex size-[22px] min-h-[22px] min-w-[22px] shrink-0 cursor-pointer items-center justify-center rounded-[6px] border transition-colors duration-150 focus-visible:outline-2',
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="text-ink flex items-center justify-center">
        <Check aria-hidden="true" weight="bold" className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

function ConsentCheckbox({
  id,
  label,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & { label: React.ReactNode }) {
  const generatedId = React.useId()
  const checkboxId = id ?? generatedId
  return (
    <div className={cn('flex items-start gap-3', className)}>
      <Checkbox id={checkboxId} {...props} />
      <label htmlFor={checkboxId} className="text-fog cursor-pointer text-sm leading-relaxed">
        {label}
      </label>
    </div>
  )
}

export { Checkbox, ConsentCheckbox }
