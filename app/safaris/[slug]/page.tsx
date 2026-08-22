'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useSafari } from '@/hooks/useData'
import type { SafariPackage } from '@/types'

export default function SafariDetailsPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Fetch safari from Supabase
  const { safari: selectedPackage, loading } = useSafari(slug)
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [lightboxTitle, setLightboxTitle] = useState('')
  
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

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [lightboxOpen])

  // ============================================================
  // LIGHTBOX FUNCTIONS
  // ============================================================
  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxImage(src)
    setLightboxTitle(alt)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
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

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-taupe font-light">Loading safari details...</p>
        </div>
      </div>
    )
  }

  // Not found state
  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif text-charcoal mb-2">Safari Not Found</h1>
          <Link href="/safaris" className="text-gold hover:text-[#B8944F] transition-colors">
            ← Back to Safaris
          </Link>
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
          <li><Link href="/safaris" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Safaris</Link></li>
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
          <Link href="/safaris" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Safaris</Link>
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
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-dark">
        <div className="absolute inset-0">
          <img
            src={selectedPackage.image}
            alt={selectedPackage.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-[0.6rem] tracking-[6px] text-gold-light uppercase font-sans font-light mb-4">
            Safari Package
          </p>
          <h1 className="font-serif text-[clamp(2.5rem,6vw,4.5rem)] font-light text-white mb-3 drop-shadow-xl">
            {selectedPackage.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-white/80 text-sm font-light">
            <span className="flex items-center gap-2">
              <i className="fas fa-clock text-gold-light"></i>
              {selectedPackage.duration}
            </span>
            <span className="text-white/30">|</span>
            <span className="text-gold-light font-medium">{selectedPackage.price}</span>
          </div>
        </div>
      </section>

      {/* ============================================================
      DETAILS SECTION
      ============================================================ */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#FBF8F4]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div>
                <h2 className="font-serif text-2xl md:text-3xl font-normal text-charcoal mb-4">
                  Safari Overview
                </h2>
                <p className="text-taupe text-sm md:text-base font-light leading-relaxed whitespace-pre-line">
                  {(selectedPackage as any).full_description || selectedPackage.description}
                </p>
              </div>

              {/* Itinerary */}
              {selectedPackage.itinerary && selectedPackage.itinerary.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-normal text-charcoal mb-4">
                    Itinerary
                  </h2>
                  <div className="space-y-4">
                    {selectedPackage.itinerary.map((item: any, idx: number) => (
                      <div key={idx} className="bg-white rounded-xl p-6 border border-[rgba(196,165,110,0.15)] hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold font-serif text-sm font-medium">
                            {item.day}
                          </div>
                          <div>
                            <h3 className="font-serif text-lg font-medium text-charcoal mb-1">
                              {item.title}
                            </h3>
                            <p className="text-taupe text-sm font-light leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gallery with Lightbox */}
              {selectedPackage.images && selectedPackage.images.length > 0 && (
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-normal text-charcoal mb-4">
                    Gallery
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {selectedPackage.images.map((img: any, idx: number) => (
                      <div 
                        key={idx} 
                        className="aspect-[4/3] overflow-hidden bg-sand cursor-pointer relative group"
                        onClick={() => openLightbox(img.src, img.alt)}
                      >
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <i className="fas fa-expand"></i>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <p className="text-white text-xs font-light tracking-wide truncate">{img.alt}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-center text-taupe text-xs font-light mt-3">
                    Click any image to view larger
                  </p>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl p-6 border border-[rgba(196,165,110,0.15)] sticky top-6">
                <h3 className="font-serif text-xl font-medium text-charcoal mb-4">
                  Quick Info
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="text-[0.55rem] tracking-[2px] uppercase text-gold font-medium mb-1">
                      Duration
                    </p>
                    <p className="text-taupe text-sm font-light">{selectedPackage.duration}</p>
                  </div>
                  
                  <div>
                    <p className="text-[0.55rem] tracking-[2px] uppercase text-gold font-medium mb-1">
                      Price
                    </p>
                    <p className="text-charcoal text-lg font-serif">{selectedPackage.price}</p>
                  </div>
                  
                  {(selectedPackage as any).best_time && (
                    <div>
                      <p className="text-[0.55rem] tracking-[2px] uppercase text-gold font-medium mb-1">
                        Best Time
                      </p>
                      <p className="text-taupe text-sm font-light">{(selectedPackage as any).best_time}</p>
                    </div>
                  )}
                  
                  {(selectedPackage as any).group_size && (
                    <div>
                      <p className="text-[0.55rem] tracking-[2px] uppercase text-gold font-medium mb-1">
                        Group Size
                      </p>
                      <p className="text-taupe text-sm font-light">{(selectedPackage as any).group_size}</p>
                    </div>
                  )}
                  
                  {selectedPackage.accommodation && (
                    <div>
                      <p className="text-[0.55rem] tracking-[2px] uppercase text-gold font-medium mb-1">
                        Accommodation
                      </p>
                      <p className="text-taupe text-sm font-light">{selectedPackage.accommodation}</p>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-[rgba(196,165,110,0.15)]">
                  <button
                    onClick={() => setModalOpen(true)}
                    className="w-full bg-[#C4A56E] text-white px-6 py-3 text-[0.65rem] tracking-[3px] uppercase hover:bg-[#B8944F] transition-colors font-sans"
                  >
                    Book This Safari
                  </button>
                  <Link
                    href="/safaris"
                    className="w-full inline-block text-center mt-3 text-gold text-[0.65rem] tracking-[2px] uppercase hover:text-[#B8944F] transition-colors font-sans"
                  >
                    ← Back to All Safaris
                  </Link>
                </div>
              </div>

              {/* Includes */}
              {selectedPackage.includes && selectedPackage.includes.length > 0 && (
                <div className="bg-white rounded-xl p-6 border border-[rgba(196,165,110,0.15)]">
                  <h3 className="font-serif text-lg font-medium text-charcoal mb-3">
                    What's Included
                  </h3>
                  <ul className="space-y-2">
                    {selectedPackage.includes.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2 text-taupe text-sm font-light">
                        <i className="fas fa-check text-gold text-xs mt-1 flex-shrink-0"></i>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              <div className="bg-white rounded-xl p-6 border border-[rgba(196,165,110,0.15)]">
                <h3 className="font-serif text-lg font-medium text-charcoal mb-3">
                  Highlights
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedPackage.highlights.map((highlight: string, idx: number) => (
                    <span key={idx} className="text-[0.55rem] tracking-[1px] uppercase text-taupe bg-[#FBF8F4] px-3 py-1.5 rounded-full border border-[#E0D5C8]">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[5%] py-8 md:py-12 lg:py-16 px-4 md:px-8 text-center bg-gradient-to-br from-dark to-[#2C2418] text-white my-6 md:my-8 lg:my-12">
        <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light mb-3">
          Ready for Your {selectedPackage.title}?
        </h2>
        <p className="text-white/60 mb-4 text-sm md:text-base">
          Let our safari experts help you customize this package to your preferences
        </p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-white text-[#1A1510] px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white/90 hover:scale-105 font-sans font-medium shadow-lg"
        >
          Inquire About This Safari
        </button>
      </div>

      {/* ============================================================
      LIGHTBOX
      ============================================================ */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/98 z-[5000] flex items-center justify-center cursor-pointer"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-8 right-8 text-white text-4xl opacity-70 hover:opacity-100 hover:rotate-90 transition-all duration-300 font-light z-[2]"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            &times;
          </button>
          <div className="relative max-w-[90%] max-h-[90vh]">
            <img 
              src={lightboxImage} 
              alt={lightboxTitle}
              className="max-w-full max-h-[85vh] object-contain animate-[zoomIn_0.3s_ease]"
            />
            {lightboxTitle && (
              <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center text-white whitespace-nowrap">
                <p className="text-sm font-light opacity-80">{lightboxTitle}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ============================================================
      BOOKING MODAL
      ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[4500] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-none my-8">
            <div className="bg-[#1A1510] p-6 text-white text-center relative sticky top-0 z-10">
              <h3 className="font-serif text-xl font-normal">Book {selectedPackage.title}</h3>
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
              {/* ... rest of form (unchanged) ... */}
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}