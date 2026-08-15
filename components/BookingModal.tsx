'use client'

import { useState } from 'react'

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    adults: 1,
    children: 0,
    specialRequests: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const result = await response.json()

      if (response.ok) {
        alert('✅ Booking request sent successfully! We will contact you within 12 hours.')
        onClose()
        setFormData({
          name: '',
          email: '',
          checkIn: '',
          checkOut: '',
          adults: 1,
          children: 0,
          specialRequests: ''
        })
      } else {
        alert('❌ ' + (result.error || 'Something went wrong. Please try again.'))
      }
    } catch (error) {
      alert('❌ Unable to send request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/95 z-[2000] flex items-center justify-center">
      <div className="bg-white max-w-md w-[90%] max-h-[85vh] overflow-y-auto">
        <div className="bg-[#1A1510] p-6 text-white text-center relative">
          <h3 className="text-xl font-serif font-normal">Reserve Your Safari</h3>
          <p className="text-sm text-white/60 mt-1">Our team will respond within 12 hours</p>
          <button 
            onClick={onClose}
            className="absolute top-4 right-5 text-white text-2xl cursor-pointer"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9]"
              placeholder="Your name"
            />
          </div>

          <div className="mb-4">
            <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Email Address</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9]"
              placeholder="hello@example.com"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-in</label>
              <input
                type="date"
                required
                value={formData.checkIn}
                onChange={(e) => setFormData({...formData, checkIn: e.target.value})}
                className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9]"
              />
            </div>
            <div>
              <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-out</label>
              <input
                type="date"
                required
                value={formData.checkOut}
                onChange={(e) => setFormData({...formData, checkOut: e.target.value})}
                className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Adults</label>
              <select
                value={formData.adults}
                onChange={(e) => setFormData({...formData, adults: parseInt(e.target.value)})}
                className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9]"
              >
                {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Children</label>
              <select
                value={formData.children}
                onChange={(e) => setFormData({...formData, children: parseInt(e.target.value)})}
                className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9]"
              >
                {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Special Requests</label>
            <textarea
              rows={2}
              value={formData.specialRequests}
              onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
              className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9]"
              placeholder="Dietary needs, room preferences..."
            />
          </div>

          <div className="flex gap-4 justify-end border-t border-[#F3EDE4] pt-4">
            <button
              type="button"
              onClick={onClose}
              className="bg-transparent border border-[#D4C5B5] px-5 py-2.5 text-[0.65rem] tracking-[3px] uppercase cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#C4A56E] border-none text-white px-6 py-2.5 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-colors hover:bg-[#B8944F] disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}