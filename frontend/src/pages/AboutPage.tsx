export default function AboutPage() {
  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      {/* Hero */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-24 bg-[#0d0d0d]">
        <img
          src="/assets/logos/BCA logo wordmark 1_F23 white trans.png"
          alt="BCA"
          className="w-48 mb-8"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Backcountry Access Argentina
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Lider mundial en equipamiento de seguridad para avalanchas y el backcountry.
        </p>
      </section>

      {/* Pillars */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '⚙️', title: 'Funcion', desc: 'Productos disenados para funcionar en las condiciones mas exigentes. Cada detalle importa cuando la vida esta en juego.' },
              { icon: '🏔️', title: 'Confianza', desc: 'Mas de 30 anos de experiencia respaldando a guias, esquiadores y amantes del backcountry en todo el mundo.' },
              { icon: '📋', title: 'Disciplina', desc: 'La seguridad en avalanchas requiere conocimiento y practica constante. BCA lidera en educacion y preparacion.' },
            ].map((p) => (
              <div key={p.title} className="bg-[#1a1a1a] rounded-lg p-8 text-center">
                <div className="text-4xl mb-4">{p.icon}</div>
                <h3 className="text-white font-bold text-xl mb-3">{p.title}</h3>
                <p className="text-gray-400 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 px-4 bg-[#111]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Historia</h2>
          <p className="text-gray-300 leading-relaxed mb-4">
            Fundada en 1994 en Boulder, Colorado, Backcountry Access nacio de la pasion por el backcountry y la urgencia de salvar vidas en la montana. Desde sus inicios, BCA se dedico a desarrollar balizas de alud mas intuitivas y efectivas.
          </p>
          <p className="text-gray-300 leading-relaxed mb-4">
            Con el lanzamiento del Tracker DTS en 1997, BCA revoluciono el rescate en avalanchas al simplificar drasticamente el proceso de busqueda. Hoy, el Tracker sigue siendo la baliza mas vendida del mundo.
          </p>
          <p className="text-gray-300 leading-relaxed">
            BCA Argentina lleva los productos y la filosofia de seguridad de BCA al mercado sudamericano, trabajando con guias, escuelas de montana y centros de ski para promover la seguridad en el backcountry.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Mision</h2>
          <blockquote className="text-2xl text-gray-300 italic leading-relaxed border-l-4 border-[#E8001D] pl-6 text-left">
            "Promover el acceso y salvar vidas a traves de productos confiables, faciles de usar y educacion."
          </blockquote>
        </div>
      </section>

      {/* YouTube */}
      <section className="py-16 px-4 bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Conoce BCA</h2>
          <iframe
            src="https://www.youtube.com/embed/H-3GlUDbvCg"
            title="BCA Brand Video"
            className="w-full aspect-video rounded-lg"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  )
}
