import { useState, useEffect } from 'react'
import type { EducationPost } from '../types'

const MOCK_POSTS: EducationPost[] = [
  { id: 1, slug: 'como-usar-baliza', title: 'How to use an avalanche beacon', titleEs: 'Cómo usar una baliza de alud', excerpt: '', excerptEs: 'Guia paso a paso para usar correctamente una baliza BCA Tracker en caso de avalancha.', content: '', contentEs: '', image: '/assets/images/ski/KELLER_BCA_2023_00126.jpg', publishedAt: '2024-01-15' },
  { id: 2, slug: 'preparacion-backcountry', title: 'Backcountry preparation', titleEs: 'Preparacion antes de salir al backcountry', excerpt: '', excerptEs: 'Todo lo que necesitas saber antes de tu primera salida al backcountry.', content: '', contentEs: '', image: '/assets/images/ski/CRICCO-BCA2023-100.jpg', publishedAt: '2024-02-10' },
  { id: 3, slug: 'tecnicas-rescate', title: 'Avalanche rescue techniques', titleEs: 'Tecnicas de rescate en avalancha', excerpt: '', excerptEs: 'Como organizar y ejecutar un rescate de avalancha efectivo con tu grupo.', content: '', contentEs: '', image: '/assets/images/ski/KELLER_BCA_2023_00204.jpg', publishedAt: '2024-03-05' },
]

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function EducationPage() {
  const [posts, setPosts] = useState<EducationPost[]>(MOCK_POSTS)

  useEffect(() => {
    fetch('/api/education')
      .then((r) => r.json())
      .then(setPosts)
      .catch(() => setPosts(MOCK_POSTS))
  }, [])

  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      {/* Hero */}
      <section className="relative flex items-center justify-center text-center px-4 py-24" style={{ minHeight: '360px' }}>
        <div className="absolute inset-0 bg-[#0d0d0d]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Educacion en Seguridad Backcountry
          </h1>
          <p className="text-gray-400 text-lg">
            Aprende las tecnicas y protocolos esenciales para moverte con seguridad en la montana.
          </p>
        </div>
      </section>

      {/* Posts grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-10">Guias y articulos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className="bg-[#1a1a1a] rounded-lg overflow-hidden group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.titleEs}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <p className="text-gray-500 text-xs mb-2">{formatDate(post.publishedAt)}</p>
                  <h3 className="text-white font-bold text-lg mb-3">{post.titleEs}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-4">{post.excerptEs}</p>
                  <a href={"/educacion/" + post.slug} className="text-[#E8001D] text-sm font-semibold hover:underline">
                    Leer mas →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube section */}
      <section className="py-16 px-4 bg-[#111]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Video BCA</h2>
          <iframe
            src="https://www.youtube.com/embed/H-3GlUDbvCg?autoplay=0&rel=0"
            title="BCA Brand Video"
            className="w-full aspect-video rounded-lg"
            allowFullScreen
          />
        </div>
      </section>
    </div>
  )
}
