'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Form primitives — every input is labelled, errors are announced via
 * aria-live, and nothing relies on placeholder text.
 */

/* ——— Field: label + hint + error wiring ——— */

const FieldContext = React.createContext<{ id: string; error?: string }>({ id: '' })

function useField() {
  return React.useContext(FieldContext)
}

function Field({
  label,
  hint,
  error,
  required,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  label: string
  hint?: string
  error?: string
  required?: boolean
}) {
  const id = React.useId()
  const inputId = `${id}-input`
  const hintId = `${id}-hint`
  const errorId = `${id}-error`

  return (
    <FieldContext.Provider value={{ id: inputId, error }}>
      <div className={cn('flex flex-col gap-2', className)} {...props}>
        <label htmlFor={inputId} className="text-cream text-sm font-medium">
          {label}
          {required && (
            <span aria-hidden="true" className="text-coral ml-1">
              *
            </span>
          )}
        </label>
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child as React.ReactElement<Record<string, unknown>>, {
                id: inputId,
                'aria-describedby': cn(hint && hintId, error && errorId) || undefined,
                'aria-invalid': !!error,
                required,
              })
            : child,
        )}
        {hint && !error && (
          <p id={hintId} className="text-fog text-sm">
            {hint}
          </p>
        )}
        {error && (
          <p id={errorId} role="alert" className="text-coral text-sm font-medium">
            {error}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  )
}

/* ——— Input / Textarea ——— */

const inputClass =
  'w-full rounded-[12px] border border-line bg-ink px-4 py-3 text-cream placeholder:text-mute transition-colors duration-150 hover:border-cream/40 focus:border-lime focus:outline-none     aria-[invalid=true]:border-coral min-h-[44px]'

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    return <input ref={ref} className={cn(inputClass, className)} {...props} />
  },
)

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={4}
      className={cn(inputClass, 'min-h-[120px] resize-y', className)}
      {...props}
    />
  )
})

export { Field, Input, Textarea, inputClass }
