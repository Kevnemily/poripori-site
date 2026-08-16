'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

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

export default function BlogPostPage() {
  const params = useParams()
  const postId = parseInt(params.id as string)
  
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ============================================================
  // BLOG POSTS DATA - WITH OPTIMIZED IMAGES
  // ============================================================
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: 'The Great Migration: Nature\'s Greatest Spectacle',
      excerpt: 'Witness the annual migration of over 1.5 million wildebeest across the Serengeti plains.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_1200/v1786826166/zebra.webp',
      date: 'June 15, 2025',
      readTime: '5 min read',
      category: 'Wildlife',
      content: `
        <p>The Great Migration is one of the most spectacular natural events on Earth. Every year, over 1.5 million wildebeest, accompanied by hundreds of thousands of zebras and gazelles, make a circular journey across the Serengeti ecosystem in search of fresh grazing and water.</p>
        
        <p>This incredible journey spans approximately 800 kilometers (500 miles) and takes the herds through the Serengeti in Tanzania and the Maasai Mara in Kenya. The migration is driven by the seasonal rains and the availability of grass and water.</p>
        
        <h3>When to Witness the Migration</h3>
        <p>The best time to witness the Great Migration depends on what you want to see:</p>
        <ul>
          <li><strong>December - March:</strong> Calving season in the southern Serengeti. Over 8,000 wildebeest calves are born daily.</li>
          <li><strong>April - May:</strong> The herds begin their journey north, crossing the central Serengeti.</li>
          <li><strong>June - July:</strong> Dramatic river crossings at the Grumeti River.</li>
          <li><strong>August - October:</strong> The famous Mara River crossings in the northern Serengeti.</li>
        </ul>
        
        <h3>What Makes Pori Pori Special</h3>
        <p>Pori Pori's Migration Camp is strategically positioned to follow the herds, ensuring you have front-row seats to nature's greatest show. Our expert guides will take you to the best viewing spots, sharing their knowledge of animal behavior and the ecosystem.</p>
        
        <p>Whether you're witnessing a river crossing or watching newborn calves take their first steps, the Great Migration is an experience that will stay with you forever.</p>
      `
    },
    {
      id: 2,
      title: 'Luxury Safari: What to Expect at Pori Pori',
      excerpt: 'From private butler service to gourmet bush dinners, discover the ultimate safari experience.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_1200/v1786809435/double.webp',
      date: 'May 28, 2025',
      readTime: '4 min read',
      category: 'Luxury',
      content: `
        <p>At Pori Pori, we believe that luxury is not just about comfort—it's about creating moments that take your breath away. From the moment you arrive, you'll be immersed in an experience that combines the best of African hospitality with world-class amenities.</p>
        
        <h3>Your Canvas Suite</h3>
        <p>Each of our eight canvas suites is designed to provide the ultimate in comfort while keeping you connected to the wilderness. Features include:</p>
        <ul>
          <li>King-sized beds with premium linens</li>
          <li>En-suite bathrooms with hot water on demand</li>
          <li>Private decks with stunning Serengeti views</li>
          <li>Solar-powered lighting and charging stations</li>
          <li>Personalized butler service</li>
        </ul>
        
        <h3>Gourmet Dining</h3>
        <p>Our culinary team creates exquisite meals using fresh, local ingredients. Dining experiences include:</p>
        <ul>
          <li><strong>Bush Breakfasts:</strong> Start your day with a gourmet breakfast overlooking the plains.</li>
          <li><strong>Sundowner Cocktails:</strong> Handcrafted drinks at sunset in the middle of the savannah.</li>
          <li><strong>Starlit Bush Dinners:</strong> Multi-course dinners under the African sky.</li>
        </ul>
        
        <h3>Safari Experiences</h3>
        <p>Your stay includes twice-daily game drives with expert naturalists, who will guide you through the Serengeti's diverse ecosystems and help you spot the Big Five and other wildlife.</p>
      `
    },
    {
      id: 3,
      title: 'The Best Time to Visit the Serengeti',
      excerpt: 'A comprehensive guide to the seasons and wildlife viewing opportunities in the Serengeti.',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_1200/v1786826166/birds.webp',
      date: 'May 10, 2025',
      readTime: '6 min read',
      category: 'Travel Guide',
      content: `
        <p>Planning your safari requires understanding the Serengeti's seasons and how they affect wildlife viewing. Here's a comprehensive guide to help you choose the perfect time for your adventure.</p>
        
        <h3>The Seasons in the Serengeti</h3>
        <p>The Serengeti has two main seasons, each offering unique experiences:</p>
        
        <h4>Dry Season (June - October)</h4>
        <ul>
          <li>Clear skies and sunny days</li>
          <li>Wildlife congregates around water sources</li>
          <li>Ideal for game viewing</li>
          <li>Popular time for river crossings</li>
          <li>Cooler temperatures</li>
        </ul>
        
        <h4>Wet Season (November - May)</h4>
        <ul>
          <li>Lush green landscapes</li>
          <li>Calving season (January - March)</li>
          <li>Fewer tourists</li>
          <li>Dramatic skies and stunning photography</li>
          <li>Bird watching at its best</li>
        </ul>
        
        <h3>Migration Calendar</h3>
        <ul>
          <li><strong>January - March:</strong> Calving season in southern Serengeti</li>
          <li><strong>April - May:</strong> Migration moves north</li>
          <li><strong>June - July:</strong> Grumeti River crossings</li>
          <li><strong>August - October:</strong> Mara River crossings</li>
          <li><strong>November - December:</strong> Migration returns south</li>
        </ul>
        
        <p>No matter when you visit, the Serengeti offers extraordinary wildlife encounters. At Pori Pori, we position our Migration Camp to follow the herds, ensuring you have the best possible experience.</p>
      `
    }
  ]

  const post = blogPosts.find(p => p.id === postId)

  // ============================================================
  // POST NOT FOUND
  // ============================================================
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFFDF9]">
        <div className="text-center">
          <h1 className="font-serif text-3xl text-[#2C2418] mb-2">Post Not Found</h1>
          <p className="text-[#8B7A64] mb-4">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="text-[#C4A56E] hover:text-[#B8944F] transition-colors">
            ← Back to Blog
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
      NAVIGATION - FIXED LOGO
      ============================================================ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 flex justify-between items-center transition-all duration-300 ${scrolled ? 'bg-white/97 backdrop-blur-[20px] shadow-sm border-b border-[rgba(196,165,110,0.2)]' : 'mix-blend-difference'}`} role="navigation" aria-label="Main navigation">
        <Link href="/" className="nav-brand" aria-label="Pori Pori Home">
          <img src="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_120/v1786809435/logo.webp" alt="Pori Pori Serengeti" className={`h-[42px] md:h-[48px] w-auto transition-all duration-300 ${scrolled ? 'h-[38px] md:h-[42px]' : ''}`} width="120" height="120" fetchPriority="high" />
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
      BLOG POST - INSTANT LOAD
      ============================================================ */}
      <section className="pt-32 pb-16 md:pb-20 bg-[#FFFDF9]" aria-label="Blog post content">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#8B7A64] hover:text-[#C4A56E] transition-colors text-sm mb-6">
            <i className="fas fa-arrow-left"></i> Back to Blog
          </Link>

          {/* Featured Image - OPTIMIZED */}
          <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl bg-[#F3EDE4] mb-8">
            <img 
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              decoding="sync"
              width="1200"
              height="600"
              onError={(e) => {
                e.currentTarget.src = 'https://placehold.co/1200x600/1e293b/fcd34d?text=Pori+Pori'
              }}
            />
            {/* Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
              <span className="inline-block bg-[#C4A56E]/90 text-white text-[0.6rem] tracking-[2px] uppercase px-3 py-1 rounded mb-3">
                {post.category}
              </span>
              <h1 className="text-white font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
                {post.title}
              </h1>
              <div className="flex items-center gap-4 text-white/70 text-sm mt-3">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          {/* Blog Content */}
          <div 
            className="prose prose-lg prose-gold max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
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