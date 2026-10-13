'use client'

import { Check } from '@phosphor-icons/react'
import * as React from 'react'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { ConsentCheckbox } from '@/components/ui/checkbox'
import { Field, Input, Textarea } from '@/components/ui/field'
import { FieldSelect } from './field-select'
import { TurnstileWidget } from './turnstile-widget'

/**
 * Contact form — validates client-side with Zod, submits to /api/contact,
 * shows inline errors, a success state, and honest failure messages.
 */

const formSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter a valid email address.'),
  company: z.string().trim().optional(),
  service: z.string().optional(),
  message: z.string().trim().min(20, 'Tell us a little more (20+ characters).'),
})

type FormState = z.infer<typeof formSchema>
type Errors = Partial<Record<keyof FormState | 'consent', string>>

const SERVICE_OPTIONS = [
  'Website Development',
  'Recruitment Process Outsourcing',
  'Virtual Assistance',
  'Accounting Outsourcing',
  'Legal Process Outsourcing',
  'Not sure yet',
]

export function ContactForm({ defaultService }: { defaultService?: string }) {
  const [values, setValues] = React.useState<FormState>({
    name: '',
    email: '',
    company: '',
    service: defaultService ?? '',
    message: '',
  })
  const [consent, setConsent] = React.useState(false)
  const [errors, setErrors] = React.useState<Errors>({})
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [serverError, setServerError] = React.useState('')
  const [turnstileToken, setTurnstileToken] = React.useState('')

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((v) => ({ ...v, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = formSchema.safeParse(values)
    const fieldErrors: Errors = {}
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormState
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
      }
    }
    if (!consent) fieldErrors.consent = 'Please consent so we can reply.'
    setErrors(fieldErrors)
    if (Object.keys(fieldErrors).length > 0 || !parsed.success) return
    setStatus('sending')
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ ...parsed.data, website: '', turnstileToken }),
      })
      const data = (await res.json()) as { ok?: boolean; error?: string }
      if (!res.ok || !data.ok) {
        setStatus('error')
        setServerError(data.error ?? 'Something went wrong. Please try again.')
        return
      }
      setStatus('sent')
    } catch {
      setStatus('error')
      setServerError('Could not reach the server. Check your connection and try again.')
    }
  }

  if (status === 'sent') {
    return (
      <div
        className="border-graphite-900/10 rounded-[24px] border bg-white p-8 text-center md:p-12"
        role="status"
      >
        <span className="bg-aurora-teal/15 text-aurora-teal mx-auto flex size-14 items-center justify-center rounded-full">
          <Check aria-hidden="true" weight="bold" className="size-6" />
        </span>
        <h2 className="font-display text-graphite-900 mt-6 text-2xl font-semibold">
          Message received
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-slate-600">
          Thanks, {values.name.split(' ')[0]}. We reply fast — usually within one business day. If
          it&apos;s urgent, call +1 (332) 287-0846.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="border-graphite-900/10 rounded-[24px] border bg-white p-6 md:p-10"
      data-surface="light"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <Input
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Jane Smith"
            autoComplete="name"
          />
        </Field>
        <Field label="Work email" error={errors.email}>
          <Input
            type="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="jane@company.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Company" hint="Optional">
          <Input
            value={values.company}
            onChange={(e) => set('company', e.target.value)}
            placeholder="Company Inc."
            autoComplete="organization"
          />
        </Field>
        <Field label="Service" hint="Optional">
          <FieldSelect
            value={values.service ?? ''}
            onValueChange={(v) => set('service', v)}
            placeholder="What can we help with?"
            options={SERVICE_OPTIONS.map((s) => ({ value: s, label: s }))}
            surface="light"
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="What hurts most?" error={errors.message} hint="A few sentences is plenty.">
          <Textarea
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder="We can’t hire fast enough, our books are a mess, our website embarrasses us…"
          />
        </Field>
      </div>
      {/* Honeypot — invisible to humans. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input type="text" tabIndex={-1} autoComplete="off" name="website" />
      </div>
      <div className="mt-5">
        <ConsentCheckbox
          checked={consent}
          onCheckedChange={(v) => {
            setConsent(v === true)
            setErrors((e) => ({ ...e, consent: undefined }))
          }}
          label="You can email me back about my inquiry."
        />
        {errors.consent && (
          <p role="alert" className="text-signal-coral mt-2 text-sm font-medium">
            {errors.consent}
          </p>
        )}
      </div>
      <TurnstileWidget onToken={setTurnstileToken} />
      {status === 'error' && (
        <p role="alert" className="text-signal-coral mt-4 text-sm font-medium">
          {serverError}
        </p>
      )}
      <div className="mt-6">
        <Button
          type="submit"
          size="lg"
          disabled={status === 'sending'}
          className="w-full sm:w-auto"
        >
          {status === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
      </div>
    </form>
  )
}
