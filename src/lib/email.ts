import { Resend } from 'resend'
import { env } from './env'

/**
 * Email via Resend. All sends go through here so "from", logging, and the
 * not-configured path stay in one place.
 */

let client: Resend | null = null

export function isEmailConfigured(): boolean {
  return !!env.RESEND_API_KEY && !!env.RESEND_FROM_EMAIL
}

function getClient(): Resend {
  if (!client) client = new Resend(env.RESEND_API_KEY!)
  return client
}

export interface SendEmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
  attachments?: { filename: string; content: Buffer }[]
}

export async function sendEmail(options: SendEmailOptions): Promise<{ id: string }> {
  const { data, error } = await getClient().emails.send({
    from: env.RESEND_FROM_EMAIL!,
    to: options.to,
    subject: options.subject,
    html: options.html,
    replyTo: options.replyTo,
    attachments: options.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  })
  if (error) throw new Error(`Resend error: ${error.message}`)
  return { id: data?.id ?? 'unknown' }
}

/** Minimal HTML escaping for user input interpolated into emails. */
export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
