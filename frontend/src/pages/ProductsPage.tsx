import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/products/ProductCard'
import { getProducts } from '../lib/api'
import type { Product } from '../types'

const MOCK_PRODUCTS: Product[] = [
  { id: 1, slug: 'tracker4', name: 'BCA Tracker4', nameEs: 'BCA Tracker4™', description: 'Advanced avalanche beacon', descriptionEs: 'Baliza de alud de alta performance con tecnología de triple antena.', price: 580000, images: ['/assets/images/hero/hero-1.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: true, inStock: true },
  { id: 2, slug: 'tracker-s', name: 'BCA Tracker S', nameEs: 'BCA Tracker S™', description: 'Entry level avalanche beacon', descriptionEs: 'Baliza de alud de entrada, ideal para principiantes.', price: 420000, images: ['/assets/images/hero/hero-2.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: false, inStock: true },
  { id: 3, slug: 'float-22', name: 'Float 22', nameEs: 'Float™ 22', description: 'Airbag backpack 22L', descriptionEs: 'Mochila airbag 22L para mayor seguridad en avalanchas.', price: 1250000, images: ['/assets/images/ski/ski-1.jpg'], category: 'Airbags de Avalancha', categorySlug: 'airbags-avalancha', featured: true, inStock: true },
  { id: 4, slug: 'float-32', name: 'Float 32', nameEs: 'Float™ 32', description: 'Airbag backpack 32L', descriptionEs: 'Mochila airbag 32L con mayor capacidad de almacenamiento.', price: 1450000, images: ['/assets/images/ski/ski-2.jpg'], category: 'Airbags de Avalancha', categorySlug: 'airbags-avalancha', featured: false, inStock: true },
  { id: 5, slug: 'dozer-3d', name: 'Dozer 3D', nameEs: 'Dozer™ 3D', description: 'Avalanche shovel', descriptionEs: 'Pala de rescate de aluminio ultra resistente y liviana.', price: 95000, images: ['/assets/images/ski/ski-3.jpg'], category: 'Palas de Rescate', categorySlug: 'palas-rescate', featured: true, inStock: true },
  { id: 6, slug: 'stealth-270', name: 'Stealth 270', nameEs: 'Stealth™ 270', description: 'Carbon avalanche probe', descriptionEs: 'Sonda de carbono 270cm, plegado rápido para rescate eficiente.', price: 65000, images: ['/assets/images/hero/hero-3.jpg'], category: 'Sondas de Avalancha', categorySlug: 'sondas-avalancha', featured: true, inStock: true },
  { id: 7, slug: 'bc-link-20', name: 'BC Link 2.0', nameEs: 'BC Link™ 2.0', description: 'Two-way radio', descriptionEs: 'Radio bidireccional de largo alcance para comunicación en el backcountry.', price: 180000, images: ['/assets/images/sled/sled-1.jpg'], category: 'Radios BC Link™', categorySlug: 'radios-bc-link', featured: false, inStock: true },
  { id: 8, slug: 'mtnpro-vest', name: 'MtnPro Vest', nameEs: 'MtnPro™ Vest', description: 'Snowmobile safety vest', descriptionEs: 'Chaleco de seguridad para motonieve con airbag integrado.', price: 320000, images: ['/assets/images/sled/sled-2.jpg'], category: 'Equipamiento Motonieve', categorySlug: 'equipamiento-motonieve', featured: false, inStock: false },
]

const CATEGORIES = [
  { slug: 'all', nameEs: 'Todos' },
  { slug: 'balizas-alud', nameEs: 'Balizas de Alud' },
  { slug: 'airbags-avalancha', nameEs: 'Airbags' },
  { slug: 'palas-rescate', nameEs: 'Palas' },
  { slug: 'sondas-avalancha', nameEs: 'Sondas' },
  { slug: 'radios-bc-link', nameEs: 'Radios' },
  { slug: 'equipamiento-motonieve', nameEs: 'Motonieve' },
]

export default function ProductsPage() {
  const { t } = useTranslation()
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setProducts(MOCK_PRODUCTS))
  }, [])

  const filtered = products
    .filter((p) => selectedCategory === 'all' || p.categorySlug === selectedCategory)
    .filter((p) =>
      !searchTerm ||
      p.nameEs.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descriptionEs.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.price - b.price
      if (sortOrder === 'desc') return b.price - a.price
      return 0
    })

  return (
    <div className="bg-[#0d0d0d] min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">{t('products.title')}</h1>

        {/* Search & Sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t('products.search_placeholder')}
              className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-[#E8001D] transition-colors"
            />
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'default' | 'asc' | 'desc')}
            className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-[#E8001D] transition-colors"
          >
            <option value="default">Ordenar por</option>
            <option value="asc">{t('products.sort_price_asc')}</option>
            <option value="desc">{t('products.sort_price_desc')}</option>
          </select>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-[#E8001D] text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {cat.nameEs}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
