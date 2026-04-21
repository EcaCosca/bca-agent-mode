import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <div className="relative h-[90vh] overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        src="/assets/videos/brand-hero.mp4"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 h-full">
        <img
          src="/assets/logos/BCA logo wordmark 1_F23 white trans.png"
          alt="BCA"
          className="w-64 mb-8"
        />
        <p className="text-xl md:text-3xl text-white/90 max-w-2xl mb-10 font-light">
          {t('hero.tagline')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/productos"
            className="bg-[#E8001D] text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors rounded"
          >
            {t('hero.cta_primary')}
          </Link>
          <Link
            to="/educacion"
            className="border border-white text-white px-8 py-3 font-semibold hover:bg-white hover:text-black transition-colors rounded"
          >
            {t('hero.cta_secondary')}
          </Link>
        </div>
      </div>
    </div>
  )
}
