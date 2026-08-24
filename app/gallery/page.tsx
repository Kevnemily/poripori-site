// app/gallery/page.tsx
import { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Serengeti Safari Gallery | Pori Pori Photos & Wildlife Photography',
  description: 'Browse our Serengeti safari gallery featuring stunning wildlife photography, luxury accommodation, and unforgettable moments from Pori Pori.',
  keywords: 'Serengeti photos, safari gallery, Tanzania wildlife photography, Pori Pori images',
  openGraph: {
    title: 'Serengeti Safari Gallery | Pori Pori Photos & Wildlife Photography',
    description: 'Stunning photos from Pori Pori Serengeti - wildlife, landscapes, luxury accommodation, and unforgettable safari moments.',
    url: 'https://poriporiluxurylodgeandcamp.com/gallery',
    siteName: 'Pori Pori Serengeti - Photo Gallery',
    images: [{
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp',
      width: 1200,
      height: 630,
      alt: 'Pori Pori Serengeti Gallery - Wildlife Photography',
    }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serengeti Safari Gallery | Pori Pori Photos',
    description: 'Stunning wildlife photography, luxury accommodation, and safari moments from Pori Pori Serengeti.',
    images: ['https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp'],
    site: '@poripori',
    creator: '@poripori',
  },
  alternates: {
    canonical: 'https://poriporiluxurylodgeandcamp.com/gallery',
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
  return <GalleryClient />
}