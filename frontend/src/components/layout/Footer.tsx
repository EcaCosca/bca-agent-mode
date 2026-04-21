import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function Footer() {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  return (
    <footer className="bg-[#0d0d0d] border-t border-gray-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/">
              <img
                src="/assets/logos/BCA logo wordmark 1_F23 white trans.png"
                alt="BCA"
                className="h-10 w-auto mb-4"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            {/* Social icons */}
            <div className="flex gap-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E8001D] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E8001D] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E8001D] transition-colors">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">{t('footer.products')}</h4>
            <ul className="space-y-2">
              <li><Link to="/productos" className="text-gray-400 hover:text-white text-sm transition-colors">Todos los productos</Link></li>
              <li><Link to="/categoria/balizas-alud" className="text-gray-400 hover:text-white text-sm transition-colors">Balizas de Alud</Link></li>
              <li><Link to="/categoria/airbags-avalancha" className="text-gray-400 hover:text-white text-sm transition-colors">Airbags</Link></li>
              <li><Link to="/categoria/palas-rescate" className="text-gray-400 hover:text-white text-sm transition-colors">Palas</Link></li>
              <li><Link to="/categoria/sondas-avalancha" className="text-gray-400 hover:text-white text-sm transition-colors">Sondas</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">{t('footer.education')}</h4>
            <ul className="space-y-2">
              <li><Link to="/educacion" className="text-gray-400 hover:text-white text-sm transition-colors">Guías de seguridad</Link></li>
              <li><Link to="/nosotros" className="text-gray-400 hover:text-white text-sm transition-colors">{t('footer.about')}</Link></li>
            </ul>
            <h4 className="text-white font-semibold text-sm mt-6 mb-4 uppercase tracking-widest">{t('footer.contact')}</h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@bcaargentina.com" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@bcaargentina.com
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-widest">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Recibí novedades y consejos de seguridad.</p>
            <form onSubmit={(e) => { e.preventDefault(); setEmail('') }} className="flex flex-col gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.newsletter_placeholder')}
                className="bg-gray-900 border border-gray-700 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-[#E8001D] transition-colors"
              />
              <button
                type="submit"
                className="bg-[#E8001D] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                {t('footer.newsletter_cta')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} BCA Argentina. {t('footer.rights')}.
          </p>
          <p className="text-gray-600 text-xs">
            Backcountry Access® — Distribuidor oficial para Argentina
          </p>
        </div>
      </div>
    </footer>
  )
}
