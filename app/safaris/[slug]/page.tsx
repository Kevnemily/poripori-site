'use client'

import { useState, useEffect, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { useSafari } from '@/hooks/useData'
import type { SafariPackage } from '@/types'

// Country codes data - just the codes
const countryCodes = [
  '+1', '+44', '+61', '+64', '+27', '+254', '+255', '+256', '+250', '+233',
  '+234', '+91', '+86', '+81', '+82', '+55', '+52', '+33', '+49', '+39',
  '+34', '+31', '+46', '+47', '+45', '+358', '+30', '+351', '+41', '+43',
  '+32', '+48', '+420', '+36', '+7', '+966', '+971', '+65', '+60', '+62',
  '+63', '+66', '+84', '+54', '+56', '+57', '+51', '+212', '+216', '+20'
]

// Countries list
const countries = [
  'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda',
  'Argentina', 'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas',
  'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize',
  'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 'Brazil',
  'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cambodia',
  'Cameroon', 'Canada', 'Central African Republic', 'Chad', 'Chile', 'China',
  'Colombia', 'Comoros', 'Congo', 'Costa Rica', 'Croatia', 'Cuba',
  'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic',
  'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia',
  'Eswatini', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon',
  'Gambia', 'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada',
  'Guatemala', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Honduras',
  'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
  'Ireland', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jordan',
  'Kazakhstan', 'Kenya', 'Kiribati', 'Kuwait', 'Kyrgyzstan', 'Laos',
  'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein',
  'Lithuania', 'Luxembourg', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives',
  'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 'Mauritius', 'Mexico',
  'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
  'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands',
  'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'North Korea', 'North Macedonia',
  'Norway', 'Oman', 'Pakistan', 'Palau', 'Panama', 'Papua New Guinea',
  'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar',
  'Romania', 'Russia', 'Rwanda', 'Saint Kitts and Nevis', 'Saint Lucia',
  'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe',
  'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore',
  'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa',
  'South Korea', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname',
  'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 'Tanzania',
  'Thailand', 'Timor-Leste', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia',
  'Turkey', 'Turkmenistan', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates',
  'United Kingdom', 'United States', 'Uruguay', 'Uzbekistan', 'Vanuatu',
  'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
]

export default function SafariDetailsPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  
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
    phone: '',
    countryCode: '+255',
    country: '',
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

  // Handle loading state
  useEffect(() => {
    if (!loading) {
      setTimeout(() => setIsLoading(false), 400)
    }
  }, [loading])

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
          safariName: selectedPackage?.title,
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
        phone: '',
        countryCode: '+255',
        country: '',
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
  }, [bookingForm, selectedPackage])

  // ============================================================
  // LOADING SCREEN WITH ANIMATED LOGO
  // ============================================================
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-[#1A1510] flex flex-col items-center justify-center z-[9999]">
        <div className="absolute inset-0 bg-gold/5 blur-3xl rounded-full"></div>
        
        <div className="relative">
          <img 
            src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" 
            alt="Pori Pori Serengeti" 
            className="w-24 h-24 md:w-32 md:h-32 object-contain animate-[logoPulse_2s_ease-in-out_infinite]"
            style={{
              filter: 'drop-shadow(0 0 40px rgba(196, 165, 110, 0.2))'
            }}
          />
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-white/60 text-sm tracking-[0.3em] uppercase font-light animate-[fadeInUp_0.8s_ease-out]">
            Loading Safari Details
            <span className="inline-flex">
              <span className="animate-[bounce_1.4s_ease-in-out_infinite] ml-1" style={{ animationDelay: '0s' }}>.</span>
              <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}>.</span>
              <span className="animate-[bounce_1.4s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}>.</span>
            </span>
          </p>
        </div>

        <style jsx>{`
          @keyframes logoPulse {
            0%, 100% { 
              transform: scale(1); 
              opacity: 0.9;
            }
            50% { 
              transform: scale(1.08); 
              opacity: 1;
            }
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes bounce {
            0%, 80%, 100% { 
              transform: translateY(0);
              opacity: 0.3;
            }
            40% { 
              transform: translateY(-6px);
              opacity: 1;
            }
          }
        `}</style>
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

            {/* Sidebar - Sticky */}
            <div className="lg:col-span-1">
              <div className="space-y-6 sticky top-24">
                {/* Quick Info */}
                <div className="bg-white rounded-xl p-6 border border-[rgba(196,165,110,0.15)]">
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
      BOOKING MODAL - UPDATED WITH COUNTRY CODE & COUNTRY FIELD
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
              {/* Safari Name (Read-only) */}
              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Safari Package</label>
                <div className="w-full p-2.5 border border-[#E0D5C8] bg-[#FBF8F4] font-sans text-sm text-[#2C2418] font-medium">
                  {selectedPackage.title}
                </div>
              </div>

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

              {/* Phone Number with Country Code */}
              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Phone Number *</label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={bookingForm.countryCode}
                    onChange={handleFormChange}
                    className="w-28 flex-shrink-0 p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                    required
                  >
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={bookingForm.phone}
                    onChange={handleFormChange}
                    className="flex-1 p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                    placeholder="Phone number"
                  />
                </div>
                <p className="text-[0.55rem] text-[#8B7A64] mt-1 font-light">
                  We'll use this to contact you via WhatsApp
                </p>
              </div>

              {/* Country Selection */}
              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Country *</label>
                <select
                  name="country"
                  value={bookingForm.country}
                  onChange={handleFormChange}
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                  required
                >
                  <option value="">Select your country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
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

              {/* Guest Details - Improved Layout */}
              <div className="mb-4 bg-[#FBF8F4] p-4 rounded border border-[#E0D5C8]">
                <p className="text-[0.55rem] tracking-[3px] uppercase text-[#8B7A64] mb-3 font-medium">Guest Details</p>
                
                {/* Adults */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-[#2C2418]">Adults</label>
                    <span className="text-[0.55rem] text-[#8B7A64] font-light">12 years and older</span>
                  </div>
                  <select
                    name="adults"
                    value={bookingForm.adults}
                    onChange={handleFormChange}
                    className="w-full p-2.5 border border-[#E0D5C8] bg-white font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                {/* Children */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-[#2C2418]">Children</label>
                    <span className="text-[0.55rem] text-[#8B7A64] font-light">6 - 11 years</span>
                  </div>
                  <select
                    name="children6to11"
                    value={bookingForm.children6to11}
                    onChange={handleFormChange}
                    className="w-full p-2.5 border border-[#E0D5C8] bg-white font-sans text-sm focus:outline-none focus:border-[#C4A56E] transition-colors"
                  >
                    {[0,1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>

                {/* Infants */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-sm font-medium text-[#2C2418]">Infants</label>
                    <span className="text-[0.55rem] text-[#8B7A64] font-light">Under 6 years</span>
                  </div>
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
                  <span className="text-sm text-[#2C2418]">Add Additional Safari Activities</span>
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
        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}