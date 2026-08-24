'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSafaris } from '@/hooks/useData'

interface RoomType {
  type: string
  quantity: number
  selected: boolean
}

interface BookingFormData {
  fullName: string
  email: string
  checkIn: string
  checkOut: string
  roomTypes: RoomType[]
  adults: number
  children6to11: number
  childrenUnder6: number
  specialRequests: string
  includeSafari: boolean
  safariDescription: string
}

export default function SafarisPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  
  const { safaris: safariPackages, loading } = useSafaris()
  
  // Booking form state with proper typing
  const [bookingForm, setBookingForm] = useState<BookingFormData>({
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
      setShowWhatsApp(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fast loading - minimal delay
  useEffect(() => {
    if (!loading) {
      requestAnimationFrame(() => {
        setTimeout(() => setIsLoading(false), 100)
      })
    }
  }, [loading])

  // ============================================================
  // FORM HANDLERS - IMPROVED VERSION
  // ============================================================
  const handleRoomTypeToggle = useCallback((index: number) => {
    setBookingForm(prev => {
      const updatedRoomTypes = prev.roomTypes.map((room, i) => {
        if (i === index) {
          const newSelected = !room.selected
          return {
            ...room,
            selected: newSelected,
            quantity: newSelected ? 1 : 0
          }
        }
        return room
      })
      return { ...prev, roomTypes: updatedRoomTypes }
    })
  }, [])

  const handleRoomTypeChange = useCallback((index: number, value: number) => {
    setBookingForm(prev => {
      const updatedRoomTypes = prev.roomTypes.map((room, i) => {
        if (i === index) {
          return {
            ...room,
            quantity: Math.max(0, Math.min(10, value))
          }
        }
        return room
      })
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
  // HANDLE SUBMIT
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
          formType: 'safaris',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send booking request')
      }

      alert('Thank you! Your booking request has been submitted. We will contact you within 12 hours.')
      setModalOpen(false)
      
      // Reset form
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

  // ============================================================
  // LOADING SCREEN
  // ============================================================
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#1A1510] flex flex-col items-center justify-center z-[9999]">
        <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"></div>
        <div className="relative">
          <img 
            src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" 
            alt="Pori Pori Serengeti" 
            className="w-20 h-20 md:w-28 md:h-28 object-contain"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(196, 165, 110, 0.2))'
            }}
          />
        </div>
        <div className="mt-6 text-center">
          <p className="text-white/60 text-xs tracking-[0.3em] uppercase font-light">
            Loading Safaris
          </p>
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
      WHATSAPP FLOATING ACTION BUTTON
      ============================================================ */}
      <div className={`fixed bottom-6 right-6 z-[2000] transition-all duration-500 transform ${showWhatsApp ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-10 pointer-events-none'}`}>
        <a
          href="https://wa.me/255759638883"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(37,211,102,0.4)]"
          aria-label="Chat with us on WhatsApp"
        >
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] group-hover:bg-[#1DA851] transition-all duration-300">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 448 512" 
              className="w-7 h-7 fill-white"
            >
              <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.7 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
            </svg>
          </div>
          <span className="pr-5 font-medium text-sm tracking-wide hidden sm:inline-block">
            Chat with us
          </span>
        </a>
      </div>

      {/* ============================================================
      PAGE HEADER - Optimized with Next.js Image
      ============================================================ */}
      <section className="relative h-[35vh] min-h-[250px] overflow-hidden bg-dark">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp"
            alt="Pori Pori Serengeti Safari Packages"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
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
              <Link
                key={pkg.id}
                href={`/safaris/${pkg.slug}`}
                className="group bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-[rgba(196,165,110,0.1)] no-underline cursor-pointer block"
              >
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={`${pkg.title} - Pori Pori Serengeti`}
                    fill
                    className="object-cover transition-transform duration-600 group-hover:scale-105"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
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
                      pkg.highlights.slice(0, 3).map((highlight, idx) => (
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

                  <span className="inline-flex items-center gap-1.5 text-[#C4A56E] text-[0.6rem] tracking-[2px] uppercase font-medium group-hover:gap-2 transition-all duration-300">
                    View Details <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1 text-[0.5rem]"></i>
                  </span>
                </div>
              </Link>
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
      CTA SECTION - With Background Image
      ============================================================ */}
      <div className="relative mx-4 md:mx-[5%] py-12 md:py-16 lg:py-20 px-4 md:px-8 text-center overflow-hidden my-6 md:my-8 lg:my-12 min-h-[300px] md:min-h-[350px] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp"
            alt="Book Your Safari Adventure"
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 90vw"
            quality={90}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-serif text-[clamp(1.5rem,4vw,2.5rem)] font-light text-white mb-3 drop-shadow-lg">
            Ready for Your Safari Adventure?
          </h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-6 text-sm md:text-base font-light leading-relaxed drop-shadow-md">
            Let us help you choose the perfect safari package for your dreams
          </p>
          <button 
            onClick={() => setModalOpen(true)}
            className="bg-white text-[#1A1510] px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white/90 hover:scale-105 font-sans font-medium shadow-lg"
          >
            Contact Our Safari Experts
          </button>
        </div>
      </div>

      {/* ============================================================
      BOOKING MODAL - IMPROVED VERSION
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

              {/* ============================================================
              ROOM SELECTION - IMPROVED VERSION
              ============================================================ */}
              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-2">Room Types *</label>
                <p className="text-xs text-[#8B7A64] mb-3 font-light">Select room types and specify quantity needed</p>
                <div className="space-y-3">
                  {bookingForm.roomTypes.map((room, index) => (
                    <div 
                      key={index} 
                      className={`bg-[#FFFDF9] border p-3 rounded transition-all duration-200 ${
                        room.selected 
                          ? 'border-[#C4A56E] shadow-sm bg-[#FBF8F4]' 
                          : 'border-[#E0D5C8] hover:border-[#C4A56E]'
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-wrap">
                        <input
                          type="checkbox"
                          checked={room.selected}
                          onChange={() => handleRoomTypeToggle(index)}
                          className="w-4 h-4 accent-[#C4A56E] cursor-pointer shrink-0"
                          id={`room-${index}`}
                        />
                        <label 
                          htmlFor={`room-${index}`} 
                          className="text-sm text-[#2C2418] flex-1 cursor-pointer min-w-[100px]"
                        >
                          {room.type}
                        </label>
                        {room.selected && (
                          <div className="flex items-center gap-2 animate-[fadeIn_0.3s_ease] ml-auto bg-white px-2 py-1 rounded border border-[#E0D5C8]">
                            <label className="text-[0.55rem] tracking-[2px] uppercase text-[#8B7A64] shrink-0">Qty:</label>
                            <input
                              type="number"
                              min="1"
                              max="10"
                              value={room.quantity || 1}
                              onChange={(e) => handleRoomTypeChange(index, parseInt(e.target.value) || 1)}
                              className="w-16 p-1 border border-[#E0D5C8] bg-white text-sm text-center focus:outline-none focus:border-[#C4A56E] transition-colors rounded"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-[#8B7A64] mt-2 font-light">
                  <span className="text-[#C4A56E]">●</span> Selected rooms will be highlighted with gold border
                </p>
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