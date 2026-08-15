'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // ============================================================
  // HERO IMAGES - Each with its correct version number
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
  // BLOG POSTS
  // ============================================================
  const blogPosts = [
    {
      id: 1,
      title: 'The Great Migration: Nature\'s Greatest Spectacle',
      excerpt: 'Witness the annual migration of over 1.5 million wildebeest across the Serengeti plains.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp',
      date: 'June 15, 2025',
      readTime: '5 min read',
      category: 'Wildlife'
    },
    {
      id: 2,
      title: 'Luxury Safari: What to Expect at Pori Pori',
      excerpt: 'From private butler service to gourmet bush dinners, discover the ultimate safari experience.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp',
      date: 'May 28, 2025',
      readTime: '4 min read',
      category: 'Luxury'
    },
    {
      id: 3,
      title: 'The Best Time to Visit the Serengeti',
      excerpt: 'A comprehensive guide to the seasons and wildlife viewing opportunities in the Serengeti.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655110/lion.jpg',
      date: 'May 10, 2025',
      readTime: '6 min read',
      category: 'Travel Guide'
    }
  ]

  // ============================================================
  // FAQ DATA
  // ============================================================
  const faqs = [
    {
      question: 'What is included in the nightly rate?',
      answer: 'All rates include three gourmet meals daily, select beverages, twice-daily shared game drives, park fees, and airport transfers.'
    },
    {
      question: 'When is the best time to visit?',
      answer: 'The Great Migration is year-round. June-October offers dramatic river crossings, while December-March features the calving season.'
    },
    {
      question: 'Do you accommodate dietary restrictions?',
      answer: 'Absolutely. Our chef accommodates vegetarian, vegan, gluten-free, and allergies with advance notice.'
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

  // ============================================================
  // TOGGLE FAQ
  // ============================================================
  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  // ============================================================
  // RENDER
  // ============================================================
  return (
    <>
      {/* ============================================================
      NAVIGATION
      ============================================================ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'mix-blend-difference'}`} role="navigation" aria-label="Main navigation">
        <Link href="/" className="nav-brand" aria-label="Pori Pori Home">
          <img src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" alt="Pori Pori Serengeti" className="h-10 md:h-12 w-auto" width="48" height="48" fetchPriority="high" />
        </Link>
        
        <ul className="hidden lg:flex gap-8 list-none">
          <li><a href="#about" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">About</a></li>
          <li><a href="#experiences" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Experiences</a></li>
          <li><Link href="/cuisines" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Cuisine</Link></li>
          <li><Link href="/rooms" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Stay</Link></li>
          <li><Link href="/gallery" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Gallery</Link></li>
          <li><a href="#blog" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Blog</a></li>
        </ul>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setModalOpen(true)}
            className="hidden md:inline-block bg-transparent border border-gold text-gold px-5 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-gold hover:text-white font-sans"
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

      {/* ============================================================
      MOBILE NAVIGATION
      ============================================================ */}
      <div className={`fixed top-0 right-0 w-4/5 max-w-xs h-screen bg-dark z-50 transition-all duration-400 ease-in-out shadow-xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          className="absolute top-4 right-4 text-white text-xl cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <a href="#about" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#experiences" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Experiences</a>
          <Link href="/cuisines" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Cuisine</Link>
          <Link href="/rooms" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Stay</Link>
          <Link href="/gallery" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <a href="#blog" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Blog</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
            className="mt-4 bg-transparent border border-gold text-gold px-6 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-gold hover:text-white font-sans"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* ============================================================
      HERO SECTION - SMOOTH CROSSFADE
      ============================================================ */}
      <section className="relative h-screen min-h-[600px] overflow-hidden bg-dark">
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
                alt={`Pori Pori Safari ${index + 1}`}
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/5 to-black/50" />
        
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
          <p className="text-[clamp(0.6rem,3vw,0.65rem)] tracking-[clamp(6px,2vw,10px)] text-gold-light uppercase font-sans font-light mb-4">
            Serengeti · Tanzania
          </p>
          <h1 className="font-serif text-[clamp(2.8rem,8vw,7rem)] font-light leading-[1.1] text-white mb-4 tracking-[-0.02em]">
            Where Golden Light<br /><em className="text-gold-light not-italic">Meets the Wild</em>
          </h1>
          <p className="text-[clamp(0.7rem,3vw,0.9rem)] tracking-[clamp(3px,1.5vw,5px)] text-white/75 font-light mb-6 max-w-[90%]">
            Exclusive canvas suites · Private butler service · The Great Migration at your doorstep
          </p>
          <Link
            href="/rooms"
            className="bg-transparent border border-white/40 text-white px-6 py-3 text-[clamp(0.6rem,2.5vw,0.7rem)] tracking-[4px] uppercase cursor-pointer transition-all duration-600 inline-flex items-center gap-3 font-sans font-light hover:bg-white hover:text-dark hover:border-white group no-underline"
          >
            Begin Your Journey <i className="fas fa-arrow-right transition-all duration-300 group-hover:translate-x-1"></i>
          </Link>
        </div>

        {/* Hero Dots */}
        <div className="absolute bottom-6 right-6 z-10 flex gap-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-1.5 h-1.5 border border-white/50 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white border-white w-5 rounded-[3px]' : ''
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* ============================================================
      ABOUT SECTION
      ============================================================ */}
      <section id="about" className="py-12 md:py-16 lg:py-20">
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
                alt="Luxury safari experience at Pori Pori Serengeti"
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
      EXPERIENCES SECTION
      ============================================================ */}
      <section id="experiences" className="py-12 md:py-16 lg:py-20 bg-sand">
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
      <section id="cuisine" className="py-12 md:py-16 lg:py-20">
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
      BLOG SECTION
      ============================================================ */}
      <section id="blog" className="py-12 md:py-16 lg:py-20 bg-sand">
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
              <div key={post.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl group">
                <div className="relative h-[220px] overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
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
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-charcoal mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-taupe text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.id}`} 
                    className="inline-flex items-center gap-2 text-gold text-[0.7rem] tracking-[2px] uppercase font-medium mt-4 hover:gap-3 transition-all duration-300"
                  >
                    Read More <i className="fas fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      GALLERY PREVIEW
      ============================================================ */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            Moments
          </p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-normal text-center text-charcoal mb-2">
            Captured in Time
          </h2>
          <p className="text-center text-taupe mb-8 md:mb-10 text-sm md:text-base font-light">Click any image to view larger</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            <div className="aspect-[4/3] overflow-hidden cursor-pointer relative bg-sand group">
              <img 
                src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp"
                alt="Pori Pori gallery 1"
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
            </div>

            <div className="aspect-[4/3] overflow-hidden cursor-pointer relative bg-sand group">
              <img 
                src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826167/birds.webp"
                alt="Pori Pori gallery 2"
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
            </div>

            <div className="aspect-[4/3] overflow-hidden cursor-pointer relative bg-sand group">
              <img 
                src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/bushdinner1.webp"
                alt="Pori Pori gallery 3"
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
            </div>

            <div className="aspect-[4/3] overflow-hidden cursor-pointer relative bg-sand group">
              <img 
                src="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786827551/food3.webp"
                alt="Pori Pori gallery 4"
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
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link href="/gallery" className="text-gold text-[0.7rem] tracking-[3px] uppercase no-underline hover:tracking-[5px] transition-all duration-300">
              View Full Gallery <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
      FAQ SECTION - WORKING TOGGLE
      ============================================================ */}
      <section className="py-12 md:py-16 lg:py-20">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <p className="text-[0.6rem] tracking-[6px] text-gold uppercase text-center font-medium mb-3 md:mb-4">
            Inquiries
          </p>
          <h2 className="font-serif text-[clamp(2rem,6vw,3.5rem)] font-normal text-center text-charcoal mb-8">
            Frequently Asked
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border-b border-gold/20 py-4 cursor-pointer group"
                onClick={() => toggleFaq(index)}
              >
                <div className="flex justify-between items-center font-serif text-lg md:text-xl font-medium">
                  {faq.question}
                  <span className={`w-6 h-6 border border-gold/20 flex items-center justify-center transition-all duration-300 rounded-full group-hover:border-gold ${activeFaq === index ? 'bg-gold text-white border-gold rotate-45' : ''}`}>
                    +
                  </span>
                </div>
                <div className={`overflow-hidden transition-all duration-400 text-taupe text-sm leading-relaxed ${activeFaq === index ? 'max-h-40 pt-4' : 'max-h-0'}`}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION - Opens Modal
      ============================================================ */}
      <div className="mx-4 md:mx-[5%] py-8 md:py-12 lg:py-16 px-4 md:px-8 text-center bg-gradient-to-br from-dark to-[#2C2418] text-white my-6 md:my-8 lg:my-12">
        <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light mb-3">Begin Your Safari Story</h2>
        <p className="text-white/60 mb-4 text-sm md:text-base">Let us craft your perfect Serengeti adventure</p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-transparent border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white hover:text-dark hover:border-white"
        >
          Inquire About Availability
        </button>
      </div>

      {/* ============================================================
      BOOKING MODAL
      ============================================================ */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/95 z-[4500] flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full max-h-[85vh] overflow-y-auto rounded-none">
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
                />
              </div>

              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="hello@example.com"
                />
              </div>

              <div className="mb-4">
                <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="+255 123 456 789"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-in *</label>
                  <input
                    type="date"
                    required
                    className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="text-[0.6rem] tracking-[3px] uppercase text-[#8B7A64] block mb-1">Check-out *</label>
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
                  rows={3}
                  className="w-full p-2.5 border border-[#E0D5C8] bg-[#FFFDF9] font-sans text-sm"
                  placeholder="Dietary needs, room preferences, celebration requests..."
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
    </>
  )
}