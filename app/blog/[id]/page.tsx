// app/blog/[id]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostClient from './BlogPostClient'

// ============================================================
// FETCH BLOG POST DIRECTLY (NO CLIENT HOOKS)
// ============================================================
async function getBlogPost(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?id=eq.${id}&select=*`,
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
    console.error('Error fetching blog post:', error)
    return null
  }
}

async function getAllBlogPostIds() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/blog_posts?select=id`,
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
    console.error('Error fetching blog post IDs:', error)
    return []
  }
}

// ============================================================
// GENERATE DYNAMIC METADATA FROM SUPABASE DATA
// ============================================================
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> | { id: string }
}): Promise<Metadata> {
  // ✅ FIX: Await params (Next.js 15+)
  const resolvedParams = await params
  const id = resolvedParams.id
  
  // Fetch the blog post directly (no client hook)
  const post = await getBlogPost(id)
  
  // If post not found, return default metadata
  if (!post) {
    return {
      title: 'Blog Post Not Found | Pori Pori Serengeti',
      description: 'The blog post you are looking for does not exist.',
    }
  }

  // Clean excerpt for description (remove HTML tags)
  const cleanExcerpt = post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160) || `Read ${post.title} on the Pori Pori Serengeti blog.`
  
  // Get the image or use default
  const imageUrl = post.image || 'https://res.cloudinary.com/dp7piqlbe/image/upload/v1786826167/birds.webp'

  // Format date safely
  const publishedDate = post.date || new Date().toISOString()
  const modifiedDate = post.updated_at || post.created_at || new Date().toISOString()

  return {
    title: `${post.title} | Pori Pori Serengeti Blog`,
    
    description: cleanExcerpt,
    
    keywords: `${post.category}, Serengeti safari, Tanzania travel, ${post.title}, Pori Pori blog, safari tips, wildlife guide, travel advice, African safari, Serengeti National Park, Great Migration, luxury safari, travel blog Tanzania`,
    
    openGraph: {
      title: `${post.title} | Pori Pori Serengeti Blog`,
      description: cleanExcerpt,
      url: `https://poriporiluxurylodgeandcamp.com/blog/${id}`,
      siteName: 'Pori Pori Serengeti - Blog',
      type: 'article',
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ['Pori Pori Serengeti'],
      tags: [post.category || 'Safari Blog'],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
    },
    
    twitter: {
      card: 'summary_large_image',
      title: `${post.title} | Pori Pori Serengeti`,
      description: cleanExcerpt,
      images: [imageUrl],
      site: '@poripori',
      creator: '@poripori',
    },
    
    alternates: {
      canonical: `https://poriporiluxurylodgeandcamp.com/blog/${id}`,
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
    
    // Article specific metadata
    other: {
      'article:published_time': publishedDate,
      'article:modified_time': modifiedDate,
      'article:author': 'Pori Pori Serengeti',
      'article:section': post.category || 'Safari Blog',
      'article:tag': post.category || 'Safari Blog',
    },
  }
}

// ============================================================
// GENERATE STATIC PATHS FOR BUILD TIME
// ============================================================
export async function generateStaticParams() {
  const posts = await getAllBlogPostIds()
  
  return posts.map((post: { id: number }) => ({
    id: String(post.id),
  }))
}

// ============================================================
// PAGE COMPONENT
// ============================================================
export default function Page() {
  return <BlogPostClient />
}