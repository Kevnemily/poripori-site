import { useEffect, useState } from 'react'
import { SafariPackage, BlogPost } from '@/types'

// Hook to fetch all safaris
export function useSafaris() {
  const [safaris, setSafaris] = useState<SafariPackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSafaris = async () => {
      try {
        const response = await fetch('/api/safaris')
        if (!response.ok) throw new Error('Failed to fetch safaris')
        const data = await response.json()
        setSafaris(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchSafaris()
  }, [])

  return { safaris, loading, error }
}

// Hook to fetch a single safari by slug
export function useSafari(slug: string) {
  const [safari, setSafari] = useState<SafariPackage | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSafari = async () => {
      try {
        const response = await fetch(`/api/safaris/${slug}`)
        if (!response.ok) throw new Error('Failed to fetch safari')
        const data = await response.json()
        setSafari(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (slug) fetchSafari()
  }, [slug])

  return { safari, loading, error }
}

// Hook to fetch all blog posts
export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/blog')
        if (!response.ok) throw new Error('Failed to fetch blog posts')
        const data = await response.json()
        setPosts(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  return { posts, loading, error }
}

// Hook to fetch a single blog post by ID
export function useBlogPost(id: number) {
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/blog/${id}`)
        if (!response.ok) throw new Error('Failed to fetch blog post')
        const data = await response.json()
        setPost(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchPost()
  }, [id])

  return { post, loading, error }
}