// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://poriporiluxurylodgeandcamp.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',           // API routes - no need to index
        '/_next/',         // Next.js internal files
        '/admin/',         // Admin panel (if you have one)
        '/confirm/',       // Confirmation pages
        '/booking/',       // Booking pages (if separate)
        '/thank-you/',     // Thank you pages
        '/privacy/',       // Privacy policy (optional, you can keep)
        '/terms/',         // Terms of service (optional, you can keep)
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    // Optional: Add multiple robots rules for different user agents
    // rules: [
    //   {
    //     userAgent: '*',
    //     allow: '/',
    //     disallow: ['/api/', '/_next/', '/admin/'],
    //   },
    //   {
    //     userAgent: 'Googlebot',
    //     allow: '/',
    //     disallow: ['/api/'],
    //   },
    //   {
    //     userAgent: 'Bingbot',
    //     allow: '/',
    //     disallow: ['/api/', '/admin/'],
    //   },
    // ],
  }
}