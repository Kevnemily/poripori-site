export interface SafariPackage {
  id: number
  title: string
  duration: string
  description: string
  full_description?: string
  price: string
  image: string
  images?: { src: string; alt: string }[]
  highlights: string[]
  slug: string
  includes?: string[]
  itinerary?: { day: string; title: string; description: string }[]
  best_time?: string
  group_size?: string
  accommodation?: string
  created_at?: string
  updated_at?: string
}

export interface BlogPost {
  id: number
  title: string
  excerpt: string
  image: string
  date: string
  read_time: string  // Changed from readTime to read_time
  category: string
  content: string
  slug?: string
  created_at?: string
  updated_at?: string
}

export interface RoomType {
  id: number
  type: string
  quantity: number
  selected: boolean
}