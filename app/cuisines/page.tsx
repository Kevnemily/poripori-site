'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Cuisines() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  // ============================================================
  // HERO IMAGES
  // ============================================================
  const heroImages = [
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/food11.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/food18.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/food21.webp',
    'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bar3.webp'
  ]

  // ============================================================
  // SIGNATURE EXPERIENCES
  // ============================================================
  const signatureExperiences = [
    {
      title: 'Bush Breakfast',
      description: 'Start your day with a gourmet breakfast overlooking the endless plains. Fresh pastries, seasonal fruits, and made-to-order eggs served hot in the wilderness.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner1.webp',
      tag: 'Daily at Sunrise',
      tagIcon: 'fa-sun'
    },
    {
      title: 'Sundowner Cocktails',
      description: 'Handcrafted cocktails and canapés at a scenic lookout point as the sun sets over the Serengeti — a truly magical golden hour experience.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786820420/bar1.webp',
      tag: 'Evening Sundowner',
      tagIcon: 'fa-wine-glass-alt'
    },
    {
      title: 'Starlit Bush Dinner',
      description: 'An unforgettable evening under the African sky with a multi-course dinner prepared by our chefs, surrounded by lanterns and the sounds of the wild.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner2.webp',
      tag: 'Private Dining Available',
      tagIcon: 'fa-star'
    }
  ]

  // ============================================================
  // ADDITIONAL EXPERIENCES
  // ============================================================
  const additionalExperiences = [
    {
      title: 'Private Picnic Safari',
      description: 'Enjoy a gourmet picnic lunch at a secluded spot during your game drive — complete with a table set up in the middle of the savannah.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786821390/food8.webp',
      tag: 'Customizable Menu',
      tagIcon: 'fa-basket-shopping'
    },
    {
      title: 'In-Suite Dining',
      description: 'Prefer privacy? Our butler service delivers gourmet meals directly to your suite — breakfast, lunch, or a romantic dinner on your private veranda.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786821632/food23.webp',
      tag: '24/7 Butler Service',
      tagIcon: 'fa-bed'
    },
    {
      title: 'Cooking Classes',
      description: 'Learn to prepare traditional Tanzanian dishes with our chefs. A hands-on experience that brings the flavors of East Africa to your home kitchen.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786812649/food18.webp',
      tag: 'Available on Request',
      tagIcon: 'fa-chalkboard-user'
    }
  ]

  // ============================================================
  // EFFECTS
  // ============================================================
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // ============================================================
  // LIGHTBOX FUNCTIONS
  // ============================================================
  const openLightbox = (imageUrl: string) => {
    setLightboxImage(imageUrl)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  // ============================================================
  // LOADING SCREEN
  // ============================================================
  if (loading) {
    return (
      <div className="fixed inset-0 z-[10000] bg-[#FBF8F4] flex items-center justify-center">
        <div className="text-center">
          <div className="w-[50px] h-[50px] border-2 border-[#D4BC8D] border-t-[#C4A56E] rounded-full animate-spin mx-auto" />
          <div className="mt-4 font-serif tracking-[6px] text-[12px] text-[#8B7A64]">Pori Pori</div>
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
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/97 backdrop-blur-[20px] shadow-sm border-b border-[rgba(196,165,110,0.2)]' : 'mix-blend-difference'}`} role="navigation" aria-label="Main navigation">
        <Link href="/" className="nav-brand" aria-label="Pori Pori Home">
          <img src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" alt="Pori Pori Serengeti" className={`h-[42px] md:h-[48px] w-auto transition-all duration-300 ${scrolled ? 'h-[38px] md:h-[42px]' : ''}`} width="48" height="48" fetchPriority="high" />
        </Link>
        
        <ul className="hidden lg:flex gap-8 list-none items-center">
          <li><Link href="/" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Home</Link></li>
          <li><Link href="/#about" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>About</Link></li>
          <li><Link href="/#experiences" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Experiences</Link></li>
          <li><Link href="/cuisines" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#B8944F]' : 'text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C4A56E]`}>Cuisine</Link></li>
          <li><Link href="/rooms" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Stay</Link></li>
          <li><Link href="/gallery" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Gallery</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setModalOpen(true)}
            className="hidden md:inline-block bg-transparent border border-[#C4A56E] text-[#C4A56E] px-5 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#C4A56E] hover:text-white font-sans relative overflow-hidden z-0 before:content-[''] before:absolute before:inset-0 before:bg-[#C4A56E] before:scale-x-0 before:origin-right before:transition-transform before:duration-500 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]"
            aria-label="Book your safari"
          >
            Reserve
          </button>
          <button 
            className="lg:hidden text-white text-xl cursor-pointer"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle menu"
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
          <Link href="/" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/#about" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/#experiences" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Experiences</Link>
          <Link href="/cuisines" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light opacity-100" onClick={() => setMobileMenuOpen(false)}>Cuisine</Link>
          <Link href="/rooms" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Stay</Link>
          <Link href="/gallery" className="text-white text-lg tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-80 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <button 
            onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
            className="mt-4 bg-transparent border border-[#C4A56E] text-[#C4A56E] px-6 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#C4A56E] hover:text-white font-sans"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* ============================================================
      HERO SECTION - SMOOTH CROSSFADE
      ============================================================ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden bg-[#2C2418]" aria-label="Cuisine hero banner">
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full transition-opacity duration-[1.2s] ease-in-out z-0 ${
                index === currentSlide ? 'opacity-100 z-[1]' : 'opacity-0'
              }`}
            >
              <img
                src={img}
                alt={`Pori Pori Cuisine ${index + 1}`}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/50 z-[2]" />
        
        <div className="relative z-[3] h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-[0.65rem] tracking-[10px] text-[#D4BC8D] uppercase font-sans font-light mb-6">
            Gastronomy
          </p>
          <h1 className="font-['Cormorant_Garamond'] text-[clamp(3.5rem,7vw,7rem)] font-light leading-[1.05] text-white mb-6 tracking-[-0.02em]">
            Cuisine & <em className="text-[#D4BC8D] not-italic">Dining</em>
          </h1>
          <p className="text-[0.9rem] tracking-[5px] text-white/75 font-light max-w-[600px] leading-relaxed">
            A culinary journey through the flavors of East Africa — from bush breakfasts at sunrise to elegant starlit dinners
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[5] flex flex-col items-center gap-3">
          <span className="text-[0.6rem] tracking-[4px] text-white/50 uppercase font-light">Scroll</span>
          <div className="w-[1px] h-[50px] bg-white/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[30%] bg-white animate-[scrollDown_2.5s_ease-in-out_infinite]" />
          </div>
        </div>

        <div className="absolute bottom-8 right-8 z-[10] flex gap-3" role="tablist" aria-label="Hero slideshow navigation">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-[6px] h-[6px] border border-white/50 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white border-white w-6 rounded-[3px]' : 'hover:border-white hover:scale-110'
              }`}
              onClick={() => setCurrentSlide(index)}
              role="tab"
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ============================================================
      SIGNATURE DINING
      ============================================================ */}
      <section className="py-16 md:py-20 lg:py-24 max-w-[100vw] overflow-x-hidden" aria-label="Signature dining experiences">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <p className="text-[0.6rem] tracking-[8px] text-[#C4A56E] uppercase text-center font-medium mb-4">
            Signature Experiences
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-normal text-center text-[#2C2418] mb-4 leading-[1.15]">
            Our Dining Philosophy
          </h2>
          <p className="text-center text-[#8B7A64] max-w-[600px] mx-auto mb-12 md:mb-16 text-sm md:text-base font-light leading-relaxed">
            Each meal is carefully crafted to celebrate local ingredients and create unforgettable moments in the wild
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {signatureExperiences.map((item, index) => (
              <div 
                key={index}
                className="bg-white overflow-hidden border border-[rgba(196,165,110,0.2)] transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-[#C4A56E] group"
                onClick={() => openLightbox(item.image)}
              >
                <div 
                  className="h-[300px] bg-cover bg-center transition-transform duration-800 group-hover:scale-105 bg-[#F3EDE4]"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="p-6 md:p-8">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2C2418] mb-3">{item.title}</h3>
                  <p className="text-[#8B7A64] text-sm leading-relaxed font-light mb-4">{item.description}</p>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-[rgba(196,165,110,0.2)] text-[0.65rem] tracking-[2px] text-[#C4A56E] uppercase font-medium">
                    <i className={`fas ${item.tagIcon} text-xs`}></i> {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      OUR CHEFS SECTION
      ============================================================ */}
      <section className="py-16 md:py-20 lg:py-24 bg-[#F3EDE4] max-w-[100vw] overflow-x-hidden" aria-label="Meet our chefs">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <p className="text-[0.6rem] tracking-[8px] text-[#C4A56E] uppercase text-center font-medium mb-4">
            Culinary Artistry
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-[#F3EDE4]">
              <div className="absolute top-[-25px] left-[-25px] w-[200px] h-[200px] border border-[rgba(196,165,110,0.3)] z-[-1] hidden md:block" />
              <img 
                src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786821094/chef2.webp"
                alt="Our talented chefs at Pori Pori Serengeti preparing East African cuisine"
                className="w-full h-full object-cover transition-transform duration-800 hover:scale-105 bg-[#F3EDE4]"
                loading="eager"
                width="800"
                height="600"
              />
            </div>
            <div>
              <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl font-normal text-[#2C2418] mb-4 leading-[1.2]">
                Meet Our Chefs
              </h2>
              <p className="text-[#8B7A64] leading-relaxed font-light mb-4 text-sm md:text-base">
                Our culinary team brings together decades of experience from the finest lodges and restaurants across East Africa. Their collective philosophy combines traditional Swahili flavors with contemporary techniques, using the freshest local ingredients sourced from Tanzanian farms and the surrounding region.
              </p>
              <p className="text-[#8B7A64] leading-relaxed font-light mb-6 text-sm md:text-base">
                From the catch of the day from Lake Victoria to organic vegetables from the nearby highlands, every dish tells a story of the land. Our chefs personally oversee each meal, ensuring that your dining experience is as memorable as your game drives.
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-4 p-4 bg-white border border-[rgba(196,165,110,0.2)] transition-all duration-300 hover:border-[#C4A56E] hover:translate-x-1">
                  <i className="fas fa-seedling text-[#C4A56E] text-lg mt-1"></i>
                  <div>
                    <h4 className="font-['Cormorant_Garamond'] text-lg font-medium text-[#2C2418] mb-1">Farm-to-Table Freshness</h4>
                    <p className="text-[#8B7A64] text-sm font-light">Ingredients sourced daily from local Tanzanian farms and markets, ensuring peak freshness and supporting community agriculture.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-white border border-[rgba(196,165,110,0.2)] transition-all duration-300 hover:border-[#C4A56E] hover:translate-x-1">
                  <i className="fas fa-fire text-[#C4A56E] text-lg mt-1"></i>
                  <div>
                    <h4 className="font-['Cormorant_Garamond'] text-lg font-medium text-[#2C2418] mb-1">Open-Flame Cooking</h4>
                    <p className="text-[#8B7A64] text-sm font-light">Traditional techniques meet modern gastronomy with dishes prepared over open fires, infusing meals with authentic safari character.</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-[rgba(196,165,110,0.2)]">
                <h4 className="font-['Cormorant_Garamond'] text-xl text-[#B8944F] mb-4 font-medium">Signature Dishes</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[#8B7A64] font-light text-sm">
                    <i className="fas fa-circle text-[#C4A56E] text-[0.5rem]"></i> Grilled Tilapia with Coconut Curry & Saffron Rice
                  </div>
                  <div className="flex items-center gap-3 text-[#8B7A64] font-light text-sm">
                    <i className="fas fa-circle text-[#C4A56E] text-[0.5rem]"></i> Nyama Choma — Traditional Grilled Meat with Plantains
                  </div>
                  <div className="flex items-center gap-3 text-[#8B7A64] font-light text-sm">
                    <i className="fas fa-circle text-[#C4A56E] text-[0.5rem]"></i> Spiced Pilau Rice with Slow-Roasted Lamb
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
      ADDITIONAL EXPERIENCES
      ============================================================ */}
      <section className="py-16 md:py-20 lg:py-24 max-w-[100vw] overflow-x-hidden" aria-label="Additional culinary experiences">
        <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
          <p className="text-[0.6rem] tracking-[8px] text-[#C4A56E] uppercase text-center font-medium mb-4">
            Additional Offerings
          </p>
          <h2 className="font-['Cormorant_Garamond'] text-[clamp(2.5rem,5vw,4rem)] font-normal text-center text-[#2C2418] mb-4 leading-[1.15]">
            More Culinary Experiences
          </h2>
          <p className="text-center text-[#8B7A64] max-w-[600px] mx-auto mb-12 md:mb-16 text-sm md:text-base font-light">
            Explore the diverse flavors of the Serengeti
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {additionalExperiences.map((item, index) => (
              <div 
                key={index}
                className="bg-white overflow-hidden border border-[rgba(196,165,110,0.2)] transition-all duration-500 cursor-pointer hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:border-[#C4A56E] group"
                onClick={() => openLightbox(item.image)}
              >
                <div 
                  className="h-[300px] bg-cover bg-center transition-transform duration-800 group-hover:scale-105 bg-[#F3EDE4]"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
                <div className="p-6 md:p-8">
                  <h3 className="font-['Cormorant_Garamond'] text-2xl font-medium text-[#2C2418] mb-3">{item.title}</h3>
                  <p className="text-[#8B7A64] text-sm leading-relaxed font-light mb-4">{item.description}</p>
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-[rgba(196,165,110,0.2)] text-[0.65rem] tracking-[2px] text-[#C4A56E] uppercase font-medium">
                    <i className={`fas ${item.tagIcon} text-xs`}></i> {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[6%] py-12 md:py-16 lg:py-20 px-6 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-8 md:my-12 lg:my-16 relative overflow-hidden max-w-[calc(100vw-2rem)] md:max-w-[calc(100vw-12%)]">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.5)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.5)] to-transparent" />
        <h2 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl lg:text-5xl font-light mb-4">Reserve Your Dining Experience</h2>
        <p className="text-white/60 mb-6 font-light text-sm md:text-base">Let us know your preferences and we'll create an unforgettable culinary journey for you</p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-transparent border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[5px] uppercase cursor-pointer transition-all duration-500 font-sans font-light relative overflow-hidden z-0 before:content-[''] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-right before:transition-transform before:duration-500 hover:before:scale-x-100 hover:before:origin-left hover:text-[#1A1510] hover:border-white before:z-[-1]"
          aria-label="Inquire about dining"
        >
          Inquire About Dining
        </button>
      </div>

      {/* ============================================================
      LIGHTBOX
      ============================================================ */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/97 z-[4000] flex items-center justify-center cursor-pointer"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-8 right-8 text-white text-3xl opacity-60 hover:opacity-100 transition-opacity font-light"
            onClick={closeLightbox}
            aria-label="Close image viewer"
          >
            &times;
          </button>
          <img 
            src={lightboxImage} 
            alt="Enlarged dining experience"
            className="max-w-[90%] max-h-[90vh] object-contain"
          />
        </div>
      )}

      {/* ============================================================
      BOOKING MODAL
      ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[4500] flex items-center justify-center p-4" role="dialog" aria-label="Booking form">
          <div className="bg-white max-w-md w-full max-h-[85vh] overflow-y-auto rounded-none">
            <div className="bg-[#1A1510] p-6 text-white text-center relative">
              <h3 className="font-['Cormorant_Garamond'] text-xl font-normal">Reserve Your Safari</h3>
              <p className="text-sm text-white/60 mt-1">Our team will respond within 12 hours</p>
              <button 
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-5 text-white text-2xl cursor-pointer"
                aria-label="Close booking form"
              >
                &times;
              </button>
            </div>

            <form className="p-6" onSubmit={(e) => {
              e.preventDefault()
              alert('Thank you! We will contact you within 12 hours.')
              setModalOpen(false)
            }}>
              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="Your name"
                  aria-label="Your full name"
                />
              </div>

              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="hello@example.com"
                  aria-label="Your email address"
                />
              </div>

              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="+255 123 456 789"
                  aria-label="Your phone number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-in *</label>
                  <input
                    type="date"
                    required
                    className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                    aria-label="Check-in date"
                  />
                </div>
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-out *</label>
                  <input
                    type="date"
                    required
                    className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                    aria-label="Check-out date"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Adults</label>
                  <select className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm" aria-label="Number of adults">
                    {[1,2,3,4,5,6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Children</label>
                  <select className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm" aria-label="Number of children">
                    {[0,1,2,3,4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Special Requests</label>
                <textarea
                  rows={3}
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="Dietary needs, room preferences, celebration requests..."
                  aria-label="Special requests"
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
          50% { opacity: 1; }
          100% { transform: translateY(350%); opacity: 0; }
        }
      `}</style>
    </>
  )
}