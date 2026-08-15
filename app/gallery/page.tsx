'use client'

import { useState, useEffect } from 'react'
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

  // All hero images with Cloudinary URLs
  const heroImages = [
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/chef5.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner2.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp'
  ]

  // All gallery images with Cloudinary URLs
  const galleryImages: GalleryImage[] = [
    { title: 'Luxury Safari Suite', description: 'Elegant canvas suite with panoramic views', category: 'suites', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp' },
    { title: 'Serengeti Sunset', description: 'Golden hour over the endless plains', category: 'landscape', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp' },
    { title: 'Bush Breakfast', description: 'Gourmet dining in the wilderness', category: 'dining', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner1.webp' },
    { title: "Chef's Special", description: 'Exquisite local cuisine', category: 'dining', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/chef5.webp' },
    { title: 'Wildlife Encounter', description: 'Elephants in their natural habitat', category: 'wildlife', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782654572/image00011_x62cl4.jpg' },
    { title: 'Camp Life', description: 'Relaxing at the main lounge', category: 'camp', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786812206/counter.webp' },
    { title: 'Starlit Dinner', description: 'Romantic dining under the African sky', category: 'dining', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner2.webp' },
    { title: 'Canvas Suite Interior', description: 'Luxurious safari accommodation', category: 'suites', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/tripple.webp' },
    { title: 'Serengeti Plains', description: 'Endless savannah stretching to the horizon', category: 'landscape', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor3.webp' },
    { title: 'Safari Adventure', description: 'Game drive through the wilderness', category: 'activities', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/service.webp' },
    { title: 'Sundowner Cocktails', description: 'Enjoying drinks at sunset', category: 'activities', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bar1.webp' },
    { title: 'Private Deck', description: 'Relaxing with Serengeti views', category: 'camp', url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655153/image00022_dio9g6.jpg' }
  ]

  const filterCategories = [
    { id: 'all', label: 'All Photos' },
    { id: 'suites', label: 'Suites & Rooms' },
    { id: 'dining', label: 'Dining & Cuisine' },
    { id: 'wildlife', label: 'Wildlife & Safari' },
    { id: 'landscape', label: 'Landscapes' },
    { id: 'activities', label: 'Activities' },
    { id: 'camp', label: 'Camp Life' }
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [heroImages.length])

  const filteredImages = currentFilter === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === currentFilter)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const nextImage = () => {
    setLightboxIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setLightboxIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxOpen) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxOpen, filteredImages.length])

  return (
    <>
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/97 backdrop-blur-[20px] shadow-sm border-b border-[rgba(196,165,110,0.2)]' : 'mix-blend-difference'}`}>
        <Link href="/" className="nav-brand">
          <img src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" alt="Pori Pori Serengeti" className={`h-[42px] md:h-[48px] w-auto transition-all duration-300 ${scrolled ? 'h-[38px] md:h-[42px]' : ''}`} />
        </Link>
        
        <ul className="hidden lg:flex gap-8 list-none items-center">
          <li><Link href="/" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Home</Link></li>
          <li><Link href="/#about" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>About</Link></li>
          <li><Link href="/#experiences" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Experiences</Link></li>
          <li><Link href="/cuisines" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Cuisine</Link></li>
          <li><Link href="/rooms" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Stay</Link></li>
          <li><Link href="/gallery" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#B8944F]' : 'text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C4A56E]`}>Gallery</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setModalOpen(true)}
            className="hidden md:inline-block bg-transparent border border-[#C4A56E] text-[#C4A56E] px-5 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#C4A56E] hover:text-white font-sans relative overflow-hidden z-0 before:content-[''] before:absolute before:inset-0 before:bg-[#C4A56E] before:scale-x-0 before:origin-right before:transition-transform before:duration-500 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]"
          >
            Reserve
          </button>
          <button 
            className="lg:hidden text-white text-xl cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className={`fixed top-0 right-0 w-full h-screen bg-[#1A1510] z-[1500] transition-all duration-500 ease-in-out shadow-xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          className="absolute top-8 right-8 text-white text-2xl cursor-pointer opacity-60 hover:opacity-100"
          onClick={() => setMobileMenuOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Link href="/" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/#about" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/#experiences" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Experiences</Link>
          <Link href="/cuisines" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Cuisine</Link>
          <Link href="/rooms" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Stay</Link>
          <Link href="/gallery" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light opacity-100" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <button 
            onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
            className="mt-4 bg-transparent border border-[#C4A56E] text-[#C4A56E] px-6 py-3 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#C4A56E] hover:text-white font-sans"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[520px] overflow-hidden bg-[#2C2418]">
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-[1.5s] ease-in-out z-0 ${
                index === currentSlide ? 'opacity-100 z-[1]' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url('${img}')` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/60 z-[2]" />
        
        <div className="relative z-[3] h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-[0.65rem] tracking-[12px] text-[#D4BC8D] uppercase font-sans font-light mb-6">
            Moments
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(3.5rem,8vw,7rem)] font-light leading-[1.05] text-white mb-6 tracking-[-0.02em]">
            Our <em className="text-[#D4BC8D] not-italic relative">Gallery</em>
          </h1>
          <p className="text-[0.9rem] tracking-[6px] text-white/70 font-light max-w-[600px] leading-relaxed">
            A visual journey through Pori Pori Serengeti — from luxurious suites to unforgettable wildlife encounters
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3">
          <span className="text-[0.6rem] tracking-[5px] text-white/40 uppercase font-light">Explore</span>
          <div className="w-[1px] h-[60px] bg-white/15 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[25%] bg-white animate-[scrollDown_3s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-[10] flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-[6px] h-[6px] border border-white/40 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'bg-white border-white w-7 rounded-[4px]' : 'hover:border-white hover:scale-110'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-[72px] md:top-[76px] z-[99] py-4 md:py-6 px-4 md:px-8 bg-[rgba(251,248,244,0.95)] backdrop-blur-[15px] border-b border-[rgba(196,165,110,0.2)] max-w-[100vw] overflow-x-auto flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 scrollbar-hide">
        {filterCategories.map((cat) => (
          <button
            key={cat.id}
            className={`px-4 md:px-8 py-2 md:py-3 border text-[0.65rem] md:text-[0.7rem] font-sans font-normal tracking-[2px] uppercase transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
              currentFilter === cat.id
                ? 'bg-[#C4A56E] border-[#C4A56E] text-white'
                : 'bg-white border-[#E0D5C8] text-[#8B7A64] hover:border-[#C4A56E] hover:text-[#C4A56E]'
            }`}
            onClick={() => setCurrentFilter(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <section className="py-16 md:py-20 max-w-[100vw] overflow-x-hidden">
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
                  style={{ animationDelay: `${(index % 9) * 0.06}s` }}
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

      {/* CTA Section */}
      <div className="mx-4 md:mx-[6%] py-16 md:py-20 lg:py-24 px-6 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-8 md:my-12 lg:my-16 relative overflow-hidden max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-12%)]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-light mb-4">Begin Your Safari Story</h2>
        <p className="text-white/55 mb-6 font-light text-sm md:text-base">Let us craft your perfect Serengeti adventure</p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-transparent border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[6px] uppercase cursor-pointer transition-all duration-500 font-sans font-light relative overflow-hidden z-0 before:content-[''] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-right before:transition-transform before:duration-500 hover:before:scale-x-100 hover:before:origin-left hover:text-[#1A1510] hover:border-white before:z-[-1] inline-flex items-center gap-3 hover:gap-4"
        >
          Inquire About Availability <i className="fas fa-arrow-right transition-all duration-300"></i>
        </button>
      </div>

      {/* Lightbox */}
      {lightboxOpen && filteredImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/98 z-[4000] flex items-center justify-center cursor-pointer"
          onClick={closeLightbox}
        >
          <div className="relative max-w-[92%] max-h-[88vh]">
            <button 
              className="absolute -top-14 right-0 text-white text-3xl opacity-60 hover:opacity-100 hover:rotate-90 transition-all duration-300 font-light z-[2]"
              onClick={closeLightbox}
            >
              &times;
            </button>
            <span className="absolute -top-14 left-0 text-white/50 text-sm font-light tracking-[2px] z-[2]">
              {lightboxIndex + 1} / {filteredImages.length}
            </span>
            <button 
              className="absolute left-4 md:-left-20 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:scale-110 z-[2]"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <i className="fas fa-chevron-left"></i>
            </button>
            <button 
              className="absolute right-4 md:-right-20 top-1/2 -translate-y-1/2 bg-white/10 border border-white/20 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:scale-110 z-[2]"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <i className="fas fa-chevron-right"></i>
            </button>
            <img 
              src={filteredImages[lightboxIndex].url} 
              alt={filteredImages[lightboxIndex].title}
              className="max-w-full max-h-[85vh] object-contain animate-[zoomIn_0.5s_ease]"
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

      {/* Booking Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[4500] flex items-center justify-center">
          <div className="bg-white max-w-md w-[90%] max-h-[85vh] overflow-y-auto">
            <div className="bg-[#1A1510] p-6 text-white text-center relative">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-normal">Reserve Your Safari</h3>
              <p className="text-sm text-white/60 mt-1">Our team will respond within 12 hours</p>
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-5 text-white text-2xl cursor-pointer"
              >
                &times;
              </button>
            </div>

            <form className="p-6" onSubmit={(e) => {
              e.preventDefault()
            }}>
              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-in</label>
                  <input
                    type="date"
                    required
                    className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-out</label>
                  <input
                    type="date"
                    required
                    className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Adults</label>
                  <select className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Children</label>
                  <select className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm">
                    {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Special Requests</label>
                <textarea
                  rows={2}
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="Dietary needs, room preferences..."
                />
              </div>

              <div className="flex gap-4 justify-end border-t border-[#F3EDE4] pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="bg-transparent border border-[#D4C5B5] px-5 py-2.5 text-[0.65rem] tracking-[3px] uppercase cursor-pointer font-sans hover:border-[#C4A56E] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#C4A56E] border-none text-white px-6 py-2.5 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-colors hover:bg-[#B8944F] font-sans"
                >
                  Send Request
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