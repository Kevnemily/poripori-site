import Image from 'next/image'
import { getCloudinaryUrl, getSrcSet, getBlurPlaceholder, getPlaceholderImage } from '@/lib/images'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
  responsive?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

export default function OptimizedImage({
  src,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = '',
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  responsive = true,
  objectFit = 'cover'
}: OptimizedImageProps) {
  const [imgError, setImgError] = useState(false)

  // If image failed to load, show placeholder
  if (imgError) {
    return (
      <div 
        className={`bg-[#1e293b] flex items-center justify-center ${className}`}
        style={{ width: width || '100%', height: height || '100%' }}
      >
        <span className="text-[#fcd34d] font-['Cormorant_Garamond'] text-lg">
          Pori Pori
        </span>
      </div>
    )
  }

  // If it's already a full URL (Cloudinary or external), use it directly
  if (src.startsWith('http')) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={className}
        sizes={sizes}
        style={{ objectFit }}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${generateBlurPlaceholder()}`}
        onError={() => setImgError(true)}
      />
    )
  }

  // Use Cloudinary for all local images
  const cloudinaryUrl = getCloudinaryUrl(src, { width, height })
  const srcSet = responsive ? getSrcSet(src) : undefined
  const blurDataURL = getBlurPlaceholder(src)

  return (
    <Image
      src={cloudinaryUrl}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={className}
      sizes={sizes}
      style={{ objectFit }}
      placeholder="blur"
      blurDataURL={blurDataURL}
      {...(srcSet ? { srcSet } : {})}
      onError={() => setImgError(true)}
    />
  )
}

function generateBlurPlaceholder() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <rect width="100%" height="100%" fill="#f3f4f6"/>
  </svg>`
  return Buffer.from(svg).toString('base64')
}