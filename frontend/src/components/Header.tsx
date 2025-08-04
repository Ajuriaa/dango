import Image from 'next/image'
import logo from '@/assets/logo.webp'

export default function Header() {
  return (
    <header className="w-full py-6 px-4 md:px-8 relative z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Dango Logo"
            width={120}
            height={40}
            className="h-8 md:h-10 w-auto"
          />
        </div>
        
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
            Services
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
            Our Work
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
            Team
          </a>
          <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">
            Contact
          </a>
        </nav>

        <div className="flex items-center space-x-4">
          <button className="hidden md:block border border-purple-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-purple-500/10 transition-colors">
            GET IN TOUCH
          </button>
          
          <button className="md:hidden p-2 text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}