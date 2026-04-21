import { useState, useEffect } from 'react'
import ProductCard from '../components/products/ProductCard'
import type { Product } from '../types'

const MOCK_PRODUCTS: Product[] = [
  { id: 1, slug: 'tracker-4', name: 'BCA Tracker 4', nameEs: 'Baliza BCA Tracker 4', description: '', descriptionEs: 'La baliza de alud mas facil de usar del mundo.', price: 85000, images: ['/assets/images/hero/12_KELLER_BCA_2023_00238.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: true, inStock: true },
  { id: 2, slug: 'float-32', name: 'Float 32', nameEs: 'Mochila Airbag BCA Float 32', description: '', descriptionEs: 'Sistema de airbag de avalancha de doble bolsa.', price: 320000, images: ['/assets/images/ski/CRICCO-BCA2023-100.jpg'], category: 'Airbags', categorySlug: 'airbags-avalancha', featured: true, inStock: true },
  { id: 3, slug: 'dozer-3d', name: 'Dozer 3D', nameEs: 'Pala de Rescate Dozer 3D', description: '', descriptionEs: 'Pala de aluminio ultra resistente y liviana.', price: 28000, images: ['/assets/images/ski/KELLER_BCA_2023_00126.jpg'], category: 'Palas de Rescate', categorySlug: 'palas-rescate', featured: false, inStock: true },
  { id: 4, slug: 'stealth-270', name: 'Stealth 270', nameEs: 'Sonda de Carbono Stealth 270', description: '', descriptionEs: 'Sonda de carbono 270cm de plegado rapido.', price: 18000, images: ['/assets/images/ski/KELLER_BCA_2023_00204.jpg'], category: 'Sondas de Avalancha', categorySlug: 'sondas-avalancha', featured: false, inStock: true },
  { id: 5, slug: 'bc-link-2', name: 'BC Link 2.0', nameEs: 'Radio BCA BC Link 2.0', description: '', descriptionEs: 'Radio de comunicacion para backcountry.', price: 42000, images: ['/assets/images/ski/KELLER_BCA_2023_00210.jpg'], category: 'Radios', categorySlug: 'radios-bc-link', featured: true, inStock: true },
  { id: 6, slug: 'stash-20', name: 'Stash 20', nameEs: 'Mochila Stash 20L', description: '', descriptionEs: 'Mochila ligera de 20L para salidas de dia.', price: 35000, images: ['/assets/images/hero/KELLER_BCA_2023_00239.jpg'], category: 'Mochilas', categorySlug: 'mochilas-stash', featured: false, inStock: true },
  { id: 7, slug: 'kit-rescate-basico', name: 'Rescue Kit', nameEs: 'Kit de Rescate BCA Basico', description: '', descriptionEs: 'Kit completo baliza + pala + sonda.', price: 115000, images: ['/assets/images/hero/CRICCO-BCA2023-297 red copy.jpg'], category: 'Kits', categorySlug: 'kits-rescate', featured: true, inStock: true },
  { id: 8, slug: 'mtnpro-vest', name: 'MtnPro Vest', nameEs: 'Chaleco Airbag MtnPro para Motonieve', description: '', descriptionEs: 'Chaleco de seguridad con airbag para motonieve.', price: 180000, images: ['/assets/images/hero/BCA_BB-434.jpg'], category: 'Motonieve', categorySlug: 'motonieve', featured: false, inStock: false },
]

const CATEGORIES = [
  { slug: 'all', nameEs: 'Todos' },
  { slug: 'balizas-alud', nameEs: 'Balizas' },
  { slug: 'airbags-avalancha', nameEs: 'Airbags' },
  { slug: 'palas-rescate', nameEs: 'Palas' },
  { slug: 'sondas-avalancha', nameEs: 'Sondas' },
  { slug: 'radios-bc-link', nameEs: 'Radios' },
  { slug: 'mochilas-stash', nameEs: 'Mochilas' },
  { slug: 'kits-rescate', nameEs: 'Kits' },
  { slug: 'motonieve', nameEs: 'Motonieve' },
]

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOrder, setSortOrder] = useState<'default' | 'asc' | 'desc'>('default')

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts(MOCK_PRODUCTS))
  }, [])

  const filtered = products
    .filter((p) => selectedCategory === 'all' || p.categorySlug === selectedCategory)
    .filter(
      (p) =>
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
        <div className="flex items-baseline gap-4 mb-8">
          <h1 className="text-4xl font-bold text-white">Productos</h1>
          <span className="text-gray-400 text-sm">{filtered.length} productos</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full bg-gray-900 border border-gray-700 text-white pl-10 pr-4 py-2 rounded focus:outline-none focus:border-[#E8001D] transition-colors"
            />
          </div>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'default' | 'asc' | 'desc')}
            className="bg-gray-900 border border-gray-700 text-white px-4 py-2 rounded focus:outline-none focus:border-[#E8001D] transition-colors"
          >
            <option value="default">Ordenar por</option>
            <option value="asc">Precio: menor a mayor</option>
            <option value="desc">Precio: mayor a menor</option>
          </select>
        </div>

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

        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No se encontraron productos.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
