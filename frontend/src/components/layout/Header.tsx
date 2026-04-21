import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCartStore } from '../../store/cartStore'

export default function Header() {
  const { t, i18n } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const totalItems = useCartStore((s) => s.totalItems())

  const toggleLang = () => i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es')

  return (
    <header className="bg-[#0d0d0d] sticky top-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="/assets/logos/BCA logo wordmark 1_F23 white trans.png"
              alt="BCA"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/productos" className="text-white hover:text-[#E8001D] transition-colors text-sm font-medium tracking-wide">
              {t('nav.products')}
            </Link>
            <Link to="/educacion" className="text-white hover:text-[#E8001D] transition-colors text-sm font-medium tracking-wide">
              {t('nav.education')}
            </Link>
            <Link to="/nosotros" className="text-white hover:text-[#E8001D] transition-colors text-sm font-medium tracking-wide">
              {t('nav.about')}
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleLang}
              className="text-gray-400 hover:text-white text-xs font-medium tracking-widest transition-colors"
            >
              {i18n.language === 'es' ? 'EN' : 'ES'}
            </button>

            <Link to="/carrito" className="relative text-white hover:text-[#E8001D] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#E8001D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                }
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-gray-800 px-4 py-4 flex flex-col gap-4">
          <Link to="/productos" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#E8001D] text-sm font-medium">
            {t('nav.products')}
          </Link>
          <Link to="/educacion" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#E8001D] text-sm font-medium">
            {t('nav.education')}
          </Link>
          <Link to="/nosotros" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#E8001D] text-sm font-medium">
            {t('nav.about')}
          </Link>
        </div>
      )}
    </header>
  )
}
