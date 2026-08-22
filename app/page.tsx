'use client'

import { useState, useEffect, useMemo, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSafaris, useBlogPosts } from '@/hooks/useData'

export default function Home() {
  // ALL STATE VARIABLES
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [galleryLightboxOpen, setGalleryLightboxOpen] = useState(false)
  const [galleryLightboxImage, setGalleryLightboxImage] = useState('')
  const [galleryLightboxTitle, setGalleryLightboxTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Fetch data from Supabase
  const { safaris: safariPackages, loading: safarisLoading } = useSafaris()
  const { posts: blogPosts, loading: blogLoading } = useBlogPosts()
  
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
  // HERO IMAGES
  // ============================================================
  const heroImages = [
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/counter.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/service.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner.webp'
  ]

  // ============================================================
  // GALLERY IMAGES (Moments)
  // ============================================================
  const galleryImages = [
    { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp', title: 'Zebra on the Serengeti Plains', alt: 'Zebra grazing on Serengeti plains during safari in Tanzania' },
    { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826167/birds.webp', title: 'Colorful Birds of Serengeti', alt: 'Colorful birds in Serengeti National Park, Tanzania' },
    { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/bushdinner1.webp', title: 'Bush Dinner Under the Stars', alt: 'Luxury bush dinner under African stars at Pori Pori Serengeti' },
    { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786827551/food3.webp', title: 'Gourmet African Cuisine', alt: 'Gourmet African cuisine at Pori Pori luxury safari lodge' }
  ]

  // ============================================================
  // FAQ DATA
  // ============================================================
  const faqs = [
    {
      question: 'What is included in the nightly rate?',
      answer: 'All rates include three gourmet meals daily, select beverages, twice-daily shared game drives, park fees, and airport transfers.',
      icon: 'fa-bed'
    },
    {
      question: 'When is the best time to visit?',
      answer: 'The Great Migration is year-round. June-October offers dramatic river crossings, while December-March features the calving season.',
      icon: 'fa-calendar-alt'
    },
    {
      question: 'Do you accommodate dietary restrictions?',
      answer: 'Absolutely. Our chef accommodates vegetarian, vegan, gluten-free, and allergies with advance notice.',
      icon: 'fa-utensils'
    },
    {
      question: 'How do I get to Pori Pori?',
      answer: 'We arrange all transfers from Seronera Airstrip. Daily flights connect from Arusha, Kilimanjaro, and Dar es Salaam.',
      icon: 'fa-plane'
    },
    {
      question: 'Is there Wi-Fi available?',
      answer: 'Yes, we offer complimentary high-speed Wi-Fi throughout the camp, allowing you to stay connected if you wish.',
      icon: 'fa-wifi'
    }
  ]

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  // ============================================================
  // TOGGLE FAQ
  // ============================================================
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  // ============================================================
  // GALLERY LIGHTBOX FUNCTIONS
  // ============================================================
  const openGalleryLightbox = (src: string, title: string) => {
    setGalleryLightboxImage(src)
    setGalleryLightboxTitle(title)
    setGalleryLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeGalleryLightbox = () => {
    setGalleryLightboxOpen(false)
    document.body.style.overflow = ''
  }

  // ============================================================
  // FORM HANDLERS
  // ============================================================
  const handleRoomTypeToggle = (index: number) => {
    const updatedRoomTypes = [...bookingForm.roomTypes]
    updatedRoomTypes[index].selected = !updatedRoomTypes[index].selected
    if (!updatedRoomTypes[index].selected) {
      updatedRoomTypes[index].quantity = 0
    } else {
      updatedRoomTypes[index].quantity = 1
    }
    setBookingForm({ ...bookingForm, roomTypes: updatedRoomTypes })
  }

  const handleRoomTypeChange = (index: number, value: number) => {
    const updatedRoomTypes = [...bookingForm.roomTypes]
    updatedRoomTypes[index].quantity = Math.max(0, Math.min(10, value))
    setBookingForm({ ...bookingForm, roomTypes: updatedRoomTypes })
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setBookingForm({ ...bookingForm, [name]: checked })
    } else {
      setBookingForm({ ...bookingForm, [name]: value })
    }
  }

  // ============================================================
  // HANDLE SUBMIT
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
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
  }

  // Show loading state while fetching data
  if (safarisLoading || blogLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-taupe font-light">Loading...</p>
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
      <div className={`fixed top-0 right-0 w-4/5 max-w-xs h-screen bg-[#1A1510] z-[1500] transition-all duration-500 ease-in-out shadow-xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          className="absolute top-4 right-4 text-white text-xl cursor-pointer opacity-60 hover:opacity-100"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close mobile menu"
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
      HERO SECTION
      ============================================================ */}
      <section className="relative h-screen min-h-[600px] overflow-hidden bg-dark" aria-label="Pori Pori Serengeti luxury safari lodge hero banner">
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Pori Pori Safari ${index + 1} - Luxury safari experience in Serengeti, Tanzania`}
                className="w-full h-full object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding={index === 0 ? 'sync' : 'async'}
                onError={(e) => {
                  console.error('Image failed to load:', img)
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-[clamp(0.6rem,3vw,0.65rem)] tracking-[clamp(6px,2vw,10px)] text-gold-light uppercase font-sans font-light mb-4 drop-shadow-lg">
            Serengeti · Tanzania
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,8vw,7rem)] font-light leading-[1.1] text-white mb-4 tracking-[-0.02em] drop-shadow-xl">
            Where Golden Light<br /><em className="text-gold-light not-italic">Meets the Wild</em>
          </h1>
          <p className="text-[clamp(0.7rem,3vw,0.9rem)] tracking-[clamp(3px,1.5vw,5px)] text-white/90 font-light mb-6 max-w-[90%] drop-shadow-lg">
            Exclusive canvas suites · Private butler service · The Great Migration at your doorstep
          </p>
          <Link
            href="/rooms"
            className="bg-white text-[#1A1510] px-6 py-3 text-[clamp(0.6rem,2.5vw,0.7rem)] tracking-[4px] uppercase cursor-pointer transition-all duration-300 inline-flex items-center gap-3 font-sans font-medium hover:bg-white/90 hover:scale-105 group no-underline shadow-lg"
          >
            Begin Your Journey <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>

        <div className="absolute bottom-6 right-6 z-10 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 border border-white/50 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white border-white w-5 rounded-[3px]' : ''
              }`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to hero image ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================================
      ABOUT SECTION
      ============================================================ */}
      <section id="about" className="py-12 md:py-16 lg:py-20" aria-label="About Pori Pori Serengeti">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            The Sanctuary
          </p>
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              <h2 className="font-serif text-[clamp(2rem,5vw,3rem)] font-normal text-charcoal">
                The Soul of the Serengeti
              </h2>
              <p className="text-taupe leading-relaxed text-sm md:text-base font-light">
                Pori Pori is not merely a camp — it is a sanctuary where golden light meets uncompromising luxury. Nestled in a private concession of the Serengeti, our canvas suites offer uninterrupted views of the endless plains, following the rhythms of the Great Migration.
              </p>
              <p className="text-taupe leading-relaxed text-sm md:text-base font-light">
                Here, time slows to the rhythm of nature. Each moment is curated, each detail considered — from hand-woven linens to starlit dinners on the savannah.
              </p>
              <div className="grid grid-cols-3 gap-3 md:gap-4 mt-6">
                <div className="text-center p-4 bg-white border border-gold/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                  <div className="font-serif text-2xl md:text-3xl text-gold font-normal">8</div>
                  <div className="text-[0.55rem] tracking-[2px] text-taupe uppercase font-light">Canvas Suites</div>
                </div>
                <div className="text-center p-4 bg-white border border-gold/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                  <div className="font-serif text-2xl md:text-3xl text-gold font-normal">24/7</div>
                  <div className="text-[0.55rem] tracking-[2px] text-taupe uppercase font-light">Butler Service</div>
                </div>
                <div className="text-center p-4 bg-white border border-gold/20 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg">
                  <div className="font-serif text-2xl md:text-3xl text-gold font-normal">100%</div>
                  <div className="text-[0.55rem] tracking-[2px] text-taupe uppercase font-light">Solar Powered</div>
                </div>
              </div>
            </div>
            <div className="w-full h-[280px] md:h-[400px] lg:h-[500px] overflow-hidden bg-sand relative">
              <img 
                src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/sanctuary.webp" 
                alt="Luxury safari experience at Pori Pori Serengeti - Canvas suites with stunning views"
                className="w-full h-full object-cover transition-transform duration-800 hover:scale-105"
                loading="lazy"
                width="800"
                height="600"
                onError={(e) => {
                  e.currentTarget.src = 'https://placehold.co/800x600/1e293b/fcd34d?text=Pori+Pori'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      SAFARI PACKAGES SECTION
      ============================================================ */}
      <section id="safari" className="py-12 md:py-16 lg:py-20 bg-[#FBF8F4]" aria-label="Pori Pori safari packages">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            Beyond Accommodation
          </p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-normal text-center text-charcoal mb-2">
            Safari Experiences, Not Just a Stay
          </h2>
          <p className="text-center text-taupe max-w-[90%] md:max-w-[700px] mx-auto mb-3 text-sm md:text-base font-light leading-relaxed">
            At Pori Pori, we go beyond luxury lodging. We are your gateway to the wild — 
            <span className="text-gold font-medium"> crafting bespoke safari adventures</span> that bring you face-to-face with the majesty of the Serengeti.
            <br className="hidden sm:inline" />
            Every package is tailored to your dreams, whether you're a wildlife enthusiast, a honeymooner, or a family seeking the journey of a lifetime.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
            {safariPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className="group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-[rgba(196,165,110,0.1)]"
              >
                <div className="relative h-[240px] overflow-hidden">
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
                  <div className="absolute top-4 right-4 bg-[#1A1510]/90 backdrop-blur-sm text-white px-4 py-1.5 rounded-full text-sm font-light tracking-wide">
                    {pkg.price}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white/90 text-sm font-light tracking-wide flex items-center gap-2">
                      <i className="fas fa-clock text-gold-light"></i>
                      {pkg.duration}
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-medium text-charcoal mb-2 group-hover:text-gold transition-colors duration-300">
                    {pkg.title}
                  </h3>
                  <p className="text-taupe text-sm font-light leading-relaxed mb-4">
                    {pkg.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.highlights.slice(0, 3).map((highlight, idx) => (
                      <span key={idx} className="text-[0.5rem] tracking-[1px] uppercase text-taupe bg-[#FBF8F4] px-3 py-1 rounded-full border border-[#E0D5C8]">
                        {highlight}
                      </span>
                    ))}
                    {pkg.highlights.length > 3 && (
                      <span className="text-[0.5rem] tracking-[1px] uppercase text-taupe bg-[#FBF8F4] px-3 py-1 rounded-full border border-[#E0D5C8]">
                        +{pkg.highlights.length - 3} more
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/safaris/${pkg.slug}`}
                    className="inline-flex items-center gap-2 text-gold text-[0.7rem] tracking-[2px] uppercase font-medium group-hover:gap-3 transition-all duration-300 hover:text-[#B8944F]"
                  >
                    Explore This Safari <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/safaris" 
              className="inline-flex items-center gap-3 text-gold hover:text-[#B8944F] transition-all duration-300 text-sm tracking-[3px] uppercase font-medium hover:gap-4 group"
            >
              View All Safari Packages
              <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
      EXPERIENCES SECTION
      ============================================================ */}
      <section id="experiences" className="py-12 md:py-16 lg:py-20" aria-label="Luxury safari experiences at Pori Pori">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            Curated Experiences
          </p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-normal text-center text-charcoal mb-2">
            Safari Beyond Compare
          </h2>
          <p className="text-center text-taupe max-w-[90%] md:max-w-[600px] mx-auto mb-8 md:mb-10 text-sm md:text-base font-light">
            From sunrise hot air balloon safaris to intimate bush dinners beneath the African sky
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Balloon Safaris */}
            <div className="relative overflow-hidden cursor-pointer h-[380px] md:h-[420px] lg:h-[460px] bg-dark transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/v1786825395/balloon.webp')" }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-center">
                <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 group-hover:bg-gold group-hover:border-gold">
                  <i className="bi bi-balloon-heart-fill text-white text-xl md:text-2xl"></i>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-white mb-1">Balloon Safaris</h3>
                <p className="text-white/85 text-sm font-light">Float silently above the savannah at first light, witnessing the Great Migration from above.</p>
              </div>
            </div>

            {/* Private Game Drives */}
            <div className="relative overflow-hidden cursor-pointer h-[380px] md:h-[420px] lg:h-[460px] bg-dark transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655000/image00048_dpxzim.jpg')" }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-center">
                <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 group-hover:bg-gold group-hover:border-gold">
                  <i className="fas fa-binoculars text-white text-xl md:text-2xl"></i>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-white mb-1">Private Game Drives</h3>
                <p className="text-white/85 text-sm font-light">Customized open-vehicle safaris with expert naturalists. Track the Big Five.</p>
              </div>
            </div>

            {/* Luxury Experiences */}
            <div className="relative overflow-hidden cursor-pointer h-[380px] md:h-[420px] lg:h-[460px] bg-dark transition-transform duration-500 hover:-translate-y-2 hover:shadow-xl group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/service.webp')" }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-black/85 via-black/50 to-transparent text-center">
                <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center bg-white/15 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 group-hover:bg-gold group-hover:border-gold">
                  <i className="bi bi-star-fill text-white text-xl md:text-2xl"></i>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-medium text-white mb-1">Luxury Experiences</h3>
                <p className="text-white/85 text-sm font-light">Indulge in world-class safari moments — from champagne sundowners to private guided encounters.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      CUISINE PREVIEW
      ============================================================ */}
      <section id="cuisine" className="py-12 md:py-16 lg:py-20" aria-label="Gourmet cuisine at Pori Pori Serengeti">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            Gastronomy
          </p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-normal text-center text-charcoal mb-2">
            Cuisine & Dining
          </h2>
          <p className="text-center text-taupe max-w-[90%] md:max-w-[600px] mx-auto mb-8 md:mb-10 text-sm md:text-base font-light">
            A culinary journey through the flavors of East Africa, crafted by our executive chef
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="relative overflow-hidden cursor-pointer h-[380px] md:h-[420px] lg:h-[480px] bg-dark group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner2.webp')" }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-transparent to-black/90 text-white">
                <h3 className="font-serif text-xl md:text-2xl font-normal mb-1">Bush Breakfast</h3>
                <p className="text-sm font-light opacity-90 mb-3">Start your day with a gourmet breakfast overlooking the endless plains.</p>
                <Link href="/cuisines" className="text-gold-light text-[0.6rem] tracking-[3px] uppercase inline-flex items-center gap-2 hover:gap-3 transition-all duration-300">
                  Discover <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden cursor-pointer h-[380px] md:h-[420px] lg:h-[480px] bg-dark group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bar1.webp')" }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-transparent to-black/90 text-white">
                <h3 className="font-serif text-xl md:text-2xl font-normal mb-1">Sundowner Cocktails</h3>
                <p className="text-sm font-light opacity-90 mb-3">Handcrafted cocktails at a scenic lookout point as the sun sets.</p>
                <Link href="/cuisines" className="text-gold-light text-[0.6rem] tracking-[3px] uppercase inline-flex items-center gap-2 hover:gap-3 transition-all duration-300">
                  Discover <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>

            <div className="relative overflow-hidden cursor-pointer h-[380px] md:h-[420px] lg:h-[480px] bg-dark group">
              <div className="absolute inset-0 bg-cover bg-center transition-transform duration-600 group-hover:scale-105" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/v1786825707/food1.webp')" }}></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-transparent to-black/90 text-white">
                <h3 className="font-serif text-xl md:text-2xl font-normal mb-1">Amazing Recipes</h3>
                <p className="text-sm font-light opacity-90 mb-3">Discover authentic African flavors and chef-crafted dishes inspired by the wild.</p>
                <Link href="/cuisines" className="text-gold-light text-[0.6rem] tracking-[3px] uppercase inline-flex items-center gap-2 hover:gap-3 transition-all duration-300">
                  Explore Recipes <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      BLOG SECTION - FULLY CLICKABLE CARDS
      ============================================================ */}
      <section id="blog" className="py-12 md:py-16 lg:py-20 bg-sand" aria-label="Pori Pori Serengeti blog - Safari insights and stories">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            Stories
          </p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-normal text-center text-charcoal mb-2">
            From Our Blog
          </h2>
          <p className="text-center text-taupe max-w-[600px] mx-auto mb-8 md:mb-10 text-sm md:text-base font-light">
            Insights and stories from the heart of the Serengeti
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.id}`}
                className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl no-underline cursor-pointer"
                aria-label={`Read ${post.title}`}
              >
                <div className="relative h-[220px] overflow-hidden">
                  <img 
                    src={post.image}
                    alt={`${post.title} - Pori Pori Serengeti blog`}
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105"
                    loading="lazy"
                    width="600"
                    height="400"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/600x400/1e293b/fcd34d?text=Pori+Pori'
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-gold/90 text-white text-[0.6rem] tracking-[2px] uppercase px-3 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[0.65rem] text-taupe font-light mb-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.read_time}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-charcoal mb-2 line-clamp-2 group-hover:text-gold transition-colors duration-300">
                    {post.title}
                  </h3>
                  <p className="text-taupe text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold text-[0.7rem] tracking-[2px] uppercase font-medium mt-4 group-hover:gap-3 transition-all duration-300">
                    Read More <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link 
              href="/blog" 
              className="inline-flex items-center gap-3 text-gold hover:text-[#B8944F] transition-all duration-300 text-sm tracking-[3px] uppercase font-medium hover:gap-4 group"
            >
              View All Blog Posts 
              <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
      GALLERY PREVIEW
      ============================================================ */}
      <section className="py-12 md:py-16 lg:py-20" aria-label="Pori Pori Serengeti photo gallery">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            Moments
          </p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-normal text-center text-charcoal mb-2">
            Captured in Time
          </h2>
          <p className="text-center text-taupe mb-8 md:mb-10 text-sm md:text-base font-light">Click any image to view larger</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {galleryImages.map((img, index) => (
              <div 
                key={index} 
                className="aspect-[4/3] overflow-hidden cursor-pointer relative bg-sand group"
                onClick={() => openGalleryLightbox(img.src, img.title)}
              >
                <img 
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                  width="400"
                  height="300"
                  onError={(e) => {
                    e.currentTarget.src = 'https://placehold.co/800x600/1e293b/fcd34d?text=Pori+Pori'
                  }}
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <i className="fas fa-plus"></i>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-xs font-light tracking-wide truncate">{img.title}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-6">
            <Link href="/gallery" className="text-gold text-[0.7rem] tracking-[3px] uppercase no-underline hover:tracking-[5px] transition-all duration-300">
              View Full Gallery <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
      GALLERY LIGHTBOX
      ============================================================ */}
      {galleryLightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/98 z-[4000] flex items-center justify-center cursor-pointer"
          onClick={closeGalleryLightbox}
        >
          <button 
            className="absolute top-8 right-8 text-white text-3xl opacity-60 hover:opacity-100 hover:rotate-90 transition-all duration-300 font-light z-[2]"
            onClick={closeGalleryLightbox}
            aria-label="Close image viewer"
          >
            &times;
          </button>
          <div className="relative max-w-[90%] max-h-[90vh]">
            <img 
              src={galleryLightboxImage} 
              alt={galleryLightboxTitle}
              className="max-w-full max-h-[85vh] object-contain animate-[zoomIn_0.4s_ease]"
            />
            <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center text-white">
              <h4 className="font-serif text-2xl text-[#D4BC8D] font-normal mb-1">
                {galleryLightboxTitle}
              </h4>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================
      FAQ SECTION
      ============================================================ */}
      <section className="py-12 md:py-16 lg:py-20 bg-[#FBF8F4]" aria-label="Frequently asked questions about Pori Pori Serengeti">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            Inquiries
          </p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-normal text-center text-charcoal mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-taupe max-w-[500px] mx-auto mb-10 text-sm font-light">
            Find answers to the most common questions about your Serengeti safari experience
          </p>
          
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white border border-[rgba(196,165,110,0.15)] rounded-xl overflow-hidden transition-all duration-300 hover:border-[rgba(196,165,110,0.3)] ${
                  activeFaq === index ? 'shadow-md border-gold/30' : ''
                }`}
              >
                <button
                  className="w-full flex items-center gap-4 p-5 text-left transition-colors duration-300 hover:bg-[#FBF8F4]"
                  onClick={() => toggleFaq(index)}
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
                    <i className={`fas ${faq.icon} text-sm`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-serif text-base md:text-lg font-medium text-[#2C2418]">
                      {faq.question}
                    </h3>
                  </div>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                    activeFaq === index 
                      ? 'border-gold bg-gold text-white rotate-45' 
                      : 'border-[#D4C5B5] text-gold hover:border-gold'
                  }`}>
                    <i className="fas fa-plus text-xs"></i>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-400 ${
                  activeFaq === index ? 'max-h-48' : 'max-h-0'
                }`}>
                  <div className="px-5 pb-5 pt-0 text-taupe text-sm leading-relaxed font-light border-t border-[rgba(196,165,110,0.1)]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[5%] py-8 md:py-12 lg:py-16 px-4 md:px-8 text-center bg-gradient-to-br from-dark to-[#2C2418] text-white my-6 md:my-8 lg:my-12">
        <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light mb-3">Begin Your Safari Story</h2>
        <p className="text-white/60 mb-4 text-sm md:text-base">Let us craft your perfect Serengeti adventure</p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-white text-[#1A1510] px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white/90 hover:scale-105 font-sans font-medium shadow-lg"
        >
          Inquire About Availability
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
        @keyframes zoomIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  )
}