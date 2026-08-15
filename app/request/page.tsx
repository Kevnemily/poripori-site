'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'

const requestSchema = z.object({
  property: z.string().min(1, 'Please select a property'),
  checkIn: z.string().min(1, 'Please select check-in date'),
  checkOut: z.string().min(1, 'Please select check-out date'),
  guests: z.number().min(1, 'At least 1 guest').max(10, 'Maximum 10 guests'),
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Valid phone number required'),
  specialRequests: z.string().optional(),
})

type RequestFormData = z.infer<typeof requestSchema>

export default function Request() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const { register, handleSubmit, formState: { errors }, reset } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema)
  })

  const onSubmit = async (data: RequestFormData) => {
    setStatus('loading')
    
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      if (response.ok) {
        setStatus('success')
        reset()
        // Auto-hide success message after 5 seconds
        setTimeout(() => {
          setStatus('idle')
        }, 5000)
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <>
      {/* ============================================================
      PAGE HEADER
      ============================================================ */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-[#2C2418] flex items-center">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp')" }}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white">
          <p className="text-[0.6rem] tracking-[8px] text-[#D4BC8D] uppercase font-light mb-3">Book Your Stay</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">Request a Room</h1>
          <p className="text-white/70 font-light max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Fill in your details and we will get back to you within 24 hours
          </p>
        </div>
      </section>

      {/* ============================================================
      REQUEST FORM
      ============================================================ */}
      <section className="py-16 md:py-20 bg-[#FFFDF9]">
        <div className="container mx-auto px-4 md:px-8 max-w-2xl">
          
          {/* Success Message */}
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6 flex items-center gap-3">
              <i className="fas fa-check-circle text-green-500 text-xl"></i>
              <span>✅ Request sent successfully! We will contact you soon.</span>
            </div>
          )}
          
          {/* Error Message */}
          {status === 'error' && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6 flex items-center gap-3">
              <i className="fas fa-exclamation-circle text-red-500 text-xl"></i>
              <span>❌ Something went wrong. Please try again or contact us directly.</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 md:p-8 rounded-xl shadow-lg border border-[rgba(196,165,110,0.15)]">
            {/* Property Selection */}
            <div>
              <label className="block font-medium mb-2 text-[#2C2418]">
                Select Property <span className="text-[#C4A56E]">*</span>
              </label>
              <select
                {...register('property')}
                className="w-full p-3 border border-[#E0D5C8] rounded-lg focus:ring-2 focus:ring-[#C4A56E] focus:border-[#C4A56E] transition-all duration-300 bg-[#FFFDF9] text-[#2C2418]"
              >
                <option value="">Choose a property</option>
                <option value="lodge">Pori Pori Lodge</option>
                <option value="camp">Pori Pori Camp</option>
              </select>
              {errors.property && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.property.message}
                </p>
              )}
            </div>
            
            {/* Dates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-2 text-[#2C2418]">
                  Check-in <span className="text-[#C4A56E]">*</span>
                </label>
                <input
                  type="date"
                  {...register('checkIn')}
                  className="w-full p-3 border border-[#E0D5C8] rounded-lg focus:ring-2 focus:ring-[#C4A56E] focus:border-[#C4A56E] transition-all duration-300 bg-[#FFFDF9] text-[#2C2418]"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.checkIn && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle text-xs"></i> {errors.checkIn.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block font-medium mb-2 text-[#2C2418]">
                  Check-out <span className="text-[#C4A56E]">*</span>
                </label>
                <input
                  type="date"
                  {...register('checkOut')}
                  className="w-full p-3 border border-[#E0D5C8] rounded-lg focus:ring-2 focus:ring-[#C4A56E] focus:border-[#C4A56E] transition-all duration-300 bg-[#FFFDF9] text-[#2C2418]"
                  min={new Date().toISOString().split('T')[0]}
                />
                {errors.checkOut && (
                  <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle text-xs"></i> {errors.checkOut.message}
                  </p>
                )}
              </div>
            </div>
            
            {/* Guests */}
            <div>
              <label className="block font-medium mb-2 text-[#2C2418]">
                Number of Guests <span className="text-[#C4A56E]">*</span>
              </label>
              <input
                type="number"
                min="1"
                max="10"
                {...register('guests', { valueAsNumber: true })}
                className="w-full p-3 border border-[#E0D5C8] rounded-lg focus:ring-2 focus:ring-[#C4A56E] focus:border-[#C4A56E] transition-all duration-300 bg-[#FFFDF9] text-[#2C2418]"
              />
              {errors.guests && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.guests.message}
                </p>
              )}
            </div>
            
            {/* Personal Details */}
            <div>
              <label className="block font-medium mb-2 text-[#2C2418]">
                Full Name <span className="text-[#C4A56E]">*</span>
              </label>
              <input
                type="text"
                {...register('name')}
                className="w-full p-3 border border-[#E0D5C8] rounded-lg focus:ring-2 focus:ring-[#C4A56E] focus:border-[#C4A56E] transition-all duration-300 bg-[#FFFDF9] text-[#2C2418]"
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.name.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block font-medium mb-2 text-[#2C2418]">
                Email Address <span className="text-[#C4A56E]">*</span>
              </label>
              <input
                type="email"
                {...register('email')}
                className="w-full p-3 border border-[#E0D5C8] rounded-lg focus:ring-2 focus:ring-[#C4A56E] focus:border-[#C4A56E] transition-all duration-300 bg-[#FFFDF9] text-[#2C2418]"
                placeholder="hello@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.email.message}
                </p>
              )}
            </div>
            
            <div>
              <label className="block font-medium mb-2 text-[#2C2418]">
                Phone Number <span className="text-[#C4A56E]">*</span>
              </label>
              <input
                type="tel"
                {...register('phone')}
                className="w-full p-3 border border-[#E0D5C8] rounded-lg focus:ring-2 focus:ring-[#C4A56E] focus:border-[#C4A56E] transition-all duration-300 bg-[#FFFDF9] text-[#2C2418]"
                placeholder="+255 123 456 789"
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                  <i className="fas fa-exclamation-circle text-xs"></i> {errors.phone.message}
                </p>
              )}
            </div>
            
            {/* Special Requests */}
            <div>
              <label className="block font-medium mb-2 text-[#2C2418]">
                Special Requests
              </label>
              <textarea
                {...register('specialRequests')}
                rows={4}
                className="w-full p-3 border border-[#E0D5C8] rounded-lg focus:ring-2 focus:ring-[#C4A56E] focus:border-[#C4A56E] transition-all duration-300 bg-[#FFFDF9] text-[#2C2418]"
                placeholder="Dietary requirements, celebration plans, special occasions, room preferences..."
              />
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-[#C4A56E] hover:bg-[#B8944F] text-white font-semibold py-3 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === 'loading' ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Send Request
                </>
              )}
            </button>
            
            {/* Footer text */}
            <p className="text-center text-[0.7rem] text-[#8B7A64] font-light mt-4">
              <i className="fas fa-lock mr-1 text-[#C4A56E]"></i>
              Your information is secure and will only be used for booking purposes.
            </p>
          </form>
          
          {/* Alternative Contact */}
          <div className="mt-8 text-center">
            <p className="text-[#8B7A64] font-light text-sm">
              Prefer to speak with us directly?
            </p>
            <a href="tel:+255754430599" className="text-[#C4A56E] hover:text-[#B8944F] transition-colors font-medium">
              <i className="fas fa-phone mr-2"></i> +255 754 430 599
            </a>
            <span className="text-[#8B7A64] mx-2">|</span>
            <a href="mailto:reservations@poripori.com" className="text-[#C4A56E] hover:text-[#B8944F] transition-colors font-medium">
              <i className="fas fa-envelope mr-2"></i> reservations@poripori.com
            </a>
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[5%] py-8 md:py-12 lg:py-16 px-4 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-6 md:my-8 lg:my-12">
        <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light mb-3">Explore Our Accommodations</h2>
        <p className="text-white/60 mb-4 text-sm md:text-base">Discover our luxury canvas suites and safari experiences</p>
        <Link href="/rooms" className="bg-transparent border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#1A1510] hover:border-white inline-block no-underline">
          View Rooms
        </Link>
      </div>

      {/* ============================================================
      FOOTER
      ============================================================ */}
      <footer className="bg-[#1A1510] text-white/60 pt-12 pb-8 px-[5%] max-w-[100vw] overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-['Cormorant_Garamond'] text-xl font-normal mb-3">Pori Pori</h3>
              <p className="text-sm text-white/40 font-light">
                An intimate ultra-luxury safari sanctuary in the heart of the Serengeti. Where golden light meets untamed wilderness.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Home</Link></li>
                <li><Link href="/#about" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">About</Link></li>
                <li><Link href="/cuisines" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Cuisine</Link></li>
                <li><Link href="/rooms" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Suites</Link></li>
                <li><Link href="/gallery" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Gallery</Link></li>
                <li><Link href="/blog" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Contact</h4>
              <ul className="space-y-2">
                <li><a href="mailto:reservations@poripori.com" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">reservations@poripori.com</a></li>
                <li><a href="tel:+255754430599" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">+255 754 430 599</a></li>
                <li><span className="text-white/40 text-sm font-light">Serengeti, Tanzania</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Privacy Policy</a></li>
                <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Terms & Conditions</a></li>
                <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-4 text-center text-[0.65rem] text-white/25 font-light tracking-[1px]">
            <p>&copy; {new Date().getFullYear()} Pori Pori Serengeti — All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}