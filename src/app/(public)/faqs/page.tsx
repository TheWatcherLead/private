import type { Metadata } from 'next'
import Link from 'next/link'
import { Accordion } from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Frequently asked questions about buying property with Axis Concept — process, pricing, RERA, site visits, and more.',
}

const faqSections = [
  {
    heading: 'Buying Process',
    items: [
      {
        question: 'How do I start the process of buying a property with Axis Concept?',
        answer:
          'The first step is a site visit. Contact us via the enquiry form, WhatsApp, or phone and our team will schedule a visit at your convenience. After the visit, we walk you through the booking process, payment schedule, and documentation requirements.',
      },
      {
        question: 'What documents do I need to book a property?',
        answer:
          'Typically you will need your PAN card, Aadhaar card, latest bank statements (6 months), and income proof (salary slips or IT returns). For NRI buyers, passport and overseas address proof are additionally required. Our team will provide a full checklist during the booking process.',
      },
      {
        question: 'Can I visit the site before making a decision?',
        answer:
          'Absolutely — we encourage site visits. You can request one via the "Request a Site Visit" button on any property page or by contacting us directly. We conduct guided tours Monday to Saturday between 10 AM and 5 PM.',
      },
      {
        question: 'What is the typical payment schedule for a residential property?',
        answer:
          'Payment schedules vary by project and are construction-linked. Typically, 10–20% is paid at booking, and the remaining amount is spread across construction milestones. Your sales consultant will provide the exact schedule for your chosen property.',
      },
    ],
  },
  {
    heading: 'RERA & Legal',
    items: [
      {
        question: 'Are Axis Concept projects RERA registered?',
        answer:
          'Yes. All our applicable projects are registered under the Karnataka Real Estate Regulatory Authority (K-RERA). The RERA registration number is displayed on each property listing page and in all project brochures.',
      },
      {
        question: 'What legal checks should I do before buying?',
        answer:
          'We recommend verifying the RERA registration, title deed, encumbrance certificate, and approved building plan. Axis Concept provides all required legal documents for due diligence. We also recommend engaging an independent property lawyer for your peace of mind.',
      },
    ],
  },
  {
    heading: 'Pricing & Finance',
    items: [
      {
        question: 'Are the prices listed on the website the final prices?',
        answer:
          'Prices displayed are indicative "starting from" values. The final price depends on the unit type, floor, facing, and any customisation options. Stamp duty, registration charges, and maintenance deposits are additional. Contact us for a detailed cost sheet.',
      },
      {
        question: 'Do you offer home loan assistance?',
        answer:
          'Yes. Axis Concept has tie-ups with leading banks and NBFCs including SBI, HDFC, ICICI, and Axis Bank. Our in-house finance team can assist you with the loan application process and documentation at no additional charge.',
      },
      {
        question: 'Is there any flexibility in pricing or payment terms?',
        answer:
          'We offer limited-time incentives and flexible payment schemes on select projects. Speak with your dedicated sales consultant to understand what is available for your chosen unit and timeline.',
      },
    ],
  },
  {
    heading: 'Construction & Possession',
    items: [
      {
        question: 'What is your track record on possession timelines?',
        answer:
          'On-time delivery is a core commitment at Axis Concept. Over 90% of our projects have been handed over on or before the promised possession date. Specific possession timelines are clearly stated in the sale agreement and RERA registration.',
      },
      {
        question: 'What quality of construction materials do you use?',
        answer:
          'We use only certified grade materials — AAC blocks for walls, branded sanitary ware (Kohler/Jaquar), premium flooring (Kajaria/RAK Ceramics), and CPVC plumbing. A full specification sheet is available for each project.',
      },
      {
        question: 'What warranty do you provide after possession?',
        answer:
          'We provide a 1-year defect liability period after possession during which any structural or finishing defects are rectified at no cost. Major structural warranty is 5 years as mandated by RERA.',
      },
    ],
  },
  {
    heading: 'NRI Buyers',
    items: [
      {
        question: 'Can NRIs buy property through Axis Concept?',
        answer:
          'Yes. NRIs and PIOs are eligible to purchase residential and commercial properties in India. We have a dedicated NRI sales team and can assist with power of attorney arrangements, NRE/NRO account transactions, and repatriation of funds.',
      },
      {
        question: 'Can I do a virtual site visit if I am abroad?',
        answer:
          'Absolutely. We offer high-resolution video walkthroughs and live virtual tours via Zoom or WhatsApp video call. Contact us to schedule a convenient time across your time zone.',
      },
    ],
  },
]

export default function FaqsPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">Help Centre</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-4">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-base text-[#A89F94] max-w-xl">
            Everything you need to know about buying property with Axis Concept. Can&apos;t find your answer?{' '}
            <Link href="/contact" className="text-[#C9A96E] hover:underline">Contact our team</Link>.
          </p>
        </div>

        {/* FAQ sections */}
        <div className="space-y-14">
          {faqSections.map(({ heading, items }) => (
            <section key={heading} aria-labelledby={`faq-${heading.replace(/\s+/g, '-').toLowerCase()}`}>
              <h2
                id={`faq-${heading.replace(/\s+/g, '-').toLowerCase()}`}
                className="font-serif text-2xl text-[#F5F0E8] mb-5 pb-3 border-b border-[#2E3447]"
              >
                {heading}
              </h2>
              <Accordion items={items} />
            </section>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 rounded-2xl bg-[#1A1F2E] border border-[#2E3447] p-8 md:p-12 text-center">
          <h2 className="font-serif text-3xl text-[#F5F0E8] mb-3">Still Have Questions?</h2>
          <p className="font-sans text-sm text-[#A89F94] max-w-md mx-auto mb-8">
            Our team is happy to answer any specific queries about our projects, pricing, or process.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg bg-[#C9A96E] text-[#0F1117] font-sans text-sm font-medium hover:bg-[#B8935A] transition-colors"
            >
              Send an Enquiry
            </Link>
            <a
              href="tel:+919606116110"
              className="px-6 py-3 rounded-lg border border-[#C9A96E] text-[#C9A96E] font-sans text-sm font-medium hover:bg-[#C9A96E] hover:text-[#0F1117] transition-colors"
            >
              Call +91 96061 16110
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
