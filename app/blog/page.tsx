'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import { useBlogPosts } from '@/hooks/useData'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  content: string
}

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Fetch blog posts from Supabase
  const { posts: blogPosts, loading } = useBlogPosts()
  
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    fullName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    roomTypes: [
      { type: 'Single', quantity: 0, selected: false },
      { type: 'Double', quantity: 0, selected: false },
      { type: 'Twin (2 people)', quantity: 0, selected: false },
      { type: 'Triple (3 people)', quantity: 0, selected: false },
      { type: 'Family (4-6 people)', quantity: 0, selected: false }
    ],
    adults: 1,
    children6to11: 0,
    childrenUnder6: 0,
    specialRequests: '',
    includeSafari: false,
    safariDescription: ''
  })

  // ============================================================
  // EFFECTS
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ============================================================
  // FORM HANDLERS - Optimized with useCallback
  // ============================================================
  const handleRoomTypeToggle = useCallback((index: number) => {
    setBookingForm(prev => {
      const updatedRoomTypes = [...prev.roomTypes]
      updatedRoomTypes[index].selected = !updatedRoomTypes[index].selected
      if (!updatedRoomTypes[index].selected) {
        updatedRoomTypes[index].quantity = 0
      } else {
        updatedRoomTypes[index].quantity = 1
      }
      return { ...prev, roomTypes: updatedRoomTypes }
    })
  }, [])

  const handleRoomTypeChange = useCallback((index: number, value: number) => {
    setBookingForm(prev => {
      const updatedRoomTypes = [...prev.roomTypes]
      updatedRoomTypes[index].quantity = Math.max(0, Math.min(10, value))
      return { ...prev, roomTypes: updatedRoomTypes }
    })
  }, [])

  const handleFormChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setBookingForm(prev => ({ ...prev, [name]: checked }))
    } else {
      setBookingForm(prev => ({ ...prev, [name]: value }))
    }
  }, [])

  // ============================================================
  // HANDLE SUBMIT - Optimized
  // ============================================================
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    
    const selectedRooms = bookingForm.roomTypes.filter(r => r.selected === true && r.quantity > 0)
    
    if (selectedRooms.length === 0) {
      alert('Please select at least one room type and specify quantity.')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingForm,
          roomTypes: selectedRooms,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send booking request')
      }

      alert('Thank you! Your booking request has been submitted. We will contact you within 12 hours.')
      setModalOpen(false)
      
      setBookingForm({
        fullName: '',
        email: '',
        checkIn: '',
        checkOut: '',
        roomTypes: [
          { type: 'Single', quantity: 0, selected: false },
          { type: 'Double', quantity: 0, selected: false },
          { type: 'Twin (2 people)', quantity: 0, selected: false },
          { type: 'Triple (3 people)', quantity: 0, selected: false },
          { type: 'Family (4-6 people)', quantity: 0, selected: false }
        ],
        adults: 1,
        children6to11: 0,
        childrenUnder6: 0,
        specialRequests: '',
        includeSafari: false,
        safariDescription: ''
      })
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('There was an error submitting your request. Please try again or contact us directly.')
    } finally {
      setIsSubmitting(false)
    }
  }, [bookingForm])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-taupe font-light">Loading blog posts...</p>
        </div>
      </div>
    )
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      {/* ============================================================
      NAVIGATION
      ============================================================ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`} role="navigation" aria-label="Main navigation">
        <Link href="/" className="nav-brand" aria-label="Pori Pori Home">
          <img src="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_120/v1786809435/logo.webp" alt="Pori Pori Serengeti - Luxury Safari Lodge Logo" className="h-10 md:h-12 w-auto" width="48" height="48" fetchPriority="high" />
        </Link>
        
        <ul className="hidden lg:flex gap-8 list-none">
          <li><Link href="/#about" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>About</Link></li>
          <li><Link href="/safaris" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Safaris</Link></li>
          <li><Link href="/#experiences" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Experiences</Link></li>
          <li><Link href="/cuisines" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Cuisine</Link></li>
          <li><Link href="/rooms" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Stay</Link></li>
          <li><Link href="/gallery" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Gallery</Link></li>
          <li><Link href="/blog" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#B8944F]' : 'text-[#D4BC8D]'}`}>Blog</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setModalOpen(true)}
            className={`hidden md:inline-block bg-transparent px-5 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 font-sans border ${scrolled ? 'border-[#2C2418] text-[#2C2418] hover:bg-[#2C2418] hover:text-white' : 'border-white text-white hover:bg-white hover:text-[#1A1510]'}`}
            aria-label="Book your luxury safari at Pori Pori"
          >
            Reserve
          </button>
          <button 
            className={`lg:hidden text-xl cursor-pointer ${scrolled ? 'text-[#2C2418]' : 'text-white'}`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle mobile menu"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* ============================================================
      MOBILE NAVIGATION
      ============================================================ */}
      <div className={`fixed top-0 right-0 w-4/5 max-w-xs h-screen bg-[#1A1510] z-[1500] transition-all duration-500 ease-in-out shadow-xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} role="navigation" aria-label="Mobile navigation">
        <button 
          className="absolute top-4 right-4 text-white text-xl cursor-pointer opacity-60 hover:opacity-100"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <Link href="/#about" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/safaris" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Safaris</Link>
          <Link href="/#experiences" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Experiences</Link>
          <Link href="/cuisines" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Cuisine</Link>
          <Link href="/rooms" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Stay</Link>
          <Link href="/gallery" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link href="/blog" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light opacity-100" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <button 
            onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
            className="mt-4 bg-transparent border border-[#C4A56E] text-[#C4A56E] px-6 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#C4A56E] hover:text-white font-sans"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* ============================================================
      HERO SECTION
      ============================================================ */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-[#2C2418] flex items-center" aria-label="Blog hero banner">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_1920/v1786826166/birds.webp')" }}>
            <div className="absolute inset-0 bg-black/70" />
          </div>
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white">
          <p className="text-[0.6rem] tracking-[8px] text-[#D4BC8D] uppercase font-light mb-3 drop-shadow-lg">Stories</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light drop-shadow-xl">Our Blog</h1>
          <p className="text-white/80 font-light max-w-2xl mx-auto mt-3 text-sm md:text-base drop-shadow-lg">
            Insights and stories from the heart of the Serengeti
          </p>
        </div>
      </section>

      {/* ============================================================
      BLOG POSTS GRID
      ============================================================ */}
      <section className="py-16 md:py-20 bg-[#FFFDF9]" aria-label="Blog posts">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post, index) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.id}`}
                className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl no-underline"
              >
                <div className="relative h-[220px] overflow-hidden bg-[#F3EDE4]">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    loading={index < 2 ? 'eager' : 'lazy'}
                    fetchPriority={index === 0 ? 'high' : 'auto'}
                    decoding={index === 0 ? 'sync' : 'async'}
                    width="600"
                    height="400"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/1e293b/fcd34d?text=Pori+Pori'
                    }}
                  />
                  <div className="absolute top-4 left-4 bg-[#C4A56E]/90 text-white text-[0.6rem] tracking-[2px] uppercase px-3 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[0.65rem] text-[#8B7A64] font-light mb-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.read_time}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#2C2418] mb-2 line-clamp-2 group-hover:text-[#C4A56E] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#8B7A64] text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#C4A56E] text-[0.7rem] tracking-[2px] uppercase font-medium mt-4 group-hover:gap-3 transition-all duration-300">
                    Read More <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[5%] py-8 md:py-12 lg:py-16 px-4 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-6 md:my-8 lg:my-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light mb-3">Plan Your Safari Adventure</h2>
        <p className="text-white/60 mb-4 text-sm md:text-base">Let us help you create the perfect Serengeti experience</p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-white text-[#1A1510] px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white/90 hover:scale-105 font-sans font-medium shadow-lg inline-block no-underline"
        >
          Inquire About Availability
        </button>
      </div>

      {/* ============================================================
      BOOKING MODAL
      ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[4500] flex items-center justify-center p-4 overflow-y-auto" role="dialog" aria-label="Booking form">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-none my-8">
            <div className="bg-[#1A1510] p-6 text-white text-center relative sticky top-0 z-10">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-normal">Reserve Your Safari</h3>
              <p className="text-sm text-white/60 mt-1">Fill in the details below and our team will respond within 12 hours</p>
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-5 text-white text-2xl cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Close booking form"
              >
                &times;
              </button>
            </div>

            <form className="p-6" onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={bookingForm.fullName}
                  onChange={handleFormChange}
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={bookingForm.email}
                  onChange={handleFormChange}
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-in *</label>
                  <input
                    type="date"
                    name="checkIn"
                    required
                    value={bookingForm.checkIn}
                    onChange={handleFormChange}
                    className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                  />
                </div>
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-out *</label>
                  <input
                    type="date"
                    name="checkOut"
                    required
                    value={bookingForm.checkOut}
                    onChange={handleFormChange}
                    className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                  />
                </div>
              </div>

              <div className="mb-4 bg-[#FBF8F4] p-4 rounded border border-[#E0D5C8]">
                <p className="text-[0.55rem] tracking-[3px] uppercase text-[#8B7A64] mb-3 font-medium">Guest Details</p>
                <p className="text-xs text-[#8B7A64] mb-3 font-light">
                  <span className="font-medium text-[#2C2418]">Adults:</span> 12 years and older &nbsp;|&nbsp; 
                  <span className="font-medium text-[#2C2418]">Children:</span> 6-11 years &nbsp;|&nbsp; 
                  <span className="font-medium text-[#2C2418]">Infants:</span> Under 6 years
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-[0.55rem] tracking-[2px] uppercase text-[#8B7A64] block mb-1">Adults (12+) *</label>
                    <select
                      name="adults"
                      value={bookingForm.adults}
                      onChange={handleFormChange}
                      className="w-full p-2.5 border border-[#E0D5C8] bg-white font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                    >
                      {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[0.55rem] tracking-[2px] uppercase text-[#8B7A64] block mb-1">Children (6-11 yrs)</label>
                    <select
                      name="children6to11"
                      value={bookingForm.children6to11}
                      onChange={handleFormChange}
                      className="w-full p-2.5 border border-[#E0D5C8] bg-white font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                    >
                      {[0,1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-[0.55rem] tracking-[2px] uppercase text-[#8B7A64] block mb-1">Infants (Under 6)</label>
                    <select
                      name="childrenUnder6"
                      value={bookingForm.childrenUnder6}
                      onChange={handleFormChange}
                      className="w-full p-2.5 border border-[#E0D5C8] bg-white font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                    >
                      {[0,1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-2">Room Types *</label>
                <p className="text-xs text-[#8B7A64] mb-3 font-light">Select room types and specify quantity needed</p>
                <div className="space-y-3">
                  {bookingForm.roomTypes.map((room, index) => (
                    <div key={index} className="bg-[#FFFDF9] border border-[#E0D5C8] p-3 rounded transition-all duration-200 hover:border-[#C4A56E]">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={room.selected}
                          onChange={() => handleRoomTypeToggle(index)}
                          className="w-4 h-4 accent-[#C4A56E] cursor-pointer"
                          id={`room-${index}`}
                        />
                        <label htmlFor={`room-${index}`} className="text-sm text-[#2C2418] flex-1 cursor-pointer">
                          {room.type}
                        </label>
                        {room.selected && (
                          <div className="flex items-center gap-2 animate-[fadeIn_0.3s_ease]">
                            <label className="text-[0.55rem] tracking-[2px] uppercase text-[#8B7A64]">Qty:</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={room.quantity || 1}
                              onChange={(e) => handleRoomTypeChange(index, parseInt(e.target.value) || 1)}
                              className="w-16 p-1.5 border border-[#E0D5C8] bg-white text-sm text-center focus:outline-none focus:border-[#C4A56E] transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="includeSafari"
                    checked={bookingForm.includeSafari}
                    onChange={handleFormChange}
                    className="w-4 h-4 accent-[#C4A56E] cursor-pointer"
                  />
                  <span className="text-sm text-[#2C2418]">Include a Safari Trip</span>
                </label>
              </div>

              {bookingForm.includeSafari && (
                <div className="mb-4 animate-[fadeIn_0.3s_ease]">
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Describe Your Safari *</label>
                  <textarea
                    name="safariDescription"
                    required={bookingForm.includeSafari}
                    value={bookingForm.safariDescription}
                    onChange={handleFormChange}
                    rows={3}
                    className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                    placeholder="e.g., 3-day wildlife safari, balloon safari, cultural visits, etc."
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={bookingForm.specialRequests}
                  onChange={handleFormChange}
                  rows={3}
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                  placeholder="Dietary needs, room preferences, celebration requests, accessibility requirements..."
                />
              </div>

              <div className="flex flex-wrap gap-4 justify-end border-t border-[#F3EDE4] pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-transparent border border-[#D4C5B5] px-5 py-2.5 text-[0.65rem] tracking-[3px] uppercase cursor-pointer font-sans hover:border-[#C4A56E] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#C4A56E] border-none text-white px-6 py-2.5 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-colors hover:bg-[#B8944F] font-sans ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i> Sending...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}