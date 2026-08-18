// app/confirm/page.tsx
'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

// Separate component that uses useSearchParams
function ConfirmContent() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('No confirmation token provided.')
      return
    }

    const confirmSubscription = async () => {
      try {
        const response = await fetch('/api/newsletter/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        })

        const data = await response.json()

        if (response.ok) {
          setStatus('success')
          setMessage(data.message || 'Subscription confirmed successfully!')
        } else {
          setStatus('error')
          setMessage(data.error || 'Failed to confirm subscription.')
        }
      } catch (error) {
        setStatus('error')
        setMessage('An error occurred. Please try again.')
      }
    }

    confirmSubscription()
  }, [token])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f9fc] p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg border border-[rgba(196,165,110,0.2)]">
        <img 
          src="https://res.cloudinary.com/dp7piqlbe/image/upload/f_png,q_auto,w_400/logo.webp" 
          alt="Pori Pori Serengeti" 
          className="max-w-[180px] mx-auto mb-6"
        />
        
        {status === 'loading' && (
          <>
            <div className="text-5xl mb-4">⏳</div>
            <h1 className="font-serif text-2xl font-light text-[#2C2418] mb-4">
              Confirming your subscription...
            </h1>
            <div className="w-12 h-12 border-4 border-[#C4A56E] border-t-transparent rounded-full animate-spin mx-auto"></div>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-5xl mb-4">✅</div>
            <h1 className="font-serif text-2xl font-light text-[#2C2418] mb-4">
              Subscription Confirmed!
            </h1>
            <p className="text-[#5A4E3E] mb-6">
              {message}
            </p>
            <p className="text-[#5A4E3E] text-sm mb-6">
              You'll now receive exclusive offers, safari insights, and stories from the heart of the Serengeti.
            </p>
            <Link 
              href="/" 
              className="inline-block bg-[#C4A56E] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#B8944F] transition-colors"
            >
              Visit Our Website
            </Link>
          </>
        )}
        
        {status === 'error' && (
          <>
            <div className="text-5xl mb-4">❌</div>
            <h1 className="font-serif text-2xl font-light text-[#2C2418] mb-4">
              Something Went Wrong
            </h1>
            <p className="text-[#5A4E3E] mb-6">
              {message}
            </p>
            <div className="space-y-3">
              <Link 
                href="/" 
                className="inline-block bg-[#C4A56E] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#B8944F] transition-colors w-full"
              >
                Return to Home
              </Link>
              <Link 
                href="/#subscribe" 
                className="inline-block bg-transparent text-[#C4A56E] px-8 py-3 rounded-md font-semibold hover:bg-[#FBF8F4] transition-colors w-full border border-[#C4A56E]"
              >
                Try Subscribing Again
              </Link>
            </div>
          </>
        )}
        
        <div className="mt-8 pt-6 border-t border-[#E8E0D8] text-xs text-[#8B7A64]">
          <p>Pori Pori Serengeti · Serengeti, Tanzania</p>
        </div>
      </div>
    </div>
  )
}

// Main page component with Suspense boundary
export default function ConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#f6f9fc] p-4">
        <div className="bg-white rounded-xl p-8 max-w-md w-full text-center shadow-lg">
          <div className="w-12 h-12 border-4 border-[#C4A56E] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-[#5A4E3E] mt-4">Loading...</p>
        </div>
      </div>
    }>
      <ConfirmContent />
    </Suspense>
  )
}