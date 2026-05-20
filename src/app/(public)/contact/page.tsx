import type { Metadata } from 'next'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'
import { EnquiryForm } from '@/components/properties/enquiry-form'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with the Axis Concept team. Visit our Bangalore office, call us, or send an enquiry online.',
}

const contactDetails = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 96061 16110',
    href: 'tel:+919606116110',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'sales@axisconcept.in',
    href: 'mailto:sales@axisconcept.in',
  },
  {
    icon: MapPin,
    label: 'Office',
    value: 'Bangalore, Karnataka, India',
    href: null,
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon – Sat, 9:00 AM – 6:00 PM',
    href: null,
  },
]

export default function ContactPage() {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="mb-14">
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#C9A96E] mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#F5F0E8] mb-4">Contact Us</h1>
          <p className="font-sans text-base text-[#A89F94] max-w-xl">
            Whether you&apos;re looking to buy, invest, or just want to know more about our projects —
            our team is ready to help.
          </p>
        </div>

        {/* Two-column */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 xl:gap-20">

          {/* LEFT — contact details + map */}
          <div className="space-y-10">

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-5 rounded-xl border border-[#2E3447] bg-[#1A1F2E]">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-[#C9A96E]/10 flex items-center justify-center">
                    <Icon size={18} className="text-[#C9A96E]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-sans text-xs text-[#A89F94] uppercase tracking-wide mb-1">{label}</p>
                    {href ? (
                      <a href={href} className="font-sans text-sm text-[#F5F0E8] hover:text-[#C9A96E] transition-colors">
                        {value}
                      </a>
                    ) : (
                      <p className="font-sans text-sm text-[#F5F0E8]">{value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map */}
            <div>
              <h2 className="font-serif text-2xl text-[#F5F0E8] mb-4">Find Us</h2>
              <div className="rounded-xl overflow-hidden border border-[#2E3447] aspect-video">
                <iframe
                  title="Axis Concept office location"
                  src="https://maps.google.com/maps?q=Bangalore,+Karnataka,+India&output=embed&z=12"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map of Bangalore showing Axis Concept office area"
                />
              </div>
            </div>
          </div>

          {/* RIGHT — enquiry form */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <EnquiryForm sourcePage="/contact" />
          </div>
        </div>
      </div>
    </div>
  )
}
