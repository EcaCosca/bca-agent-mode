import { Link } from 'react-router-dom'

export default function EducationBanner() {
  return (
    <section
      className="relative flex items-center justify-center text-center px-4 py-20"
      style={{ minHeight: '400px' }}
    >
      <img
        src="/assets/images/ski/CRICCO-BCA2023-100.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Educacion y Preparacion
        </h2>
        <p className="text-lg text-white/90 italic mb-8">
          "Ir al backcountry no es salir del mundo real, es entrar en el."
        </p>
        <Link
          to="/educacion"
          className="inline-block bg-[#E8001D] text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors rounded"
        >
          Ver guias de seguridad
        </Link>
      </div>
    </section>
  )
}
