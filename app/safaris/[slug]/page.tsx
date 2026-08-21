'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function SafariDetailsPage() {
  const params = useParams()
  const slug = params?.slug as string
  
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedPackage, setSelectedPackage] = useState<any>(null)
  
  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxImage, setLightboxImage] = useState('')
  const [lightboxTitle, setLightboxTitle] = useState('')
  
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
  // EFFECTS
  // ============================================================
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
  // SAFARI PACKAGES DATA
  // ============================================================
  const safariPackages = [
    {
      id: 1,
      title: 'The Great Migration Safari',
      slug: 'great-migration-safari',
      duration: '5 Days / 4 Nights',
      description: 'Witness nature\'s greatest spectacle as over 2 million wildebeest and zebras thunder across the Serengeti plains.',
      fullDescription: `The Great Migration is one of the most spectacular wildlife events on Earth. This safari takes you to the heart of the action, where you'll witness the dramatic river crossings and predator-prey interactions that define this natural wonder.

Over five days, you'll explore the Serengeti's vast plains with expert guides who know exactly where to find the herds. From the thrilling river crossings to intimate moments watching lion prides, every day brings new adventures.

Our exclusive access to private concessions means you'll avoid the crowds and enjoy prime viewing positions. Whether it's the thunder of hooves or the roar of a lion, this safari will leave you breathless.`,
      price: 'From $2,850',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp',
      images: [
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp', alt: 'Zebra on Serengeti plains' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655000/image00048_dpxzim.jpg', alt: 'Elephant in Serengeti' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp', alt: 'Serengeti landscape' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/bushdinner1.webp', alt: 'Bush dinner experience' }
      ],
      highlights: ['River Crossings', 'Expert Guides', 'Full-Board', 'Photography Tips'],
      includes: [
        'Accommodation in luxury canvas suites',
        'All meals and select beverages',
        'Expert safari guide and private vehicle',
        'Park entrance fees',
        'Airport transfers',
        'Complimentary Wi-Fi'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Arrival & Serengeti Introduction',
          description: 'Arrive at Seronera Airstrip and transfer to Pori Pori. Enjoy a welcome lunch followed by an afternoon game drive to familiarize yourself with the Serengeti landscape and wildlife.'
        },
        {
          day: 'Day 2',
          title: 'The Great Migration Experience',
          description: 'Full day exploring the Serengeti plains in search of the migration herds. Your guide will position you for optimal viewing of river crossings and predator action. Picnic lunch in the bush.'
        },
        {
          day: 'Day 3',
          title: 'Predator Tracking & Photography',
          description: 'Dedicated day tracking predators—lions, leopards, and cheetahs—using radio collars and expert knowledge. Perfect for photography enthusiasts with golden hour game drives.'
        },
        {
          day: 'Day 4',
          title: 'Cultural Visit & Community Experience',
          description: 'Visit a local Maasai village to learn about traditional culture and conservation efforts. Afternoon game drive with sundowner cocktails at a scenic lookout point.'
        },
        {
          day: 'Day 5',
          title: 'Final Game Drive & Departure',
          description: 'Early morning game drive to capture the last of the Serengeti magic. Return to Pori Pori for a farewell breakfast before transferring to Seronera Airstrip for departure.'
        }
      ],
      bestTime: 'Year-round, with peak river crossings June-October and calving season December-March',
      groupSize: 'Private vehicle with 4-6 guests maximum',
      accommodation: 'Luxury canvas suites with en-suite bathrooms and private verandas'
    },
    {
      id: 2,
      title: 'Big Five Explorer',
      slug: 'big-five-explorer',
      duration: '7 Days / 6 Nights',
      description: 'Track the legendary Big Five across the Serengeti and Ngorongoro Crater.',
      fullDescription: `The Big Five Explorer is the ultimate safari for wildlife enthusiasts. Over seven days, you'll journey through diverse ecosystems, from the Serengeti's endless plains to the Ngorongoro Crater's unique wildlife sanctuary.

This comprehensive safari offers the best chance to see all five of Africa's most sought-after animals: lion, leopard, elephant, rhino, and buffalo. With experienced guides and exclusive access, you'll enjoy intimate wildlife encounters and spectacular photography opportunities.

Night game drives add an extra dimension, allowing you to see nocturnal wildlife and experience the Serengeti after dark. Stay in luxury camps that combine comfort with an authentic bush experience.`,
      price: 'From $4,200',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655000/image00048_dpxzim.jpg',
      images: [
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655000/image00048_dpxzim.jpg', alt: 'Elephant in Serengeti' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp', alt: 'Zebra on Serengeti plains' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp', alt: 'Serengeti landscape' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655110/lion.jpg', alt: 'Lion in the wild' }
      ],
      highlights: ['Ngorongoro Crater', 'Night Drives', 'Luxury Camps', 'Conservation'],
      includes: [
        'Accommodation in luxury tented camps',
        'All meals and premium beverages',
        'Private safari vehicle and guide',
        'Ngorongoro Crater entrance fees',
        'Night game drives',
        'Conservation and park fees'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Arrival & Serengeti Welcome',
          description: 'Fly into Serengeti and transfer to your luxury camp. Settle in with a welcome drink and evening game drive to spot nocturnal animals in the Serengeti.'
        },
        {
          day: 'Day 2',
          title: 'Big Five Safari - Part 1',
          description: 'Full day safari focusing on lion, leopard, and buffalo. Explore different habitats including riverine forests and open plains. Lunch at a scenic spot in the bush.'
        },
        {
          day: 'Day 3',
          title: 'Big Five Safari - Part 2',
          description: 'Continued search for elusive leopards and rhinos. Night game drive to experience the Serengeti\'s nocturnal wildlife and listen to the sounds of the bush.'
        },
        {
          day: 'Day 4',
          title: 'Ngorongoro Crater Expedition',
          description: 'Journey to the Ngorongoro Crater, a UNESCO World Heritage site. Descend into the crater floor for a full day exploring this unique ecosystem, home to all Big Five.'
        },
        {
          day: 'Day 5',
          title: 'Crater Exploration & Maasai Culture',
          description: 'Morning game drive in the crater. Afternoon visit to a Maasai village to learn about traditional conservation methods and cultural heritage.'
        },
        {
          day: 'Day 6',
          title: 'Return to Serengeti & Final Drives',
          description: 'Return to the Serengeti for final game drives. Last chance to see any missed Big Five species. Farewell dinner under the stars.'
        },
        {
          day: 'Day 7',
          title: 'Departure & Memories',
          description: 'Morning game drive to capture last memories. Transfer to Seronera Airstrip for departure, taking with you the experience of a lifetime.'
        }
      ],
      bestTime: 'Best for Big Five viewing June-October. Great wildlife viewing year-round.',
      groupSize: 'Private vehicle with 4-6 guests maximum',
      accommodation: 'Luxury tented camps and safari lodges'
    },
    {
      id: 3,
      title: 'Romantic Safari Escape',
      slug: 'romantic-safari-escape',
      duration: '3 Days / 2 Nights',
      description: 'An intimate safari experience crafted for couples.',
      fullDescription: `The Romantic Safari Escape is designed for couples seeking an intimate and unforgettable experience in the Serengeti. From private game drives to champagne sundowners, every moment is crafted for romance.

This three-day escape combines the thrill of wildlife viewing with luxury and privacy. Enjoy private game drives where you'll have the vehicle to yourselves, allowing for spontaneous stops and uninterrupted wildlife watching.

The highlight is a secluded bush dinner under the stars—a private dining experience with a personal chef and butler. Complete your stay with a couples spa treatment, the perfect way to unwind after days of safari adventure.`,
      price: 'From $1,950',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner.webp',
      images: [
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/bushdinner.webp', alt: 'Romantic bush dinner' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp', alt: 'Serengeti landscape' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/bushdinner1.webp', alt: 'Bush dinner experience' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/sanctuary.webp', alt: 'Luxury suite' }
      ],
      highlights: ['Private Drives', 'Bush Dinner', 'Sundowner Cocktails', 'Spa Treatment'],
      includes: [
        'Accommodation in private suite',
        'All meals and champagne',
        'Private game drives',
        'Romantic bush dinner',
        'Couples spa treatment',
        'Sundowner cocktails'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Arrival & Romantic Welcome',
          description: 'Arrive at Seronera Airstrip and transfer to your private suite. Enjoy champagne and a gourmet lunch followed by an exclusive private afternoon game drive, ending with sundowner cocktails at a scenic lookout point.'
        },
        {
          day: 'Day 2',
          title: 'Private Safari & Bush Dinner',
          description: 'Full day of private game drives. Your guide will tailor the experience to your wildlife interests. Return to the camp for a romantic bush dinner—a private dining experience under the stars with a personal chef and butler.'
        },
        {
          day: 'Day 3',
          title: 'Couples Spa & Departure',
          description: 'Enjoy a morning couples spa treatment at the camp. After a relaxed breakfast, take one last private game drive before transferring to Seronera Airstrip for departure.'
        }
      ],
      bestTime: 'Year-round, with cool dry season June-October offering excellent wildlife viewing.',
      groupSize: 'Private vehicle for just the two of you',
      accommodation: 'Private luxury suite with canopy bed and outdoor shower'
    },
    {
      id: 4,
      title: 'Family Safari Adventure',
      slug: 'family-safari-adventure',
      duration: '6 Days / 5 Nights',
      description: 'A family-friendly safari experience with activities for all ages.',
      fullDescription: `The Family Safari Adventure is designed to delight travelers of all ages. With child-friendly game drives, nature walks, and cultural visits, this safari offers something for every member of the family.

Children will love the educational wildlife programs and activities designed specifically for them. From spotting animals to learning about conservation, kids become junior rangers during this adventure.

Safe, comfortable, and engaging, this safari ensures that families can experience the magic of the Serengeti together, creating memories that will last a lifetime.`,
      price: 'From $3,600',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp',
      images: [
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/outdoor1.webp', alt: 'Outdoor safari experience' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp', alt: 'Zebra on Serengeti plains' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655000/image00048_dpxzim.jpg', alt: 'Elephant in Serengeti' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp', alt: 'Luxury suite' }
      ],
      highlights: ['Family Activities', 'Nature Walks', 'Cultural Visits', 'Educational'],
      includes: [
        'Family suite accommodation',
        'All meals and kids\' menu',
        'Private safari vehicle',
        'Child-friendly game drives',
        'Nature walks and cultural visits',
        'Children\'s activities program'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Arrival & Family Welcome',
          description: 'Arrive at Serengeti and transfer to your family suite. Meet your guide and enjoy a welcome dinner with a special menu for the kids.'
        },
        {
          day: 'Day 2',
          title: 'Junior Ranger Safari',
          description: 'Full day adventure with children\'s activities. Kids earn their Junior Ranger badge while learning about animals and conservation. Adults enjoy game drives with dedicated time for the children.'
        },
        {
          day: 'Day 3',
          title: 'Nature Walk & Wildlife Education',
          description: 'Morning guided nature walk (safe for children). Afternoon game drive with educational stops to learn about animal tracks, bird calls, and the ecosystem.'
        },
        {
          day: 'Day 4',
          title: 'Cultural Visit & Community Day',
          description: 'Visit a Maasai village where children can interact with local kids. Learn about Maasai culture, traditional games, and dance. Return for a family sundowner dinner.'
        },
        {
          day: 'Day 5',
          title: 'Adventure Safari & Celebration',
          description: 'Final full day of safari adventure. Celebrate the journey with a special family dinner and certificate ceremony for the Junior Rangers.'
        },
        {
          day: 'Day 6',
          title: 'Departure with Memories',
          description: 'Morning game drive or relax at camp. Transfer to Seronera Airstrip for departure, taking home memories and new wildlife knowledge.'
        }
      ],
      bestTime: 'Year-round, school holiday periods are popular. July-October offers excellent wildlife viewing.',
      groupSize: 'Private vehicle accommodating families of 4-6',
      accommodation: 'Family suites with interconnected rooms'
    },
    {
      id: 5,
      title: 'Photography Safari',
      slug: 'photography-safari',
      duration: '8 Days / 7 Nights',
      description: 'Designed for photography enthusiasts with expert guidance from professional wildlife photographers.',
      fullDescription: `The Photography Safari is a dream come true for photographers of all levels. Led by professional wildlife photographers, this safari offers unparalleled access to the Serengeti's most photogenic locations and moments.

Learn the art of wildlife photography with expert guidance on camera settings, composition, and storytelling. Our special vehicles are equipped with camera mounts and beanbags for stable, low-angle shots.

From dramatic golden hour lighting to intimate animal portraits, this safari is designed to help you create a portfolio of stunning images that capture the wild beauty of the Serengeti.`,
      price: 'From $5,200',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826167/birds.webp',
      images: [
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826167/birds.webp', alt: 'Colorful birds' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp', alt: 'Zebra on Serengeti plains' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655000/image00048_dpxzim.jpg', alt: 'Elephant in Serengeti' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1782655110/lion.jpg', alt: 'Lion in the wild' }
      ],
      highlights: ['Expert Photographer', 'Prime Locations', 'Golden Hour Drives', 'Private Vehicle'],
      includes: [
        'Photography expert guide',
        'Private safari vehicle with camera mounts',
        'All meals and beverages',
        'Exclusive photography locations',
        'Post-processing workshop',
        'Portfolio review'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Arrival & Photography Orientation',
          description: 'Arrive and settle in. Evening photography orientation with your expert guide covering camera settings, compositions, and planning for the week ahead.'
        },
        {
          day: 'Day 2',
          title: 'Golden Hour Landscape Photography',
          description: 'Morning and evening game drives focusing on landscape and golden hour photography. Capture the Serengeti\'s dramatic light and vast horizons.'
        },
        {
          day: 'Day 3',
          title: 'Wildlife Portraits & Action Shots',
          description: 'Dedicated day for wildlife photography. Focus on animal portraits and action shots. Learn techniques for capturing movement and animal behavior.'
        },
        {
          day: 'Day 4',
          title: 'Bird Photography & Macro Details',
          description: 'Explore bird photography with a focus on colorful species and macro details. Morning and evening drives with specific attention to birdlife and small creatures.'
        },
        {
          day: 'Day 5',
          title: 'Predator Photography - Special Access',
          description: 'Special access to predator viewing locations. Learn techniques for photographing lions, leopards, and cheetahs in their natural environment.'
        },
        {
          day: 'Day 6',
          title: 'Post-Processing Workshop',
          description: 'Morning game drive followed by an afternoon post-processing workshop. Learn editing techniques to enhance your safari photographs.'
        },
        {
          day: 'Day 7',
          title: 'Portfolio Review & Final Shoots',
          description: 'Portfolio review session with your photography guide. Final golden hour game drive to capture any missed shots or perfect favorites.'
        },
        {
          day: 'Day 8',
          title: 'Departure & Inspiration',
          description: 'Breakfast and departure. Take home a memory card full of stunning images and inspiration for your photography journey.'
        }
      ],
      bestTime: 'Ideal during dry season June-October for clear light and concentration of wildlife.',
      groupSize: 'Small group of 4-6 photographers maximum',
      accommodation: 'Luxury canvas suites with viewing decks'
    },
    {
      id: 6,
      title: 'Luxury Fly-In Safari',
      slug: 'luxury-fly-in-safari',
      duration: '4 Days / 3 Nights',
      description: 'Arrive in style with a scenic flight over the Serengeti.',
      fullDescription: `The Luxury Fly-In Safari offers the ultimate in style and convenience. Skip the long road journey and arrive in the Serengeti via a scenic flight that provides breathtaking views of the landscape below.

From the moment you land, you'll enjoy VIP treatment with exclusive access to premium viewing locations and personalized service. This safari is designed for those who want the best of everything—luxury accommodation, gourmet dining, and world-class wildlife viewing.

With a dedicated guide and private vehicle, your safari is tailored to your preferences, ensuring a truly bespoke experience in one of the world's most spectacular wilderness areas.`,
      price: 'From $3,950',
      image: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786825395/balloon.webp',
      images: [
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786825395/balloon.webp', alt: 'Hot air balloon safari' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp', alt: 'Serengeti landscape' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/sanctuary.webp', alt: 'Luxury sanctuary' },
        { src: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/bushdinner1.webp', alt: 'Bush dinner experience' }
      ],
      highlights: ['Scenic Flights', 'Exclusive Access', 'Personalized Service', 'Luxury Accommodation'],
      includes: [
        'Scenic flight to Serengeti',
        'Luxury accommodation',
        'All meals and premium beverages',
        'Private game drives',
        'Personalized service',
        'Exclusive access to premium locations'
      ],
      itinerary: [
        {
          day: 'Day 1',
          title: 'Scenic Flight & Arrival',
          description: 'Depart from Arusha or Kilimanjaro on a scenic flight over the Great Rift Valley. Enjoy breathtaking aerial views of the Serengeti as you descend. VIP transfer to your luxury suite.'
        },
        {
          day: 'Day 2',
          title: 'Exclusive Safari Experience',
          description: 'Full day of exclusive game drives in a private vehicle. Your guide will tailor the experience to your preferences, accessing premium viewing locations away from the crowds.'
        },
        {
          day: 'Day 3',
          title: 'Personalized Luxury Activities',
          description: 'Choose from a range of exclusive activities—private bush breakfast, champagne sundowner, spa treatment, or cultural visits. Every moment is customized to your desires.'
        },
        {
          day: 'Day 4',
          title: 'Final Adventures & Departure',
          description: 'Morning game drive or relaxation at camp. Transfer to the airstrip for your return flight, with a final glimpse of the Serengeti from the air.'
        }
      ],
      bestTime: 'Year-round, with the dry season June-October offering excellent wildlife viewing.',
      groupSize: 'Private experience for couples or small groups',
      accommodation: 'Luxury canvas suites with private plunge pools'
    }
  ]

  // Find the matching package
  useEffect(() => {
    if (slug) {
      const pkg = safariPackages.find(p => p.slug === slug)
      setSelectedPackage(pkg || null)
    }
  }, [slug])

  // ============================================================
  // LIGHTBOX FUNCTIONS
  // ============================================================
  const openLightbox = (src: string, alt: string) => {
    setLightboxImage(src)
    setLightboxTitle(alt)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
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

  // Loading state
  if (!selectedPackage) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-taupe font-light">Loading safari details...</p>
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
          <li><a href="/#about" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">About</a></li>
          <li><a href="/#safari" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Safaris</a></li>
          <li><a href="/#experiences" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Experiences</a></li>
          <li><Link href="/cuisines" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Cuisine</Link></li>
          <li><Link href="/rooms" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Stay</Link></li>
          <li><Link href="/gallery" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Gallery</Link></li>
          <li><a href="/#blog" className="text-[0.68rem] tracking-[3px] uppercase text-white/90 hover:text-gold-light transition-colors duration-300">Blog</a></li>
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
      <div className={`fixed top-0 right-0 w-4/5 max-w-xs h-screen bg-dark z-50 transition-all duration-400 ease-in-out shadow-xl ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button 
          className="absolute top-4 right-4 text-white text-xl cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close mobile menu"
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col items-center justify-center h-full gap-6">
          <a href="/#about" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="/#safari" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Safaris</a>
          <a href="/#experiences" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Experiences</a>
          <Link href="/cuisines" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Cuisine</Link>
          <Link href="/rooms" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Stay</Link>
          <Link href="/gallery" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <a href="/#blog" className="text-white text-lg tracking-[4px] font-serif hover:opacity-70 transition-opacity" onClick={() => setMobileMenuOpen(false)}>Blog</a>
          <button 
            onClick={() => { setMobileMenuOpen(false); setModalOpen(true); }}
            className="mt-4 bg-transparent border border-gold text-gold px-6 py-2 text-[0.65rem] tracking-[3px] uppercase cursor-pointer transition-all duration-300 hover:bg-gold hover:text-white font-sans"
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
                  {selectedPackage.fullDescription}
                </p>
              </div>

              {/* Itinerary */}
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

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl p-6 border border-[rgba(196,165,110,0.15)] sticky top-6">
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
                  
                  <div>
                    <p className="text-[0.55rem] tracking-[2px] uppercase text-gold font-medium mb-1">
                      Best Time
                    </p>
                    <p className="text-taupe text-sm font-light">{selectedPackage.bestTime}</p>
                  </div>
                  
                  <div>
                    <p className="text-[0.55rem] tracking-[2px] uppercase text-gold font-medium mb-1">
                      Group Size
                    </p>
                    <p className="text-taupe text-sm font-light">{selectedPackage.groupSize}</p>
                  </div>
                  
                  <div>
                    <p className="text-[0.55rem] tracking-[2px] uppercase text-gold font-medium mb-1">
                      Accommodation
                    </p>
                    <p className="text-taupe text-sm font-light">{selectedPackage.accommodation}</p>
                  </div>
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
      BOOKING MODAL
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