// app/page.tsx
import { Metadata } from 'next'
import HomeClient from './HomeClient'

export const metadata: Metadata = {
  title: 'Luxury Serengeti Safari Lodge | Pori Pori Tanzania - Great Migration Camp',
  description: 'Experience the ultimate Serengeti safari at Pori Pori Lodges & Camps. Witness the Great Migration from luxury canvas suites with private butler service. Book your dream African safari adventure in Tanzania today.',
  keywords: 'Serengeti luxury lodge, Tanzania safari camp, Great Migration safari, Pori Pori Serengeti, luxury canvas suites, Serengeti accommodation, luxury safari Tanzania, migration camp Tanzania, Serengeti National Park, Ngorongoro Crater safari, East Africa safari, safari honeymoon Tanzania, family safari Serengeti, luxury safari packages, Serengeti wildlife, Tanzania travel, safari lodge Serengeti, ultra-luxury safari, private safari Tanzania, African safari lodge',
  openGraph: {
    title: 'Pori Pori Serengeti - Ultra-Luxury Safari Lodge & Migration Camp',
    description: 'Experience the ultimate Serengeti safari at Pori Pori. Witness the Great Migration from luxury canvas suites with private butler service. Book your dream African safari today.',
    url: 'https://poriporiluxurylodgeandcamp.com/',
    siteName: 'Pori Pori Serengeti - Ultra-Luxury Safari Lodge',
    images: [
      {
        url: 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp',
        width: 1200,
        height: 630,
        alt: 'Pori Pori Serengeti - Luxury Safari Lodge in Tanzania',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pori Pori Serengeti - Ultra-Luxury Safari Lodge & Migration Camp',
    description: 'Experience the ultimate Serengeti safari at Pori Pori. Witness the Great Migration from luxury canvas suites.',
    images: ['https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/hero.webp'],
    site: '@poripori',
    creator: '@poripori',
  },
  alternates: {
    canonical: 'https://poriporiluxurylodgeandcamp.com/',
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
  return <HomeClient />
}