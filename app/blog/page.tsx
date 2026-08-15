'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  readTime: string
  category: string
  content: string
}

export default function BlogPage() {
  const [scrolled, setScrolled] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Great Migration: Nature\'s Greatest Spectacle',
      excerpt: 'Witness the annual migration of over 1.5 million wildebeest across the Serengeti plains. Experience nature\'s most incredible wildlife event.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp',
      date: 'June 15, 2025',
      readTime: '5 min read',
      category: 'Wildlife',
      content: `The Great Migration is one of the most spectacular natural events on Earth. Every year, over 1.5 million wildebeest make a circular journey across the Serengeti ecosystem.`
    },
    {
      id: 2,
      title: 'Luxury Safari: What to Expect at Pori Pori',
      excerpt: 'From private butler service to gourmet bush dinners, discover the ultimate safari experience at Pori Pori Serengeti.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp',
      date: 'May 28, 2025',
      readTime: '4 min read',
      category: 'Luxury',
      content: `At Pori Pori, we believe that luxury is not just about comfort—it's about creating moments that take your breath away.`
    },
    {
      id: 3,
      title: 'The Best Time to Visit the Serengeti',
      excerpt: 'A comprehensive guide to the seasons and wildlife viewing opportunities in the Serengeti. Plan your perfect safari.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/birds.webp',
      date: 'May 10, 2025',
      readTime: '6 min read',
      category: 'Travel Guide',
      content: `Planning your safari requires understanding the Serengeti's seasons and how they affect wildlife viewing.`
    }
  ]

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
          <li><Link href="/cuisines" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Cuisine</Link></li>
          <li><Link href="/rooms" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Stay</Link></li>
          <li><Link href="/gallery" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#2C2418] hover:text-[#B8944F]' : 'text-white/90 hover:text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C4A56E] after:transition-all after:duration-500 hover:after:w-full`}>Gallery</Link></li>
          <li><Link href="/blog" className={`text-[0.68rem] tracking-[3px] uppercase transition-colors duration-300 ${scrolled ? 'text-[#B8944F]' : 'text-[#D4BC8D]'} relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-[#C4A56E]`}>Blog</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          <button className="hidden md:inline-block bg-transparent border border-gold text-gold px-5 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-gold hover:text-white font-sans">
            Reserve
          </button>
          <button className="lg:hidden text-white text-xl cursor-pointer">
            <i className="fas fa-bars"></i>
          </button>
        </div>
      </nav>

      {/* ============================================================
      HERO SECTION
      ============================================================ */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden bg-dark flex items-center" aria-label="Blog hero banner">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/birds.webp')" }}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-8 text-center text-white">
          <p className="text-[0.6rem] tracking-[8px] text-gold-light uppercase font-light mb-3">Stories</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-light">Our Blog</h1>
          <p className="text-white/70 font-light max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Insights and stories from the heart of the Serengeti
          </p>
        </div>
      </section>

      {/* ============================================================
      BLOG POSTS GRID
      ============================================================ */}
      <section className="py-16 md:py-20 bg-[#FFFDF9]" aria-label="Blog posts">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {blogPosts.map((post) => (
              <Link 
                key={post.id} 
                href={`/blog/${post.id}`}
                className="group block bg-white rounded-xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl no-underline"
              >
                <div className="relative h-[220px] overflow-hidden bg-[#F3EDE4]">
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
                  <div className="absolute top-4 left-4 bg-[#C4A56E]/90 text-white text-[0.6rem] tracking-[2px] uppercase px-3 py-1 rounded">
                    {post.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 text-[0.65rem] text-[#8B7A64] font-light mb-2">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-serif text-xl font-medium text-[#2C2418] mb-2 line-clamp-2 group-hover:text-[#C4A56E] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-[#8B7A64] text-sm font-light leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[#C4A56E] text-[0.7rem] tracking-[2px] uppercase font-medium mt-4 group-hover:gap-3 transition-all duration-300">
                    Read More <i className="fas fa-arrow-right"></i>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
      CTA SECTION
      ============================================================ */}
      <div className="mx-4 md:mx-[5%] py-8 md:py-12 lg:py-16 px-4 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-6 md:my-8 lg:my-12">
        <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light mb-3">Plan Your Safari Adventure</h2>
        <p className="text-white/60 mb-4 text-sm md:text-base">Let us help you create the perfect Serengeti experience</p>
        <Link href="/#contact" className="bg-transparent border border-white/30 text-white px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#1A1510] hover:border-white inline-block no-underline">
          Contact Us
        </Link>
      </div>

      {/* ============================================================
      FOOTER
      ============================================================ */}
      <footer className="bg-[#1A1510] text-white/60 pt-12 pb-8 px-[5%] max-w-[100vw] overflow-x-hidden">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-['Cormorant_Garamond'] text-xl font-normal mb-3">Pori Pori</h3>
              <p className="text-sm text-white/40 font-light">
                An intimate ultra-luxury safari sanctuary in the heart of the Serengeti. Where golden light meets untamed wilderness.
              </p>
              <div className="flex gap-3 mt-4">
                <a href="#" className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Explore</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Home</Link></li>
                <li><Link href="/#about" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">About</Link></li>
                <li><Link href="/cuisines" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Cuisine</Link></li>
                <li><Link href="/rooms" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Suites</Link></li>
                <li><Link href="/gallery" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Gallery</Link></li>
                <li><Link href="/blog" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Contact</h4>
              <ul className="space-y-2">
                <li><a href="mailto:reservations@poripori.com" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">reservations@poripori.com</a></li>
                <li><a href="tel:+255754430599" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">+255 754 430 599</a></li>
                <li><span className="text-white/40 text-sm font-light">Serengeti, Tanzania</span></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Privacy Policy</a></li>
                <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Terms & Conditions</a></li>
                <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-4 text-center text-[0.65rem] text-white/25 font-light tracking-[1px]">
            <p>&copy; {new Date().getFullYear()} Pori Pori Serengeti — All rights reserved</p>
          </div>
        </div>
      </footer>
    </>
  )
}