// app/cuisines/page.tsx
import { Metadata } from 'next'
import CuisinesClient from './CuisinesClient'

export const metadata: Metadata = {
  title: 'Gourmet Safari Dining | Pori Pori Cuisine - Bush Breakfasts & Starlit Dinners',
  description: 'Experience gourmet safari dining at Pori Pori Serengeti. From bush breakfasts overlooking the plains to starlit dinners under the African sky.',
  keywords: 'Safari dining, Tanzanian cuisine, bush dinner, gourmet safari food, Pori Pori cuisine',
  openGraph: {
    title: 'Gourmet Safari Dining | Pori Pori Cuisine - Bush Breakfasts & Starlit Dinners',
    description: 'A culinary journey through East Africa at Pori Pori. Bush breakfasts, sundowner cocktails, and starlit dinners.',
    url: 'https://poriporiluxurylodgeandcamp.com/cuisines',
    siteName: 'Pori Pori Serengeti - Gourmet Safari Dining',
    images: [{
      url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/food11.webp',
      width: 1200,
      height: 630,
      alt: 'Pori Pori Serengeti Cuisine - Gourmet Safari Dining',
    }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gourmet Safari Dining | Pori Pori Cuisine',
    description: 'A culinary journey through East Africa. Bush breakfasts, sundowner cocktails, and starlit dinners.',
    images: ['https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/food11.webp'],
    site: '@poripori',
    creator: '@poripori',
  },
  alternates: {
    canonical: 'https://poriporiluxurylodgeandcamp.com/cuisines',
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
  return <CuisinesClient />
}