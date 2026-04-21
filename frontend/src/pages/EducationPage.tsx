import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { getEducationPosts } from '../lib/api'
import type { EducationPost } from '../types'

const MOCK_POSTS: EducationPost[] = [
  {
    id: 1,
    slug: 'como-usar-baliza-alud',
    title: 'How to Use an Avalanche Beacon',
    titleEs: 'Cómo usar una baliza de alud',
    excerpt: 'Step by step guide',
    excerptEs: 'Guía paso a paso para usar tu baliza correctamente en una emergencia de avalancha.',
    content: '',
    contentEs: '',
    image: '/assets/images/ski/ski-1.jpg',
    publishedAt: '2024-06-01',
  },
  {
    id: 2,
    slug: 'preparacion-backcountry',
    title: 'Backcountry Preparation',
    titleEs: 'Preparación antes de salir al backcountry',
    excerpt: 'Everything you need to know',
    excerptEs: 'Todo lo que necesitás saber antes de adentrarte en el terreno no controlado.',
    content: '',
    contentEs: '',
    image: '/assets/images/ski/ski-2.jpg',
    publishedAt: '2024-06-15',
  },
  {
    id: 3,
    slug: 'tecnicas-rescate-avalancha',
    title: 'Avalanche Rescue Techniques',
    titleEs: 'Técnicas de rescate en avalancha',
    excerpt: 'Most effective search and rescue techniques',
    excerptEs: 'Las técnicas de búsqueda y rescate más efectivas cuando ocurre una avalancha.',
    content: '',
    contentEs: '',
    image: '/assets/images/sled/sled-1.jpg',
    publishedAt: '2024-07-01',
  },
]

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('es-AR', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function EducationPage() {
  const { t } = useTranslation()
  const [posts, setPosts] = useState<EducationPost[]>(MOCK_POSTS)

  useEffect(() => {
    getEducationPosts()
      .then(setPosts)
      .catch(() => setPosts(MOCK_POSTS))
  }, [])

  return (
    <div className="bg-[#0d0d0d] min-h-screen">
      {/* Header */}
      <div className="bg-gray-950 py-20 px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('education.title')}</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">{t('education.subtitle')}</p>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <article key={post.id} className="bg-gray-900 rounded-lg overflow-hidden group">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.titleEs}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <p className="text-gray-500 text-xs mb-3">{formatDate(post.publishedAt)}</p>
                <h2 className="text-white font-bold text-xl mb-3 group-hover:text-[#E8001D] transition-colors">
                  {post.titleEs}
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed mb-6">{post.excerptEs}</p>
                <Link
                  to={`/educacion/${post.slug}`}
                  className="inline-block bg-[#E8001D] text-white px-5 py-2 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
                >
                  Leer más
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
