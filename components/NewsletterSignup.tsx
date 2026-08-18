// components/NewsletterSignup.tsx
'use client'

import { useState } from 'react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setStatus('error')
      setMessage('Please enter your email address.')
      return
    }

    setIsSubmitting(true)
    setStatus('idle')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setMessage('Thank you for subscribing! Please check your email to confirm.')
      setEmail('')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="flex-1 px-4 py-3 bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:border-gold transition-colors"
          required
          aria-label="Email address for newsletter"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-[#C4A56E] text-dark font-sans text-[0.65rem] tracking-[3px] uppercase hover:bg-[#B8944F] transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {status === 'success' && (
        <p className="mt-3 text-green-400 text-sm font-light">{message}</p>
      )}
      
      {status === 'error' && (
        <p className="mt-3 text-red-400 text-sm font-light">{message}</p>
      )}
    </div>
  )
}