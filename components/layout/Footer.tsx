import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'

export default function Footer() {
  return (
    <footer className="bg-[#1A1510] text-white/60 pt-12 pb-8 px-[5%] max-w-[100vw] overflow-x-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-['Cormorant_Garamond'] text-xl font-normal mb-3">Pori Pori</h3>
            <p className="text-sm text-white/40 font-light">
              An intimate ultra-luxury safari sanctuary in the heart of the Serengeti. Where golden light meets untamed wilderness.
            </p>
            <div className="flex gap-3 mt-4">
              <a 
                href="https://www.instagram.com/pori_porilodgesandcamps?igsh=anA5YWRoMmIyaWR3" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1"
                aria-label="Follow us on Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://www.facebook.com/PoriPoriLodgesandCamps" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1"
                aria-label="Follow us on Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a 
                href="https://www.linkedin.com/company/pori-pori-lodges-and-camps" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-[35px] h-[35px] border border-white/10 flex items-center justify-center text-white/40 rounded-full transition-all duration-300 hover:bg-[#C4A56E] hover:border-[#C4A56E] hover:text-white hover:-translate-y-1"
                aria-label="Follow us on LinkedIn"
              >
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          {/* Explore */}
          <div>
            <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Home</Link></li>
              <li><Link href="/#about" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">About</Link></li>
              <li><Link href="/#experiences" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Experiences</Link></li>
              <li><Link href="/cuisines" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Cuisine</Link></li>
              <li><Link href="/rooms" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Suites</Link></li>
              <li><Link href="/gallery" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Gallery</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Contact</h4>
            <ul className="space-y-2">
              <li><a href="mailto:reservations@poripori.com" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">reservations@poripori.com</a></li>
              <li><a href="tel:+255754430599" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">+255 754 430 599</a></li>
              <li><span className="text-white/40 text-sm font-light">Serengeti, Tanzania</span></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Legal</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Privacy Policy</a></li>
              <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Terms & Conditions</a></li>
              <li><a href="#" className="text-white/40 text-sm hover:text-[#D4BC8D] transition-colors font-light">Cookie Policy</a></li>
            </ul>
          </div>

          {/* NEW: Newsletter Column */}
          <div>
            <h4 className="text-white font-['Cormorant_Garamond'] text-lg font-normal mb-3">Newsletter</h4>
            <p className="text-white/40 text-sm font-light mb-4">
              Subscribe for exclusive offers and safari insights.
            </p>
            <NewsletterSignup />
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-white/5 pt-4 text-center text-[0.65rem] text-white/25 font-light tracking-[1px]">
          <p>&copy; {new Date().getFullYear()} Pori Pori Serengeti — All rights reserved</p>
        </div>
      </div>
    </footer>
  )
}