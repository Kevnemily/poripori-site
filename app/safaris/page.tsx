// app/safaris/page.tsx
import { Metadata } from 'next'
import SafarisClient from './SafarisClient'

export const metadata: Metadata = {
  metadataBase: new URL('https://poriporiluxurylodgeandcamp.com'),
  
  title: 'Serengeti Safari Packages | Pori Pori Tanzania - Great Migration Tours',
  
  description: 'Explore our curated Serengeti safari packages at Pori Pori. From Great Migration river crossings to luxury game drives, find your perfect Tanzanian safari adventure. Private guides, expert naturalists, and exclusive accommodations.',
  
  keywords: 'Serengeti safari packages, Tanzania safari tours, Great Migration safari, Pori Pori safaris, Serengeti National Park tours, Ngorongoro Crater safari, luxury safari Tanzania, safari honeymoon packages, family safari Serengeti, wildlife safari Tanzania, African safari tours, East Africa safari, Serengeti migration tours, private safari Tanzania, safari packages Serengeti',
  
  openGraph: {
    title: 'Serengeti Safari Packages | Pori Pori Tanzania',
    description: 'Curated Serengeti safari packages at Pori Pori. Witness the Great Migration, explore the Serengeti plains, and experience luxury African safaris.',
    url: 'https://poriporiluxurylodgeandcamp.com/safaris',
    siteName: 'Pori Pori Serengeti - Safari Packages',
    images: [
      {
        url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp',
        width: 1200,
        height: 630,
        alt: 'Pori Pori Serengeti Safari Packages - Great Migration Tours',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Serengeti Safari Packages | Pori Pori Tanzania',
    description: 'Discover handcrafted Serengeti safari experiences at Pori Pori. Private guides, expert naturalists, and luxury accommodations.',
    images: ['https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp'],
    site: '@poripori',
    creator: '@poripori',
  },
  
  alternates: {
    canonical: 'https://poriporiluxurylodgeandcamp.com/safaris',
  },
  
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
  
  category: 'Safari Packages',
  classification: 'Travel & Tourism',
}

export default function Page() {
  return <SafarisClient />
}