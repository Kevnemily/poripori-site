import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'
import Script from 'next/script'

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

// ============================================================
// ENHANCED SEO METADATA
// ============================================================
export const metadata: Metadata = {
  metadataBase: new URL('https://poriporiluxurylodgeandcamp.com'),
  
  title: {
    default: 'Pori Pori | Ultra-Luxury Serengeti Safari Lodge & Migration Camp',
    template: '%s | Pori Pori Serengeti'
  },
  
  description: 'Experience the magic of the Serengeti at Pori Pori — an ultra-luxury safari sanctuary with canvas suites, private butler service, and front-row seats to the Great Migration in Tanzania. Book your dream safari today.',
  
  keywords: 'Serengeti luxury lodge, Tanzania safari camp, Great Migration safari, luxury canvas suites, Pori Pori Serengeti, Serengeti accommodation, luxury safari Tanzania, migration camp Tanzania, Serengeti National Park, Ngorongoro Crater safari, East Africa safari, safari honeymoon, family safari Serengeti, luxury safari packages, Serengeti wildlife, Tanzania travel',
  
  authors: [{ 
    name: 'Pori Pori Serengeti',
    url: 'https://poriporiluxurylodgeandcamp.com/',
  }],
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
  
  // Enhanced Open Graph - using only valid properties
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://poriporiluxurylodgeandcamp.com/',
    siteName: 'Pori Pori Serengeti - Ultra-Luxury Safari Lodge',
    title: 'Pori Pori | Ultra-Luxury Serengeti Safari Lodge & Migration Camp',
    description: 'Experience the magic of the Serengeti at Pori Pori — an ultra-luxury safari sanctuary where golden light meets untamed wilderness. Book your dream safari today.',
    images: [
      {
        url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Pori Pori Serengeti Luxury Safari Lodge - Great Migration Camp',
      },
    ],
  },
  
  // Enhanced Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'Pori Pori | Ultra-Luxury Serengeti Safari Lodge & Migration Camp',
    description: 'Experience the magic of the Serengeti at Pori Pori — an ultra-luxury safari sanctuary where golden light meets untamed wilderness.',
    images: ['https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp'],
    site: '@poripori',
    creator: '@poripori',
  },
  
  alternates: {
    canonical: 'https://poriporiluxurylodgeandcamp.com/',
    languages: {
      'en-US': 'https://poriporiluxurylodgeandcamp.com/',
    },
  },
  
  category: 'Luxury Safari Lodge',
  classification: 'Travel & Tourism',
  
  // Verification for search consoles
  verification: {
    google: 'your-google-verification-code',
  },
  
  // Additional SEO
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Google Analytics ID
  const GA_ID = 'G-WYXCMBL6PZ'
  
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        {/* ============================================================
        FAVICON - Sharp with Cloudinary
        ============================================================ */}
        <link 
          rel="icon" 
          type="image/png" 
          sizes="32x32" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_32,c_fill/v1786809435/logo.webp" 
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="16x16" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_16,c_fill/v1786809435/logo.webp" 
        />
        <link 
          rel="apple-touch-icon" 
          sizes="180x180" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_180,c_fill/v1786809435/logo.webp" 
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="192x192" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_192,c_fill/v1786809435/logo.webp" 
        />
        <link 
          rel="icon" 
          type="image/png" 
          sizes="512x512" 
          href="https://res.cloudinary.com/dp7piqlbe/image/upload/f_auto,q_auto,w_512,c_fill/v1786809435/logo.webp" 
        />
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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* ============================================================
        FONTS & ICONS
        ============================================================ */}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        
        {/* ============================================================
        GEO AND LANGUAGE META TAGS (Country & Region)
        ============================================================ */}
        <meta name="geo.region" content="TZ" />
        <meta name="geo.placename" content="Serengeti" />
        <meta name="geo.position" content="-2.3333;34.8333" />
        <meta name="ICBM" content="-2.3333, 34.8333" />
        <meta httpEquiv="Content-Language" content="en-US" />
        
        {/* ============================================================
        THEME COLOR FOR MOBILE
        ============================================================ */}
        <meta name="theme-color" content="#1A1510" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        
        {/* ============================================================
        ADDITIONAL SEO META TAGS
        ============================================================ */}
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="7 days" />
        
        {/* ============================================================
        GOOGLE SITE VERIFICATION
        ============================================================ */}
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="msvalidate.01" content="your-bing-verification-code" />
        
        {/* ============================================================
        GOOGLE ANALYTICS - GA4
        ============================================================ */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true
            });
          `}
        </Script>
        
        {/* ============================================================
        GOOGLE ADS CONVERSION TRACKING (Optional)
        ============================================================ */}
        <Script id="google-ads-conversion" strategy="afterInteractive">
          {`
            gtag('config', 'AW-CONVERSION_ID');
          `}
        </Script>
        
        {/* ============================================================
        SCHEMA.ORG - ORGANIZATION STRUCTURED DATA
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
              "logo": "https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp",
              "url": "https://poriporiluxurylodgeandcamp.com/",
              "telephone": "+255754430599",
              "email": "reservations@poripori.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Serengeti",
                "addressRegion": "Mara",
                "addressCountry": "Tanzania"
              },
              "starRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5"
              },
              "priceRange": "$$$$",
              "amenities": [
                "Private Butler Service",
                "Solar Powered",
                "Private Bathroom",
                "Free Wi-Fi",
                "Game Drives",
                "Balloon Safaris",
                "Bush Dinners",
                "Sundowner Cocktails",
                "Safari Vehicle",
                "Expert Guides"
              ],
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "-2.3333",
                "longitude": "34.8333"
              },
              "numberOfRooms": "8",
              "petsAllowed": "false",
              "smokingAllowed": "false",
              "checkinTime": "12:00",
              "checkoutTime": "10:00"
            })
          }}
        />
        
        {/* ============================================================
        SCHEMA.ORG - WEBSITE STRUCTURED DATA
        ============================================================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Pori Pori Serengeti",
              "url": "https://poriporiluxurylodgeandcamp.com/",
              "description": "Ultra-luxury safari sanctuary in the heart of the Serengeti, Tanzania.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://poriporiluxurylodgeandcamp.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
        
        {/* ============================================================
        SCHEMA.ORG - BREADCRUMB (Homepage base)
        ============================================================ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://poriporiluxurylodgeandcamp.com/"
                }
              ]
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