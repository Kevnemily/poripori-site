'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSafaris } from '@/hooks/useData'

export default function SafarisPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Fetch safaris from Supabase
  const { safaris: safariPackages, loading } = useSafaris()
  
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
          <p className="text-taupe font-light">Loading safaris...</p>
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
          <img src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" alt="Pori Pori Serengeti - Luxury Safari Lodge Logo" className="h-10 md:h-12 w-auto" width="48" height="48" fetchPriority="high" />
        </Link>
        
        <ul className="hidden lg:flex gap-8 list-none">
          <li><Link href="/#about" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>About</Link></li>
          <li><Link href="/safaris" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#B8944F]' : 'text-[#D4BC8D]'}`}>Safaris</Link></li>
          <li><Link href="/#experiences" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Experiences</Link></li>
          <li><Link href="/cuisines" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Cuisine</Link></li>
          <li><Link href="/rooms" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Stay</Link></li>
          <li><Link href="/gallery" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Gallery</Link></li>
          <li><Link href="/blog" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Blog</Link></li>
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
          <Link href="/safaris" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light opacity-100" onClick={() => setMobileMenuOpen(false)}>Safaris</Link>
          <Link href="/#experiences" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Experiences</Link>
          <Link href="/cuisines" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Cuisine</Link>
          <Link href="/rooms" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Stay</Link>
          <Link href="/gallery" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link href="/blog" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <button 
            onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
            className="mt-4 bg-transparent border border-[#C4A56E] text-[#C4A56E] px-6 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#C4A56E] hover:text-white font-sans"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* ============================================================
      PAGE HEADER
      ============================================================ */}
      <section className="relative h-[35vh] min-h-[250px] overflow-hidden bg-dark">
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp"
            alt="Pori Pori Serengeti Safari Packages"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-[0.6rem] tracking-[6px] text-[#D4BC8D] uppercase font-sans font-light mb-3">
            Safari Packages
          </p>
          <h1 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-light text-white mb-2 drop-shadow-xl">
            Curated Safari Adventures
          </h1>
          <p className="text-white/80 text-sm md:text-base font-light max-w-2xl drop-shadow-lg">
            Discover our handcrafted safari experiences designed to bring you closer to the magic of the Serengeti
          </p>
        </div>
      </section>

      {/* ============================================================
      SAFARI PACKAGES GRID
      ============================================================ */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#FBF8F4]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8 md:mb-10">
            <p className="text-[0.6rem] tracking-[6px] text-[#C4A56E] uppercase font-medium mb-2">
              Choose Your Adventure
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-normal text-[#2C2418] mb-2">
              Every Safari Tells a Story
            </h2>
            <p className="text-[#8B7A64] text-sm font-light max-w-2xl mx-auto">
              From dramatic river crossings to intimate romantic escapes, find the safari that speaks to your soul
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {safariPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-[rgba(196,165,110,0.1)]"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={`${pkg.title} - Pori Pori Serengeti`}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    loading="lazy"
                    width="600"
                    height="400"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/1e293b/fcd34d?text=Pori+Pori'
                    }}
                  />
                  <div className="absolute top-3 right-3 bg-[#1A1510]/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-light tracking-wide">
                    {pkg.price}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3">
                    <span className="text-white/90 text-xs font-light tracking-wide flex items-center gap-1.5">
                      <i className="fas fa-clock text-[#D4BC8D] text-[0.6rem]"></i>
                      {pkg.duration}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif text-lg font-medium text-[#2C2418] mb-1 group-hover:text-[#C4A56E] transition-colors duration-300 line-clamp-1">
                    {pkg.title}
                  </h3>
                  <p className="text-[#8B7A64] text-xs font-light leading-relaxed mb-2 line-clamp-2">
                    {pkg.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {Array.isArray(pkg.highlights) ? (
                      pkg.highlights.map((highlight, idx) => (
                        <span key={idx} className="text-[0.45rem] tracking-[1px] uppercase text-[#8B7A64] bg-[#FBF8F4] px-2 py-0.5 rounded-full border border-[#E0D5C8]">
                          {highlight}
                        </span>
                      ))
                    ) : (
                      <span className="text-[0.45rem] tracking-[1px] uppercase text-[#8B7A64] bg-[#FBF8F4] px-2 py-0.5 rounded-full border border-[#E0D5C8]">
                        {pkg.highlights}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/safaris/${pkg.slug}`}
                    className="inline-flex items-center gap-1.5 text-[#C4A56E] text-[0.6rem] tracking-[2px] uppercase font-medium group-hover:gap-2 transition-all duration-300 hover:text-[#B8944F]"
                  >
                    View Details <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1 text-[0.5rem]"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      WHY CHOOSE US SECTION
      ============================================================ */}
      <section className="py-12 md:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-8">
            <p className="text-[0.6rem] tracking-[6px] text-[#C4A56E] uppercase font-medium mb-2">
              Why Pori Pori
            </p>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.8rem)] font-normal text-[#2C2418] mb-2">
              The Pori Pori Difference
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center p-4 border border-[rgba(196,165,110,0.15)] rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-[#C4A56E]/10 rounded-full text-[#C4A56E]">
                <i className="fas fa-users text-xl"></i>
              </div>
              <h3 className="font-serif text-base font-medium text-[#2C2418] mb-1">Expert Guides</h3>
              <p className="text-[#8B7A64] text-xs font-light">Decades of wildlife tracking experience</p>
            </div>

            <div className="text-center p-4 border border-[rgba(196,165,110,0.15)] rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-[#C4A56E]/10 rounded-full text-[#C4A56E]">
                <i className="fas fa-car-side text-xl"></i>
              </div>
              <h3 className="font-serif text-base font-medium text-[#2C2418] mb-1">Private Vehicles</h3>
              <p className="text-[#8B7A64] text-xs font-light">Exclusive game drives with customized vehicles</p>
            </div>

            <div className="text-center p-4 border border-[rgba(196,165,110,0.15)] rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-[#C4A56E]/10 rounded-full text-[#C4A56E]">
                <i className="fas fa-utensils text-xl"></i>
              </div>
              <h3 className="font-serif text-base font-medium text-[#2C2418] mb-1">Gourmet Dining</h3>
              <p className="text-[#8B7A64] text-xs font-light">Bush breakfasts and starlit dinners</p>
            </div>

            <div className="text-center p-4 border border-[rgba(196,165,110,0.15)] rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 mx-auto mb-3 flex items-center justify-center bg-[#C4A56E]/10 rounded-full text-[#C4A56E]">
                <i className="fas fa-leaf text-xl"></i>
              </div>
              <h3 className="font-serif text-base font-medium text-[#2C2418] mb-1">Sustainable Tourism</h3>
              <p className="text-[#8B7A64] text-xs font-light">Conservation and community support</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[5%] py-8 md:py-12 px-4 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-6 md:my-8">
        <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] font-light mb-3">Ready for Your Safari Adventure?</h2>
        <p className="text-white/60 mb-4 text-sm">Let us help you choose the perfect safari package for your dreams</p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-white text-[#1A1510] px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white/90 hover:scale-105 font-sans font-medium shadow-lg"
        >
          Contact Our Safari Experts
        </button>
      </div>

      {/* ============================================================
      BOOKING MODAL
      ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[4500] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-none my-8">
            <div className="bg-[#1A1510] p-6 text-white text-center relative sticky top-0 z-10">
              <h3 className="font-serif text-xl font-normal">Reserve Your Safari</h3>
              <p className="text-sm text-white/60 mt-1">Fill in the details below and our team will respond within 12 hours</p>
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-5 text-white text-2xl cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Close modal"
              >
                &times;
              </button>
            </div>

            <form className="p-6" onSubmit={handleSubmit}>
              {/* ... rest of the form ... */}
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