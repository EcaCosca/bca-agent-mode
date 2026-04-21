import { useTranslation } from 'react-i18next'

const PILLARS = [
  {
    key: 'funcion',
    titleEs: 'Función',
    descEs: 'Cada producto BCA está diseñado con un propósito claro: salvar vidas. La ingeniería de precisión y los materiales de alta calidad garantizan un rendimiento superior cuando más lo necesitás.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    key: 'confianza',
    titleEs: 'Confianza',
    descEs: 'Más de 30 años de experiencia en el desarrollo de equipamiento de rescate en avalanchas han hecho de BCA la marca más confiable entre guías, rescatistas y aficionados del backcountry.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    key: 'disciplina',
    titleEs: 'Disciplina',
    descEs: 'La seguridad en el backcountry requiere preparación, práctica y respeto por la montaña. BCA Argentina promueve la educación continua y la disciplina como pilares fundamentales de cada salida.',
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function AboutPage() {
  const { t } = useTranslation()

  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      {/* Hero */}
      <div className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-[#0d0d0d]" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-3xl md:text-5xl text-white font-light italic mb-8">
            "Ir al backcountry no es salir del mundo real, es entrar en él."
          </p>
          <p className="text-gray-400 text-lg">{t('about.subtitle')}</p>
        </div>
      </div>

      {/* Three pillars */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-14">Nuestros pilares</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PILLARS.map((pillar) => (
              <div key={pillar.key} className="bg-gray-900 rounded-lg p-8 text-center">
                <div className="text-[#E8001D] flex justify-center mb-4">{pillar.icon}</div>
                <h3 className="text-white text-xl font-bold mb-4">{pillar.titleEs}</h3>
                <p className="text-gray-400 leading-relaxed">{pillar.descEs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company history */}
      <section className="py-20 px-4 bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8">Nuestra historia</h2>
          <div className="space-y-6 text-gray-300 leading-relaxed">
            <p>
              Backcountry Access fue fundada en 1994 en Boulder, Colorado, con una misión simple pero poderosa: hacer que el backcountry sea más seguro para todos. Desde entonces, BCA se ha convertido en el nombre de referencia mundial en equipamiento de rescate en avalanchas.
            </p>
            <p>
              BCA Argentina es el distribuidor oficial de Backcountry Access para la República Argentina. Nuestro compromiso es acercar el equipamiento de clase mundial de BCA a los esquiadores, snowboarders y aficionados al backcountry de los Andes argentinos.
            </p>
            <p>
              Desde Bariloche hasta Mendoza, desde Las Leñas hasta el Aconcagua, el terreno de alta montaña argentino es tan impresionante como exigente. Creemos que cada persona que se adentra en ese terreno merece contar con el mejor equipamiento de seguridad disponible.
            </p>
          </div>
        </div>
      </section>

      {/* Mission card */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-[#E8001D] pl-8 py-4">
            <h3 className="text-white text-2xl font-bold mb-4">Nuestra misión</h3>
            <p className="text-gray-300 text-lg leading-relaxed italic">
              "Promover el acceso responsable al backcountry argentino mediante la difusión del equipamiento de seguridad de mayor calidad y la educación continua en prevención y rescate de avalanchas."
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
