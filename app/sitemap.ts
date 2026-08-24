// app/sitemap.ts
import { MetadataRoute } from 'next'

// ============================================================
// FETCH ALL DYNAMIC DATA FROM SUPABASE
// ============================================================
async function fetchSafaris() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/safari_packages?select=slug,updated_at`,
    {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  )
  
  if (!response.ok) {
    console.error('Failed to fetch safaris for sitemap:', response.statusText)
    return []
  }
  
  const data = await response.json()
  return data
}

async function fetchBlogPosts() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=id,updated_at`,
    {
      headers: {
        'apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}`,
      },
      next: { revalidate: 3600 }, // Revalidate every hour
    }
  )
  
  if (!response.ok) {
    console.error('Failed to fetch blog posts for sitemap:', response.statusText)
    return []
  }
  
  const data = await response.json()
  return data
}

// ============================================================
// GENERATE SITEMAP
// ============================================================
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://poriporiluxurylodgeandcamp.com'
  
  // Get current date for lastModified
  const currentDate = new Date().toISOString()
  
  // ============================================================
  // STATIC ROUTES - Always included
  // ============================================================
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/safaris`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/rooms`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/cuisines`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  // ============================================================
  // DYNAMIC SAFARI ROUTES - Fetch from Supabase
  // ============================================================
  const safariData = await fetchSafaris()
  
  const safariRoutes: MetadataRoute.Sitemap = safariData.map((safari: { slug: string; updated_at: string }) => ({
    url: `${baseUrl}/safaris/${safari.slug}`,
    lastModified: safari.updated_at || currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  // ============================================================
  // DYNAMIC BLOG ROUTES - Fetch from Supabase
  // ============================================================
  const blogData = await fetchBlogPosts()
  
  const blogRoutes: MetadataRoute.Sitemap = blogData.map((post: { id: number; updated_at: string }) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: post.updated_at || currentDate,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  // ============================================================
  // COMBINE ALL ROUTES
  // ============================================================
  return [...staticRoutes, ...safariRoutes, ...blogRoutes]
}