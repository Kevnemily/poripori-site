// app/safaris/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import SafariClient from './SafariClient'

// ============================================================
// FETCH SAFARI DATA DIRECTLY (NO CLIENT HOOKS)
// ============================================================
async function getSafari(slug: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/safari_packages?slug=eq.${slug}&select=*`,
      {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        next: { revalidate: 3600 },
      }
    )
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    return data?.[0] || null
  } catch (error) {
    console.error('Error fetching safari:', error)
    return null
  }
}

async function getAllSafariSlugs() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/safari_packages?select=slug`,
      {
        headers: {
          'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
        },
        next: { revalidate: 3600 },
      }
    )
    
    if (!response.ok) {
      return []
    }
    
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching safari slugs:', error)
    return []
  }
}

// ============================================================
// GENERATE DYNAMIC METADATA FROM SUPABASE DATA
// ============================================================
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> | { slug: string }
}): Promise<Metadata> {
  // ✅ FIX: Await params (Next.js 15+)
  const resolvedParams = await params
  const slug = resolvedParams.slug
  
  // Fetch the safari package directly (no client hook)
  const safari = await getSafari(slug)
  
  // If safari not found, return default metadata
  if (!safari) {
    return {
      title: 'Safari Package Not Found | Pori Pori Serengeti',
      description: 'The safari package you are looking for does not exist.',
    }
  }

  // Clean description for meta tags
  const cleanDescription = safari.description?.replace(/<[^>]*>/g, '').substring(0, 160) || `Experience ${safari.title} in the Serengeti with Pori Pori.`

  return {
    title: `${safari.title} | Pori Pori Serengeti Safari`,
    
    description: cleanDescription,
    
    keywords: `${safari.title}, Serengeti safari, ${safari.duration}, Tanzania safari, ${safari.highlights?.join(', ') || ''}, Great Migration safari, Ngorongoro Crater, luxury safari Tanzania, safari packages`,
    
    openGraph: {
      title: `${safari.title} | Pori Pori Serengeti`,
      description: cleanDescription,
      url: `https://poriporiluxurylodgeandcamp.com/safaris/${slug}`,
      siteName: 'Pori Pori Serengeti - Safari Packages',
      images: [
        {
          url: safari.image || 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp',
          width: 1200,
          height: 630,
          alt: safari.title,
        },
      ],
      type: 'website',
      locale: 'en_US',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${safari.title} | Pori Pori Serengeti`,
      description: cleanDescription,
      images: [safari.image || 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826166/zebra.webp'],
      site: '@poripori',
      creator: '@poripori',
    },
    
    alternates: {
      canonical: `https://poriporiluxurylodgeandcamp.com/safaris/${slug}`,
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
    
    other: {
      'article:published_time': safari.created_at || new Date().toISOString(),
      'article:modified_time': safari.updated_at || new Date().toISOString(),
      'article:section': 'Safari Packages',
    },
  }
}

// ============================================================
// GENERATE STATIC PATHS FOR BUILD TIME
// ============================================================
export async function generateStaticParams() {
  const safaris = await getAllSafariSlugs()
  
  return safaris.map((safari: { slug: string }) => ({
    slug: safari.slug,
  }))
}

// ============================================================
// PAGE COMPONENT
// ============================================================
export default function Page() {
  return <SafariClient />
}