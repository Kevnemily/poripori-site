// app/rooms/page.tsx
import { Metadata } from 'next'
import RoomsClient from './RoomsClient'

export const metadata: Metadata = {
  title: 'Luxury Canvas Suites | Serengeti Safari Accommodation | Pori Pori',
  description: 'Experience luxury safari accommodation in Serengeti at Pori Pori. Our exclusive canvas suites offer comfort, privacy, and stunning views of the Great Migration.',
  keywords: 'Serengeti accommodation, luxury safari suites, canvas suites Serengeti, Pori Pori rooms',
  openGraph: {
    title: 'Luxury Canvas Suites | Pori Pori Serengeti Accommodation',
    description: 'Discover luxury canvas suites at Pori Pori with panoramic views of the Serengeti plains and front-row seats to the Great Migration.',
    url: 'https://poriporiluxurylodgeandcamp.com/rooms',
    siteName: 'Pori Pori Serengeti - Luxury Safari Accommodation',
    images: [{
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp',
      width: 1200,
      height: 630,
      alt: 'Pori Pori Luxury Canvas Suites - Serengeti Safari Accommodation',
    }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Canvas Suites | Pori Pori Serengeti',
    description: 'Discover luxury canvas suites at Pori Pori with panoramic views of the Serengeti plains.',
    images: ['https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/double.webp'],
    site: '@poripori',
    creator: '@poripori',
  },
  alternates: {
    canonical: 'https://poriporiluxurylodgeandcamp.com/rooms',
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
}

export default function Page() {
  return <RoomsClient />
}