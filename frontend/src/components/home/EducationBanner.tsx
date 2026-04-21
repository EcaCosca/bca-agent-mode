import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function EducationBanner() {
  const { t } = useTranslation()

  return (
    <div className="relative h-80 md:h-96 overflow-hidden">
      <img
        src="/assets/images/ski/ski-1.jpg"
        alt="Backcountry skiing"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70" />
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 h-full gap-4">
        <p className="text-white text-2xl md:text-4xl font-light italic max-w-3xl">
          {t('home.education_subtitle')}
        </p>
        <p className="text-gray-300 text-sm md:text-base max-w-xl">
          {t('home.education_title')}
        </p>
        <Link
          to="/educacion"
          className="mt-4 bg-[#E8001D] text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors rounded"
        >
          {t('home.education_cta')}
        </Link>
      </div>
    </div>
  )
}
