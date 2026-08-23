'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'

interface GalleryImage {
  title: string
  description: string
  category: string
  url: string
}

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentFilter, setCurrentFilter] = useState('all')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showWhatsApp, setShowWhatsApp] = useState(false)
  
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
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/chef5.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner2.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp'
  ], [])

  // ============================================================
  // GALLERY IMAGES - Memoized
  // ============================================================
  const galleryImages: GalleryImage[] = useMemo(() => [
    { 
      title: 'Luxury Safari Suite', 
      description: 'Elegant canvas suite with panoramic views of the Serengeti plains.',
      category: 'suites', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp' 
    },
    { 
      title: 'Serengeti Sunset', 
      description: 'Golden hour over the endless plains, painting the sky in vibrant colors.',
      category: 'landscape', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp' 
    },
    { 
      title: 'Bush Breakfast', 
      description: 'Gourmet dining in the wilderness with panoramic views of the savannah.',
      category: 'dining', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner1.webp' 
    },
    { 
      title: "Chef's Special", 
      description: 'Exquisite local cuisine crafted by our talented culinary team.',
      category: 'dining', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/chef5.webp' 
    },
    { 
      title: 'Wildlife Encounter', 
      description: 'Elephants in their natural habitat roaming the Serengeti plains.',
      category: 'wildlife', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782654572/image00011_x62cl4.jpg' 
    },
    { 
      title: 'Camp Life', 
      description: 'Relaxing at the main lounge with stunning views of the Serengeti.',
      category: 'camp', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786812206/counter.webp' 
    },
    { 
      title: 'Starlit Dinner', 
      description: 'Romantic dining under the African sky with lantern-lit tables.',
      category: 'dining', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner2.webp' 
    },
    { 
      title: 'Canvas Suite Interior', 
      description: 'Luxurious safari accommodation with handcrafted furnishings.',
      category: 'suites', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/tripple.webp' 
    },
    { 
      title: 'Serengeti Plains', 
      description: 'Endless savannah stretching to the horizon with acacia trees.',
      category: 'landscape', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor3.webp' 
    },
    { 
      title: 'Safari Adventure', 
      description: 'Game drive through the wilderness with expert naturalist guides.',
      category: 'activities', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/service.webp' 
    },
    { 
      title: 'Sundowner Cocktails', 
      description: 'Enjoying drinks at sunset with breathtaking views of the Serengeti.',
      category: 'activities', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bar1.webp' 
    },
    { 
      title: 'Private Deck', 
      description: 'Relaxing with Serengeti views from your private suite deck.',
      category: 'camp', 
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655153/image00022_dio9g6.jpg' 
    }
  ], [])

  // ============================================================
  // FILTER CATEGORIES - Memoized
  // ============================================================
  const filterCategories = useMemo(() => [
    { id: 'all', label: 'All Photos' },
    { id: 'suites', label: 'Suites & Rooms' },
    { id: 'dining', label: 'Dining & Cuisine' },
    { id: 'wildlife', label: 'Wildlife & Safari' },
    { id: 'landscape', label: 'Landscapes' },
    { id: 'activities', label: 'Activities' },
    { id: 'camp', label: 'Camp Life' }
  ], [])

  // ============================================================
  // FILTERED IMAGES - Memoized
  // ============================================================
  const filteredImages = useMemo(() => {
    return currentFilter === 'all' 
      ? galleryImages 
      : galleryImages.filter(img => img.category === currentFilter)
  }, [currentFilter, galleryImages])

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  // ============================================================
  // LIGHTBOX FUNCTIONS - Optimized with useCallback
  // ============================================================
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }, [])

  const nextImage = useCallback(() => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length)
  }, [filteredImages.length])

  const prevImage = useCallback(() => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }, [filteredImages.length])

  // Keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, nextImage, prevImage, closeLightbox])

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
  // HANDLE SUBMIT - UPDATED WITH formType
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
          formType: 'gallery',
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
          <li><Link href="/rooms" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Stay</Link></li>
          <li><Link href="/gallery" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#B8944F]' : 'text-[#D4BC8D]'}`}>Gallery</Link></li>
          <li><Link href="/#blog" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'}`}>Blog</Link></li>
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
          <Link href="/gallery" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light opacity-100" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
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
      HERO SECTION
      ============================================================ */}
      <section className="relative h-[75vh] min-h-[520px] overflow-hidden bg-[#2C2418]" aria-label="Gallery hero banner">
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
                alt={`Pori Pori Gallery ${index + 1}`}
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
            Moments
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(3.5rem,8vw,7rem)] font-light leading-[1.05] text-white mb-6 tracking-[-0.02em] drop-shadow-xl">
            Our <em className="text-[#D4BC8D] not-italic relative">Gallery</em>
          </h1>
          <p className="text-[0.9rem] tracking-[6px] text-white/90 font-light max-w-[600px] leading-relaxed drop-shadow-lg">
            A visual journey through Pori Pori Serengeti — from luxurious suites to unforgettable wildlife encounters
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3">
          <span className="text-[0.6rem] tracking-[5px] text-white/60 uppercase font-light drop-shadow-md">Explore</span>
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
      FILTER BAR
      ============================================================ */}
      <div className="sticky top-[72px] md:top-[76px] z-[99] py-4 md:py-6 px-4 md:px-8 bg-[rgba(251,248,244,0.95)] backdrop-blur-[15px] border-b border-[rgba(196,165,110,0.2)] max-w-[100vw] overflow-x-auto flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 scrollbar-hide" role="tablist" aria-label="Filter gallery images">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 md:px-8 py-2 md:py-3 border text-[0.65rem] md:text-[0.7rem] font-sans font-normal tracking-[2px] uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              currentFilter === cat.id
                ? 'bg-[#C4A56E] border-[#C4A56E] text-white'
                : 'bg-white border-[#E0D5C8] text-[#8B7A64] hover:border-[#C4A56E] hover:text-[#C4A56E]'
            }`}
            onClick={() => setCurrentFilter(cat.id)}
            role="tab"
            aria-selected={currentFilter === cat.id}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* ============================================================
      GALLERY GRID
      ============================================================ */}
      <section className="py-16 md:py-20 max-w-[100vw] overflow-x-hidden" aria-label="Photo gallery">
        <div className="container mx-auto px-4 md:px-8 max-w-[1600px]">
          {filteredImages.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-images text-5xl text-[rgba(196,165,110,0.3)] mb-4 block" />
              <h3 className="font-['Cormorant_Garamond'] text-3xl font-normal text-[#2C2418] mb-2">No images in this category</h3>
              <p className="text-[#8B7A64] font-light">Try selecting a different filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-5">
              {filteredImages.map((img, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden cursor-pointer bg-[#F3EDE4] aspect-[4/3] group"
                  onClick={() => openLightbox(index)}
                >
                  <div className="absolute top-4 right-4 z-[2] w-12 h-12 rounded-full bg-white/12 backdrop-blur-sm flex items-center justify-center text-white text-base opacity-0 scale-50 transition-all duration-400 group-hover:opacity-100 group-hover:scale-100">
                    <i className="fas fa-expand"></i>
                  </div>
                  <img
                    src={img.url}
                    alt={`${img.title} - ${img.description}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 bg-[#F3EDE4]"
                    loading={index < 6 ? 'eager' : 'lazy'}
                    width="600"
                    height="450"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://placehold.co/800x600/F3EDE4/C4A56E?text=Pori+Pori'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 md:p-8">
                    <h4 className="font-['Cormorant_Garamond'] text-xl md:text-2xl text-white font-normal mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {img.title}
                    </h4>
                    <span className="text-[0.7rem] text-[#D4BC8D] uppercase tracking-[3px] font-light transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-50">
                      {img.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[6%] py-16 md:py-20 lg:py-24 px-6 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-8 md:my-12 lg:my-16 relative overflow-hidden max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-12%)]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-light mb-4">Begin Your Safari Story</h2>
        <p className="text-white/55 mb-6 font-light text-sm md:text-base">Let us craft your perfect Serengeti adventure</p>
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
      {lightboxOpen && filteredImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/98 z-[4000] flex items-center justify-center cursor-pointer"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[92%] max-h-[88vh]">
            <button 
              className="absolute -top-14 right-0 text-white text-3xl opacity-60 hover:opacity-100 hover:rotate-90 transition-all duration-300 font-light z-[2]"
              onClick={closeLightbox}
              aria-label="Close image viewer"
            >
              &times;
            </button>
            <span className="absolute -top-14 left-0 text-white/50 text-sm font-light tracking-[2px] z-[2]">
              {lightboxIndex + 1} / {filteredImages.length}
            </span>
            <button 
              className="absolute left-4 md:-left-20 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:scale-110 z-[2]"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
              aria-label="Previous image"
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="absolute right-4 md:-right-20 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:scale-110 z-[2]"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
              aria-label="Next image"
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <img 
              src={filteredImages[lightboxIndex].url} 
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain animate-[zoomIn_0.5s_ease]"
              width="1200"
              height="800"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/1200x800/F3EDE4/C4A56E?text=Pori+Pori'
              }}
            />
            <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-center text-white">
              <h3 className="font-['Cormorant_Garamond'] text-2xl text-[#D4BC8D] font-normal mb-1">
                {filteredImages[lightboxIndex].title}
              </h3>
              <p className="text-sm text-white/50 font-light">
                {filteredImages[lightboxIndex].description}
              </p>
            </div>
          </div>
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
          from { transform: scale(0.92); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  )
}