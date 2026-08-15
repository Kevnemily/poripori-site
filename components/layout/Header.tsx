'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/rooms', label: 'Rooms' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/cuisines', label: 'Cuisines' },
    { href: '/request', label: 'Book Now' },
  ]
  
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-amber-700">
          Poripori
        </Link>
        <nav className="hidden md:flex space-x-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`hover:text-amber-600 transition ${pathname === link.href ? 'text-amber-700 font-semibold' : 'text-gray-700'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}