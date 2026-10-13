/**
 * Shared site data — M5.
 *
 * Industries now load from the CMS layer (Velite → content/industries/*.mdx).
 * Global FAQs live here until the client approves a dedicated FAQ collection;
 * they are site copy, not CMS-managed articles.
 */
import { cmsIndustriesAll } from '@/lib/content'

export interface Industry {
  slug: string
  name: string
  blurb: string
  pains: string[]
  services: string[]
}

const INDUSTRY_NAMES: Record<string, string> = {
  legal: 'Law Firms',
  healthcare: 'Healthcare',
  staffing: 'Staffing Agencies',
  'e-commerce': 'E-commerce',
  saas: 'SaaS',
  'real-estate': 'Real Estate',
}

export const industries: Industry[] = cmsIndustriesAll.map((i) => ({
  slug: i.slug,
  name: INDUSTRY_NAMES[i.slug] ?? i.title,
  blurb: i.blurb,
  pains: i.pains,
  services: i.services,
}))

export interface GlobalFaq {
  question: string
  answer: string
}

export const globalFaqs: GlobalFaq[] = [
  {
    question: 'How fast can we start?',
    answer:
      'Matching takes days, not months. Your professional is trained on your systems in the first week, with daily check-ins until the rhythm is set.',
  },
  {
    question: 'Who owns the work?',
    answer:
      'You do. Candidate records live in your ATS, code and designs are yours from day one, and books stay in your accounting software. If the engagement ends, everything stays.',
  },
  {
    question: 'Is my data secure?',
    answer:
      'NDAs, access controls, and confidentiality protocols are standard in every engagement — deepest where data is most sensitive, like financial and legal work.',
  },
  {
    question: 'Do you work my hours?',
    answer:
      'Yes. Our professionals align to EST, CST, MST, and PST, with an overnight follow-the-sun option for work you want done by morning.',
  },
  {
    question: 'What does it cost?',
    answer:
      'Less than a comparable U.S. hire — priced per resource or per project, quoted fixed in writing before work starts. No hourly surprises.',
  },
  {
    question: 'What if it\u2019s not working out?',
    answer:
      'You interview and approve every professional before they start. If the fit isn\u2019t right, we rematch — and regular reviews catch issues early.',
  },
  {
    question: 'How do you vet professionals?',
    answer:
      'Three ways: domain skill (tested, not claimed), written and spoken English, and reliability. Only people we\u2019d hire ourselves make it to your shortlist.',
  },
  {
    question: 'Can we scale up or down?',
    answer:
      'That\u2019s the point. Add hours, add people, add services — or scale back. Monthly reviews keep the engagement matched to what you actually need.',
  },
]
