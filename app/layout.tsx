import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://poriporiluxurylodgeandcamp.com'),
  title: {
    default: 'Pori Pori | Ultra-Luxury Serengeti Safari Lodge & Migration Camp',
    template: '%s | Pori Pori Serengeti'
  },
  description: 'Experience the magic of the Serengeti at Pori Pori — an ultra-luxury safari sanctuary with canvas suites, private butler service, and front-row seats to the Great Migration in Tanzania.',
  keywords: 'Serengeti luxury lodge, Tanzania safari camp, Great Migration safari, luxury canvas suites, Pori Pori Serengeti, Serengeti accommodation, luxury safari Tanzania, migration camp Tanzania',
  authors: [{ name: 'Pori Pori Serengeti' }],
  creator: 'Pori Pori Serengeti',
  publisher: 'Pori Pori Serengeti',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://poriporiluxurylodgeandcamp.com/',
    siteName: 'Pori Pori Serengeti',
    title: 'Pori Pori | Ultra-Luxury Serengeti Safari Lodge & Migration Camp',
    description: 'Experience the magic of the Serengeti at Pori Pori — an ultra-luxury safari sanctuary where golden light meets untamed wilderness.',
    images: [
      {
        url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Pori Pori Serengeti Luxury Safari Lodge',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pori Pori | Ultra-Luxury Serengeti Safari Lodge & Migration Camp',
    description: 'Experience the magic of the Serengeti at Pori Pori — an ultra-luxury safari sanctuary where golden light meets untamed wilderness.',
    images: ['https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp'],
  },
  alternates: {
    canonical: 'https://poriporiluxurylodgeandcamp.com/',
  },
  category: 'Luxury Safari Lodge',
  classification: 'Travel & Tourism',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* ============================================================
        FAVICON - Sharp with Cloudinary
        ============================================================ */}
        {/* Standard favicon - 32x32 */}
        <link 
          rel="icon" 
          type="image/png" 
          sizes="32x32" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_32,c_fill/v1786809435/logo.webp" 
        />
        {/* Small favicon - 16x16 */}
        <link 
          rel="icon" 
          type="image/png" 
          sizes="16x16" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_16,c_fill/v1786809435/logo.webp" 
        />
        {/* Apple Touch Icon - 180x180 */}
        <link 
          rel="apple-touch-icon" 
          sizes="180x180" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_180,c_fill/v1786809435/logo.webp" 
        />
        {/* Android Chrome - 192x192 */}
        <link 
          rel="icon" 
          type="image/png" 
          sizes="192x192" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_192,c_fill/v1786809435/logo.webp" 
        />
        {/* Android Chrome - 512x512 */}
        <link 
          rel="icon" 
          type="image/png" 
          sizes="512x512" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_512,c_fill/v1786809435/logo.webp" 
        />
        {/* Fallback ICO */}
        <link 
          rel="shortcut icon" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_64/v1786809435/logo.webp" 
        />
        
        {/* ============================================================
        PRELOAD CRITICAL IMAGES
        ============================================================ */}
        <link 
          rel="preload" 
          as="image" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp" 
          fetchPriority="high"
        />
        <link 
          rel="preload" 
          as="image" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" 
          fetchPriority="high"
        />
        
        {/* ============================================================
        PRECONNECT FOR PERFORMANCE
        ============================================================ */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        
        {/* ============================================================
        FONTS & ICONS
        ============================================================ */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        
        {/* ============================================================
        SCHEMA.ORG STRUCTURED DATA
        ============================================================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LodgingBusiness",
              "name": "Pori Pori Serengeti",
              "description": "Ultra-luxury safari sanctuary in the heart of the Serengeti, Tanzania. Featuring canvas suites, private butler service, and front-row seats to the Great Migration.",
              "image": "https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp",
              "url": "https://poriporiluxurylodgeandcamp.com/",
              "telephone": "+255754430599",
              "email": "reservations@poripori.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Serengeti",
                "addressCountry": "Tanzania"
              },
              "starRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "priceRange": "$$$",
              "amenities": [
                "Private Butler Service",
                "Solar Powered",
                "Private Bathroom",
                "Free Wi-Fi",
                "Game Drives",
                "Balloon Safaris",
                "Bush Dinners",
                "Sundowner Cocktails"
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-2.3333",
                "longitude": "34.8333"
              }
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}