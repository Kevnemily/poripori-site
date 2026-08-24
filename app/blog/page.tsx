// app/blog/page.tsx
import { Metadata } from 'next'
import BlogClient from './BlogClient'

export const metadata: Metadata = {
  title: 'Serengeti Safari Blog | Pori Pori Travel Guide & Tips',
  description: 'Read our Serengeti safari blog for expert travel tips, wildlife guides, accommodation advice, and stories from Pori Pori Lodges & Camps.',
  keywords: 'Serengeti blog, safari travel guide, Tanzania travel tips, wildlife photography, Pori Pori blog',
  openGraph: {
    title: 'Serengeti Safari Blog | Pori Pori Travel Guide',
    description: 'Expert travel tips, wildlife guides, and stories from the heart of the Serengeti.',
    url: 'https://poriporiluxurylodgeandcamp.com/blog',
    siteName: 'Pori Pori Serengeti - Blog',
    images: [{
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826167/birds.webp',
      width: 1200,
      height: 630,
      alt: 'Pori Pori Serengeti Blog - Safari Travel Guide',
    }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Serengeti Safari Blog | Pori Pori Travel Guide',
    description: 'Expert travel tips, wildlife guides, and stories from the heart of the Serengeti.',
    images: ['https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826167/birds.webp'],
    site: '@poripori',
    creator: '@poripori',
  },
  alternates: {
    canonical: 'https://poriporiluxurylodgeandcamp.com/blog',
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
  return <BlogClient />
}