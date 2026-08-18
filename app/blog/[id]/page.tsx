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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
  // FORM HANDLERS - UPDATED
  // ============================================================
  const handleRoomTypeToggle = (index: number) => {
    const updatedRoomTypes = [...bookingForm.roomTypes]
    updatedRoomTypes[index].selected = !updatedRoomTypes[index].selected
    if (!updatedRoomTypes[index].selected) {
      updatedRoomTypes[index].quantity = 0
    } else {
      // If selected, set default quantity to 1
      updatedRoomTypes[index].quantity = 1
    }
    setBookingForm({ ...bookingForm, roomTypes: updatedRoomTypes })
  }

  const handleRoomTypeChange = (index: number, value: number) => {
    const updatedRoomTypes = [...bookingForm.roomTypes]
    // Allow any positive number, max 10
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
  // UPDATED HANDLE SUBMIT - FIXED VALIDATION
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Fix: Check if any room type has both selected: true AND quantity > 0
    const selectedRooms = bookingForm.roomTypes.filter(r => r.selected === true && r.quantity > 0)
    
    if (selectedRooms.length === 0) {
      alert('Please select at least one room type and specify quantity.')
      return
    }

    // Show loading state
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
      
      // Reset form
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
      NAVIGATION
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
          <button 
            onClick={() => setModalOpen(true)}
            className="hidden md:inline-block bg-transparent border border-white text-white px-5 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#1A1510] font-sans relative overflow-hidden z-0 before:content-[''] before:absolute before:inset-0 before:bg-white before:scale-x-0 before:origin-right before:transition-transform before:duration-500 hover:before:scale-x-100 hover:before:origin-left before:z-[-1]"
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
      <div className={`fixed top-0 right-0 w-full h-screen bg-[#1A1510] z-[1500] transition-all duration-500 ease-in-out shadow-xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} role="navigation" aria-label="Mobile navigation">
        <button 
          className="absolute top-8 right-8 text-white text-2xl cursor-pointer opacity-60 hover:opacity-100"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <Link href="/" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link href="/#about" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/cuisines" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Cuisine</Link>
          <Link href="/rooms" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Stay</Link>
          <Link href="/gallery" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light hover:opacity-100 opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link href="/blog" className="text-white text-2xl tracking-[5px] font-['Cormorant_Garamond'] font-light opacity-100" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <button 
            onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
            className="mt-4 bg-transparent border border-[#C4A56E] text-[#C4A56E] px-6 py-3 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-[#C4A56E] hover:text-white font-sans"
          >
            Reserve
          </button>
        </div>
      </div>

      {/* ============================================================
      BLOG POST
      ============================================================ */}
      <section className="pt-32 pb-16 md:pb-20 bg-[#FFFDF9]" aria-label="Blog post content">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[#8B7A64] hover:text-[#C4A56E] transition-colors text-sm mb-6">
            <i className="fas fa-arrow-left"></i> Back to Blog
          </Link>

          {/* Featured Image */}
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
      <div className="mx-4 md:mx-[5%] py-8 md:py-12 lg:py-16 px-4 md:px-8 text-center bg-gradient-to-br from-[#1A1510] to-[#2C2418] text-white my-6 md:my-8 lg:my-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(196,165,110,0.6)] to-transparent" />
        <h2 className="font-serif text-[clamp(1.8rem,5vw,3rem)] font-light mb-3">Plan Your Safari Adventure</h2>
        <p className="text-white/60 mb-4 text-sm md:text-base">Let us help you create the perfect Serengeti experience</p>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-white text-[#1A1510] px-6 py-3 md:px-8 md:py-4 text-[0.65rem] tracking-[4px] uppercase cursor-pointer transition-all duration-300 hover:bg-white/90 hover:scale-105 font-sans font-medium shadow-lg inline-block no-underline"
        >
          Inquire About Availability
        </button>
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

      {/* ============================================================
      BOOKING MODAL - FIXED
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
              {/* Full Name */}
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

              {/* Email */}
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

              {/* Check-in / Check-out */}
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

              {/* Guest Details - MOVED ABOVE ROOM TYPES */}
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

              {/* Room Types with Checkboxes - MOVED BELOW GUEST DETAILS */}
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

              {/* Include Safari Checkbox */}
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

              {/* Safari Description */}
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

              {/* Special Requests */}
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

              {/* Buttons */}
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
        /* Prose styles for blog content */
        .prose {
          color: #2C2418;
          font-size: 1.1rem;
          line-height: 1.8;
        }
        .prose h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 2rem;
          font-weight: 400;
          color: #2C2418;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .prose h3 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.5rem;
          font-weight: 400;
          color: #2C2418;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .prose h4 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem;
          font-weight: 500;
          color: #2C2418;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose p {
          color: #5A4E3E;
          margin-bottom: 1.25rem;
        }
        .prose ul {
          list-style: none;
          padding-left: 0;
          margin-bottom: 1.25rem;
        }
        .prose ul li {
          color: #5A4E3E;
          padding-left: 1.75rem;
          position: relative;
          margin-bottom: 0.5rem;
        }
        .prose ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.7rem;
          width: 8px;
          height: 8px;
          background-color: #C4A56E;
          border-radius: 50%;
        }
        .prose strong {
          color: #2C2418;
          font-weight: 600;
        }
      `}</style>
    </>
  )
}