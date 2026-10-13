'use client'

import { Check, UploadSimple } from '@phosphor-icons/react'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { ConsentCheckbox } from '@/components/ui/checkbox'
import { Field, Input, Textarea } from '@/components/ui/field'
import { FieldSelect } from './field-select'
import { TurnstileWidget } from './turnstile-widget'
import { cn } from '@/lib/utils'

/**
 * Job application form — fields + CV upload (PDF/DOC/DOCX, ≤4MB),
 * submitted as multipart form data to /api/careers.
 */

const ROLES = [
  'Senior Recruiter (RPO)',
  'Executive Virtual Assistant',
  'Bookkeeper',
  'Paralegal Professional',
  'Web Developer',
  'Something else',
]

const MAX_CV_BYTES = 4 * 1024 * 1024

export function ApplicationForm() {
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [role, setRole] = React.useState('')
  const [linkedin, setLinkedin] = React.useState('')
  const [note, setNote] = React.useState('')
  const [cv, setCv] = React.useState<File | null>(null)
  const [consent, setConsent] = React.useState(false)
  const [errors, setErrors] = React.useState<Record<string, string>>({})
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [serverError, setServerError] = React.useState('')
  const [turnstileToken, setTurnstileToken] = React.useState('')
  const fileRef = React.useRef<HTMLInputElement>(null)

  const validate = (): boolean => {
    const next: Record<string, string> = {}
    if (name.trim().length < 2) next.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = 'Please enter a valid email address.'
    if (!role) next.role = 'Please choose a role.'
    if (!cv) next.cv = 'Please attach your CV.'
    else if (cv.size > MAX_CV_BYTES) next.cv = 'Your CV must be under 4MB.'
    if (!consent) next.consent = 'Please consent so we can contact you.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')
    setServerError('')
    const form = new FormData()
    form.set('name', name.trim())
    form.set('email', email.trim())
    form.set('role', role)
    form.set('linkedin', linkedin.trim())
    form.set('note', note.trim())
    form.set('website', '')
    form.set('turnstileToken', turnstileToken)
    if (cv) form.set('cv', cv)
    try {
      const res = await fetch('/api/careers', { method: 'POST', body: form })
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
        className="border-line-dark bg-ink-800 rounded-[24px] border p-8 text-center md:p-12"
        role="status"
      >
        <span className="bg-aurora-teal/15 text-aurora-teal mx-auto flex size-14 items-center justify-center rounded-full">
          <Check aria-hidden="true" weight="bold" className="size-6" />
        </span>
        <h2 className="font-display text-paper-50 mt-6 text-2xl font-semibold">
          Application received
        </h2>
        <p className="mx-auto mt-3 max-w-md leading-relaxed text-mist-400">
          Thanks, {name.split(' ')[0]}. We review every application ourselves and reply to the ones
          that fit — usually within a week.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={submit}
      noValidate
      className="border-line-dark bg-ink-800 rounded-[24px] border p-6 md:p-10"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Priya Sharma"
            autoComplete="name"
          />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="priya@example.com"
            autoComplete="email"
          />
        </Field>
        <Field label="Role" error={errors.role}>
          <FieldSelect
            value={role}
            onValueChange={setRole}
            placeholder="Which role fits you?"
            options={ROLES.map((r) => ({ value: r, label: r }))}
          />
        </Field>
        <Field label="LinkedIn" hint="Optional">
          <Input
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            placeholder="linkedin.com/in/…"
            autoComplete="url"
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="CV" error={errors.cv} hint="PDF or Word, under 4MB.">
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className={cn(
              'border-line-dark hover:border-indigo-glow flex w-full cursor-pointer items-center gap-4 rounded-[12px] border border-dashed px-4 py-5 text-left transition-colors',
              errors.cv && 'border-signal-coral',
            )}
          >
            <UploadSimple aria-hidden="true" className="size-6 shrink-0 text-mist-400" />
            <span className="text-[15px] text-mist-400">
              {cv ? (
                <span className="text-paper-50 font-medium">{cv.name}</span>
              ) : (
                'Choose your CV file…'
              )}
            </span>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            aria-label="Upload your CV"
            onChange={(e) => {
              setCv(e.target.files?.[0] ?? null)
              setErrors((prev) => ({ ...prev, cv: '' }))
            }}
          />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Anything we should know?" hint="Optional — 2–3 sentences is plenty.">
          <Textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Your experience, your availability, why Akrostech…"
          />
        </Field>
      </div>
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <input type="text" tabIndex={-1} autoComplete="off" name="website" />
      </div>
      <div className="mt-5">
        <ConsentCheckbox
          checked={consent}
          onCheckedChange={(v) => {
            setConsent(v === true)
            setErrors((prev) => ({ ...prev, consent: '' }))
          }}
          label="You can contact me about this application."
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
          {status === 'sending' ? 'Sending…' : 'Submit application'}
        </Button>
      </div>
    </form>
  )
}
