'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
      } else {
        setStatus('error')
      }
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-bold text-center mb-4">
        Request a Room
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Fill in your details and we will get back to you within 24 hours
      </p>
      
      {status === 'success' && (
        <div className="bg-green-50 border border-green-200 text-green-700 p-4 rounded-lg mb-6">
          ✅ Request sent successfully! We will contact you soon.
        </div>
      )}
      
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-6">
          ❌ Something went wrong. Please try again.
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <label className="block font-medium mb-2">Select Property *</label>
          <select
            {...register('property')}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          >
            <option value="">Choose a property</option>
            <option value="lodge">Poripori Lodge</option>
            <option value="camp">Poripori Camp</option>
          </select>
          {errors.property && <p className="text-red-500 text-sm mt-1">{errors.property.message}</p>}
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-2">Check-in *</label>
            <input
              type="date"
              {...register('checkIn')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            {errors.checkIn && <p className="text-red-500 text-sm mt-1">{errors.checkIn.message}</p>}
          </div>
          <div>
            <label className="block font-medium mb-2">Check-out *</label>
            <input
              type="date"
              {...register('checkOut')}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            />
            {errors.checkOut && <p className="text-red-500 text-sm mt-1">{errors.checkOut.message}</p>}
          </div>
        </div>
        
        <div>
          <label className="block font-medium mb-2">Number of Guests *</label>
          <input
            type="number"
            min="1"
            max="10"
            {...register('guests', { valueAsNumber: true })}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          {errors.guests && <p className="text-red-500 text-sm mt-1">{errors.guests.message}</p>}
        </div>
        
        <div>
          <label className="block font-medium mb-2">Full Name *</label>
          <input
            type="text"
            {...register('name')}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        
        <div>
          <label className="block font-medium mb-2">Email *</label>
          <input
            type="email"
            {...register('email')}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>
        
        <div>
          <label className="block font-medium mb-2">Phone *</label>
          <input
            type="tel"
            {...register('phone')}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        
        <div>
          <label className="block font-medium mb-2">Special Requests</label>
          <textarea
            {...register('specialRequests')}
            rows={4}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-amber-500"
            placeholder="Dietary requirements, celebration plans, etc."
          />
        </div>
        
        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Send Request'}
        </button>
      </form>
    </div>
  )
}
