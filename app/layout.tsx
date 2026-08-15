import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const cormorant = Cormorant_Garamond({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Pori Pori | Ultra-Luxury Serengeti Safari Lodge & Migration Camp',
  description: 'Experience the magic of the Serengeti at Pori Pori — an ultra-luxury safari sanctuary with canvas suites, private butler service, and front-row seats to the Great Migration in Tanzania.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css" />
        <link rel="icon" type="image/png" sizes="32x32" href="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" />
        <link rel="apple-touch-icon" sizes="180x180" href="https://res.cloudinary.com/dp7piqlbe/image/upload/v1786809435/logo.webp" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Footer />
      </body>
    </html>
  )
}