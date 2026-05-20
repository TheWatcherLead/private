'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { MessageCircle, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/toast'

const schema = z.object({
  name:    z.string().min(2, 'Enter your full name'),
  phone:   z.string().min(10, 'Enter a valid phone number'),
  email:   z.string().email('Enter a valid email').optional().or(z.literal('')),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface EnquiryFormProps {
  propertyId?: string
  propertyTitle?: string
  sourcePage?: string
  whatsappPhone?: string
}

export function EnquiryForm({
  propertyId,
  propertyTitle,
  sourcePage = '/contact',
  whatsappPhone = '919606116110',
}: EnquiryFormProps) {
  const { showToast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          property_id: propertyId,
          source_page: sourcePage,
        }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error)
      showToast('Enquiry submitted! We\'ll be in touch shortly.', 'success')
      reset()
    } catch (err) {
      showToast(err instanceof Error ? err.message : 'Something went wrong.', 'error')
    }
  }

  const waMessage = propertyTitle
    ? `Hi, I'm interested in ${propertyTitle}. Can you share more details?`
    : "Hi, I'm interested in your properties. Can you help me?"

  return (
    <div className="rounded-2xl border border-[#2E3447] bg-[#1A1F2E] p-6">
      <h2 className="font-serif text-xl text-[#F5F0E8] mb-1">
        {propertyTitle ? 'Enquire About This Property' : 'Get in Touch'}
      </h2>
      <p className="font-sans text-sm text-[#A89F94] mb-6">
        Our team will reach out within 24 hours.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <Input
          label="Full Name"
          placeholder="Your name"
          required
          autoComplete="name"
          error={errors.name?.message}
          {...register('name')}
        />
        <Input
          label="Phone Number"
          type="tel"
          placeholder="+91 98765 43210"
          required
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone?.message}
          {...register('phone')}
        />
        <Input
          label="Email Address"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          inputMode="email"
          error={errors.email?.message}
          {...register('email')}
        />
        <Textarea
          label="Message"
          placeholder="Tell us what you're looking for..."
          rows={3}
          {...register('message')}
        />

        <Button
          type="submit"
          fullWidth
          loading={isSubmitting}
          className="mt-2"
        >
          <Send size={16} className="mr-2" aria-hidden="true" />
          Send Enquiry
        </Button>
      </form>

      {/* Divider */}
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-[#2E3447]" />
        <span className="font-sans text-xs text-[#A89F94]">or</span>
        <div className="flex-1 h-px bg-[#2E3447]" />
      </div>

      {/* WhatsApp CTA */}
      <a
        href={`https://wa.me/${whatsappPhone}?text=${encodeURIComponent(waMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full py-3 rounded font-sans text-sm font-medium bg-[#25D366]/10 text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
      >
        <MessageCircle size={18} aria-hidden="true" />
        Chat on WhatsApp
      </a>
    </div>
  )
}
