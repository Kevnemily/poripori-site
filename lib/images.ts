// lib/images.ts

// Cloudinary configuration
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dp7piqlbe'

// Image mapping - maps our code filenames to Cloudinary public IDs
export const IMAGE_MAP: Record<string, string> = {
  // Homepage
  'hero.jpg': 'hero.webp',
  'hero.webp': 'hero.webp',
  'sanctuary.webp': 'sanctuary.webp',
  'balloon.webp': 'balloon.webp',
  'gamedrive.webp': 'gamedrive.webp',
  'service.webp': 'service.webp',
  
  // Cuisines
  'food11.webp': 'food11.webp',
  'food18.webp': 'food18.webp',
  'food21.webp': 'food21.webp',
  'bar3.webp': 'bar3.webp',
  'bushdinner1.webp': 'bushdinner1.webp',
  'bar1.webp': 'bar1.webp',
  'bushdinner2.webp': 'bushdinner2.webp',
  'chef2.webp': 'chef2.webp',
  'food8.webp': 'food8.webp',
  'food23.webp': 'food23.webp',
  
  // Rooms
  'tripple.webp': 'tripple.webp',
  'twin2.webp': 'twin2.webp',
  'outdoor1.webp': 'outdoor1.webp',
  'outdoor3.webp': 'outdoor3.webp',
  'double.webp': 'double.webp',
  'bathroom3.webp': 'bathroom3.webp',
  'tripplebathroom.webp': 'tripplebathroom.webp',
  'outdoor2.webp': 'outdoor2.webp',
  'family2.webp': 'family2.webp',
  'shower.webp': 'shower.webp',
  'outdoorfamily.webp': 'outdoorfamily.webp',
  
  // Gallery
  'chef5.webp': 'chef5.webp',
  'zebra.webp': 'zebra.webp',
  'birds.webp': 'birds.webp',
  'food3.webp': 'food3.webp',
  
  // Additional - if you have these
  'lodge.jpg': 'lodge.webp',
  'camp.jpg': 'camp.webp',
  'cuisine-1.jpg': 'cuisine-1.webp',
  'cuisine-2.jpg': 'cuisine-2.webp',
  'cuisine-3.jpg': 'cuisine-3.webp',
}

/**
 * Get a Cloudinary image URL with optimization
 */
export function getCloudinaryUrl(
  filename: string, 
  options?: {
    width?: number
    height?: number
    quality?: number
    crop?: 'fill' | 'fit' | 'scale'
    format?: 'auto' | 'webp' | 'avif'
  }
): string {
  // Get the public ID from the map
  let publicId = IMAGE_MAP[filename]
  
  // If not found in map, use the filename as is
  if (!publicId) {
    publicId = filename
  }
  
  const width = options?.width || 'auto'
  const height = options?.height || 'auto'
  const quality = options?.quality || 'auto'
  const format = options?.format || 'auto'
  const crop = options?.crop || 'fill'
  
  // Build the URL without version number (Cloudinary automatically serves latest)
  let url = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`
  
  // Add transformations
  const transforms: string[] = []
  if (format) transforms.push(`f_${format}`)
  if (quality) transforms.push(`q_${quality}`)
  if (width !== 'auto') transforms.push(`w_${width}`)
  if (height !== 'auto') transforms.push(`h_${height}`)
  if (crop) transforms.push(`c_${crop}`)
  
  if (transforms.length > 0) {
    url += transforms.join(',') + '/'
  }
  
  url += publicId
  
  return url
}

/**
 * Get a responsive image srcset
 */
export function getSrcSet(filename: string, widths: number[] = [640, 750, 828, 1080, 1200, 1920]): string {
  const publicId = IMAGE_MAP[filename] || filename
  return widths
    .map(w => `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${w},c_fill/${publicId} ${w}w`)
    .join(', ')
}

/**
 * Get a blur placeholder (low quality image)
 */
export function getBlurPlaceholder(filename: string): string {
  const publicId = IMAGE_MAP[filename] || filename
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_1,w_20/${publicId}`
}

/**
 * Get a fallback placeholder image
 */
export function getPlaceholderImage(width: number = 800, height: number = 600, text: string = 'Pori Pori'): string {
  return `https://placehold.co/${width}x${height}/1e293b/fcd34d?text=${encodeURIComponent(text)}`
}