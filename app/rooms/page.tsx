'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Rooms() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeRoom, setActiveRoom] = useState('migration-double')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
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
  // HERO IMAGES - Memoized
  // ============================================================
  const heroImages = useMemo(() => [
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/tripple.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/twin2.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor3.webp'
  ], [])

  // ============================================================
  // ROOM CATEGORIES & DETAILS - Memoized
  // ============================================================
  const roomCategories = useMemo(() => [
    { id: 'migration-double', label: 'Migration Canvas Double' },
    { id: 'triple-canvas', label: 'Triple Canvas Suite' },
    { id: 'family-tent', label: 'Family Tent' }
  ], [])

  const roomDetails = useMemo(() => ({
    'migration-double': {
      title: 'Migration Canvas Double',
      items: [
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp',
          title: 'Bedroom',
          description: 'Spacious canvas suite with king-sized bed, handcrafted safari furnishings, and mesh windows that let in the sounds of the wilderness.',
          features: [
            { icon: 'fa-check', label: 'King-sized bed' },
            { icon: 'fa-check', label: 'Canvas walls' },
            { icon: 'fa-check', label: 'Safari furnishings' },
            { icon: 'fa-check', label: 'Solar lighting' }
          ]
        },
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786824083/bathroom3.webp',
          title: 'Bathroom',
          description: 'En-suite bathroom with safari-style bucket shower, eco-friendly toilet, hot water on demand, and premium natural toiletries.',
          features: [
            { icon: 'fa-check', label: 'Bucket shower' },
            { icon: 'fa-check', label: 'Eco-friendly WC' },
            { icon: 'fa-check', label: 'Hot water' },
            { icon: 'fa-check', label: 'Natural products' }
          ]
        },
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp',
          title: 'Outdoor Space',
          description: 'Private deck overlooking migration routes with comfortable chairs, perfect for wildlife viewing and African sunrises.',
          features: [
            { icon: 'fa-check', label: 'Private deck' },
            { icon: 'fa-check', label: 'Migration views' },
            { icon: 'fa-check', label: 'Shaded seating' },
            { icon: 'fa-check', label: 'Campfire nearby' }
          ]
        }
      ]
    },
    'triple-canvas': {
      title: 'Triple Canvas Suite',
      items: [
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/tripple.webp',
          title: 'Bedroom',
          description: 'Spacious suite designed for small groups with three comfortable single beds, ample storage, and large mesh windows.',
          features: [
            { icon: 'fa-check', label: 'Three single beds' },
            { icon: 'fa-check', label: 'Canvas construction' },
            { icon: 'fa-check', label: 'Seating area' },
            { icon: 'fa-check', label: 'Solar powered' }
          ]
        },
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786828361/tripplebathroom.webp',
          title: 'Bathroom',
          description: 'En-suite with hot shower, flushing toilet, hand basin, and eco-friendly toiletries providing comfort in the wilderness.',
          features: [
            { icon: 'fa-check', label: 'Hot shower' },
            { icon: 'fa-check', label: 'Flushing WC' },
            { icon: 'fa-check', label: 'Hand basin' },
            { icon: 'fa-check', label: 'Natural amenities' }
          ]
        },
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786828518/outdoor2.webp',
          title: 'Outdoor Space',
          description: 'Private veranda with seating for three, perfect for sharing stories while watching the Great Migration pass by.',
          features: [
            { icon: 'fa-check', label: 'Three-seat deck' },
            { icon: 'fa-check', label: 'Wildlife viewing' },
            { icon: 'fa-check', label: 'Sunrise platform' },
            { icon: 'fa-check', label: 'Evening campfire' }
          ]
        }
      ]
    },
    'family-tent': {
      title: 'Family Tent',
      items: [
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786828645/family2.webp',
          title: 'Bedroom',
          description: 'Two-bedroom family tent with queen beds in each room, shared lounge area, and an authentic safari atmosphere.',
          features: [
            { icon: 'fa-check', label: 'Two queen beds' },
            { icon: 'fa-check', label: 'Two bedrooms' },
            { icon: 'fa-check', label: 'Shared lounge' },
            { icon: 'fa-check', label: 'Cooling fans' }
          ]
        },
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786828688/shower.webp',
          title: 'Bathroom',
          description: 'Two private bathrooms with hot showers, flushing toilets, and family-friendly amenities for a comfortable stay.',
          features: [
            { icon: 'fa-check', label: 'Two showers' },
            { icon: 'fa-check', label: 'Two WCs' },
            { icon: 'fa-check', label: 'Family amenities' },
            { icon: 'fa-check', label: 'Hot water' }
          ]
        },
        {
          image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786828747/outdoorfamily.webp',
          title: 'Outdoor Space',
          description: 'Expansive private deck with outdoor seating for the whole family and stunning views of the Serengeti.',
          features: [
            { icon: 'fa-check', label: 'Family deck' },
            { icon: 'fa-check', label: 'Wildlife viewing' },
            { icon: 'fa-check', label: 'Outdoor dining' },
            { icon: 'fa-check', label: 'Camp access' }
          ]
        }
      ]
    }
  }), [])

  // ============================================================
  // FEATURES & AMENITIES - Memoized
  // ============================================================
  const features = useMemo(() => [
    { icon: 'fa-map-marker-alt', title: 'Prime Location', description: 'Strategically positioned along the Great Migration routes' },
    { icon: 'fa-campground', title: 'Canvas Luxury', description: 'Spacious en-suite tents with handcrafted furnishings' },
    { icon: 'fa-sun', title: 'Solar Powered', description: '100% sustainable energy with backup systems' },
    { icon: 'fa-concierge-bell', title: 'Butler Service', description: 'Personalized attention around the clock' }
  ], [])

  const amenities = useMemo(() => [
    { icon: 'fa-shower', title: 'Private Bathroom', description: 'En-suite with premium toiletries' },
    { icon: 'fa-bolt', title: '24/7 Electricity', description: 'Solar-powered with backup' },
    { icon: 'fa-wifi', title: 'High-Speed Internet', description: 'Stay connected in the wild' },
    { icon: 'fa-concierge-bell', title: '24/7 Butler Service', description: 'Personalized attention' }
  ], [])

  // ============================================================
  // EFFECTS - Optimized
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  // ============================================================
  // LIGHTBOX FUNCTIONS - Optimized with useCallback
  // ============================================================
  const openLightbox = useCallback((imageUrl: string) => {
    setLightboxImage(imageUrl)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
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
          <li><Link href="/rooms" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#B8944F]' : 'text-[#D4BC8D]'}`}>Stay</Link></li>
          <li><Link href="/gallery" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Gallery</Link></li>
          <li><Link href="/#blog" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Blog</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setModalOpen(true)}
            className="hidden md:inline-block bg-transparent border border-white text-white px-5 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#1A1510] font-sans"
            aria-label="Book your luxury safari at Pori Pori"
          >
            Reserve
          </button>
          <button 
            className="lg:hidden text-white text-xl cursor-pointer"
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
          <Link href="/rooms" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light opacity-100" onClick={() => setMobileMenuOpen(false)}>Stay</Link>
          <Link href="/gallery" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link href="/#blog" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
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
      <section className="relative h-[90vh] min-h-[600px] overflow-hidden bg-[#2C2418]" aria-label="Canvas suites hero banner">
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1.5s] ease-in-out z-0 ${
                index === currentSlide ? 'opacity-100 z-[1]' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Pori Pori Suite ${index + 1}`}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding={index === 0 ? 'sync' : 'async'}
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 z-[2]" />
        
        <div className="relative z-[3] h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-[0.65rem] tracking-[12px] text-[#D4BC8D] uppercase font-sans font-light mb-6 drop-shadow-lg">
            Our Sanctuary
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(3.5rem,8vw,7rem)] font-light leading-[1.05] text-white mb-6 tracking-[-0.02em] drop-shadow-xl">
            Canvas <em className="text-[#D4BC8D] not-italic">Suites</em>
          </h1>
          <p className="text-[0.9rem] tracking-[6px] text-white/90 font-light max-w-[600px] leading-relaxed drop-shadow-lg">
            Eight exclusive canvas suites following the Great Migration across the Serengeti plains
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3">
          <span className="text-[0.6rem] tracking-[5px] text-white/60 uppercase font-light drop-shadow-md">Discover</span>
          <div className="w-[1px] h-[60px] bg-white/15 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[25%] bg-white animate-[scrollDown_3s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-[10] flex gap-3" role="tablist" aria-label="Hero slideshow navigation">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-[6px] h-[6px] border border-white/40 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-white border-white w-7 rounded-[4px]' : 'hover:border-white hover:scale-110'
              }`}
              onClick={() => setCurrentSlide(index)}
              role="tab"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================================
      CAMP INTRO SECTION
      ============================================================ */}
      <section className="py-20 md:py-24 lg:py-28 max-w-[100vw] overflow-x-hidden bg-[#FFFDF9]" aria-label="Migration Camp introduction">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative">
              <div className="absolute bottom-[-20px] right-[-20px] w-[180px] h-[180px] border border-[rgba(196,165,110,0.3)] z-[-1] hidden md:block" />
              <div className="w-full h-[350px] md:h-[450px] lg:h-[550px] overflow-hidden bg-[#F3EDE4]">
                <img 
                  src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner1.webp"
                  alt="Pori Pori Migration Camp - luxury safari accommodation in Serengeti"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  loading="eager"
                  width="800"
                  height="550"
                />
              </div>
            </div>
            
            <div>
              <span className="inline-block px-6 py-2 border border-[#C4A56E] text-[#C4A56E] text-[0.65rem] tracking-[5px] uppercase font-medium mb-6">
                Seasonal Mobile Camp
              </span>
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-normal text-[#2C2418] mb-4 leading-[1.15]">
                Pori Pori Migration Camp
              </h2>
              <p className="text-[#8B7A64] leading-relaxed font-light mb-4 text-sm md:text-base">
                Designed to move with the rhythms of the wild, our Migration Camp places you at the forefront of nature's greatest spectacle. Each canvas suite is positioned to capture the golden light and endless horizons of the Serengeti.
              </p>
              <p className="text-[#8B7A64] leading-relaxed font-light text-sm md:text-base">
                With only eight exclusive suites, privacy and personalized attention are guaranteed. Our butler service ensures every moment of your stay is seamless, from sunrise wake-up calls with fresh coffee to starlit turn-downs with hot water bottles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      FEATURES STRIP
      ============================================================ */}
      <div className="bg-white border-t border-b border-[rgba(196,165,110,0.2)] max-w-[100vw] overflow-x-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`py-10 md:py-12 lg:py-14 px-6 text-center transition-all duration-500 hover:bg-[rgba(196,165,110,0.03)] ${index < 3 ? 'border-b md:border-b-0 md:border-r border-[rgba(196,165,110,0.2)]' : ''}`}
            >
              <div className="w-[70px] h-[70px] mx-auto mb-4 flex items-center justify-center border border-[rgba(196,165,110,0.2)] transition-all duration-500 hover:border-[#C4A56E] hover:-translate-y-2 hover:scale-105 hover:shadow-[0_15px_30px_rgba(196,165,110,0.15)]">
                <i className={`fas ${feature.icon} text-2xl text-[#C4A56E] transition-transform duration-400 hover:scale-110`}></i>
              </div>
              <h4 className="font-['Cormorant_Garamond'] text-lg font-medium text-[#2C2418] mb-1">{feature.title}</h4>
              <p className="text-[0.8rem] text-[#8B7A64] font-light leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
      ROOM SHOWCASE
      ============================================================ */}
      <section className="py-20 md:py-24 lg:py-28 bg-[#F3EDE4] max-w-[100vw] overflow-x-hidden" aria-label="Suite categories">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <p className="text-[0.6rem] tracking-[10px] text-[#C4A56E] uppercase text-center font-medium mb-4">
            Accommodations
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.8rem,5vw,4.5rem)] font-normal text-center text-[#2C2418] mb-4 leading-[1.15]">
            Our Canvas Suites
          </h2>
          <p className="text-center text-[#8B7A64] max-w-[650px] mx-auto mb-12 md:mb-16 text-sm md:text-base font-light leading-relaxed">
            Select a room category to explore the details of your Serengeti home
          </p>

          <div className="flex justify-center gap-4 md:gap-8 flex-wrap mb-12 md:mb-16" role="tablist" aria-label="Suite categories">
            {roomCategories.map((room) => (
              <button
                key={room.id}
                className={`font-['Cormorant_Garamond'] text-lg md:text-xl font-normal transition-all duration-400 relative pb-2 ${
                  activeRoom === room.id ? 'text-[#B8944F]' : 'text-[#8B7A64] hover:text-[#2C2418]'
                }`}
                onClick={() => setActiveRoom(room.id)}
                role="tab"
                aria-selected={activeRoom === room.id}
              >
                {room.label}
                <span className={`absolute bottom-0 left-0 h-[1px] bg-[#C4A56E] transition-all duration-400 ${activeRoom === room.id ? 'w-full' : 'w-0'}`}></span>
              </button>
            ))}
          </div>

          <div className="relative min-h-[400px]">
            {roomCategories.map((room) => (
              <div
                key={room.id}
                className={`transition-all duration-600 ${activeRoom === room.id ? 'block opacity-100 translate-y-0' : 'hidden opacity-0 translate-y-8'}`}
                role="tabpanel"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {roomDetails[room.id].items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-white overflow-hidden border border-[rgba(196,165,110,0.2)] transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(0,0,0,0.1)] hover:border-[#C4A56E] group"
                      onClick={() => openLightbox(item.image)}
                    >
                      <div 
                        className="h-[280px] bg-cover bg-center transition-transform duration-800 group-hover:scale-105 bg-[#F3EDE4] relative"
                        style={{ backgroundImage: `url('${item.image}')` }}
                      >
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                          <span className="text-white text-[0.7rem] tracking-[4px] uppercase border border-white/60 px-6 py-2 font-light">View Image</span>
                        </div>
                      </div>
                      <div className="p-6 md:p-8">
                        <h4 className="font-['Cormorant_Garamond'] text-xl md:text-2xl font-medium text-[#2C2418] mb-3">{item.title}</h4>
                        <p className="text-[#8B7A64] text-sm leading-relaxed font-light mb-4">{item.description}</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-none">
                          {item.features.map((feature, fi) => (
                            <li key={fi} className="flex items-center gap-2 text-[0.75rem] text-[#8B7A64] font-light transition-all duration-300 group-hover:translate-x-1">
                              <i className={`fas ${feature.icon} text-[#C4A56E] text-[0.65rem]`}></i> {feature.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      AMENITIES SECTION
      ============================================================ */}
      <section className="py-20 md:py-24 lg:py-28 max-w-[100vw] overflow-x-hidden" aria-label="Camp amenities">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <p className="text-[0.6rem] tracking-[10px] text-[#C4A56E] uppercase text-center font-medium mb-4">
            Comforts
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.8rem,5vw,4.5rem)] font-normal text-center text-[#2C2418] mb-4 leading-[1.15]">
            Premium Camp Amenities
          </h2>
          <p className="text-center text-[#8B7A64] max-w-[650px] mx-auto mb-12 md:mb-16 text-sm md:text-base font-light leading-relaxed">
            Every detail designed for your comfort and enjoyment in the wilderness
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {amenities.map((amenity, index) => (
              <div
                key={index}
                className="bg-white p-10 md:p-12 text-center border border-[rgba(196,165,110,0.2)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] hover:border-[#C4A56E] group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#C4A56E] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="w-[75px] h-[75px] mx-auto mb-4 rounded-full bg-gradient-to-br from-[#FBF8F4] to-[#F3EDE4] flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_10px_30px_rgba(196,165,110,0.2)]">
                  <i className={`fas ${amenity.icon} text-[1.8rem] text-[#C4A56E]`}></i>
                </div>
                <h4 className="font-['Cormorant_Garamond'] text-lg font-medium text-[#2C2418] mb-1">{amenity.title}</h4>
                <p className="text-[0.8rem] text-[#8B7A64] font-light">{amenity.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[6%] py-16 md:py-20 lg:py-24 px-6 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-8 md:my-12 lg:my-16 relative overflow-hidden max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-12%)]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-light mb-4">Begin Your Safari Story</h2>
        <p className="text-white/55 mb-6 font-light text-sm md:text-base">Let us help you choose the perfect accommodation for your Serengeti adventure</p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-white text-[#1A1510] px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[6px] uppercase cursor-pointer transition-all duration-500 font-sans font-medium relative overflow-hidden z-0 hover:bg-white/90 hover:scale-105 shadow-lg inline-flex items-center gap-3 hover:gap-4"
          aria-label="Inquire about availability"
        >
          Inquire About Availability <i className="fas fa-arrow-right transition-all duration-300"></i>
        </button>
      </div>

      {/* ============================================================
      LIGHTBOX
      ============================================================ */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/98 z-[4000] flex items-center justify-center cursor-pointer"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-8 right-8 text-white text-3xl opacity-60 hover:opacity-100 hover:rotate-90 transition-all duration-300 font-light"
            onClick={closeLightbox}
            aria-label="Close image viewer"
          >
            &times;
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged room image"
            className="max-w-[90%] max-h-[90vh] object-contain animate-[zoomIn_0.4s_ease]"
          />
        </div>
      )}

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
        @keyframes scrollDown {
          0% { transform: translateY(-100%); opacity: 0; }
          30% { opacity: 1; }
          100% { transform: translateY(400%); opacity: 0; }
        }
        @keyframes zoomIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  )
}