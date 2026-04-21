import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
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

const CATEGORY_NAMES: Record<string, string> = {
  'balizas-alud': 'Balizas de Alud',
  'airbags-avalancha': 'Airbags de Avalancha',
  'palas-rescate': 'Palas de Rescate',
  'sondas-avalancha': 'Sondas de Avalancha',
  'radios-bc-link': 'Radios BC Link™',
  'mochilas-stash': 'Mochilas Stash™',
  'kits-rescate': 'Kits de Rescate',
  'equipamiento-motonieve': 'Equipamiento Motonieve',
}

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const { t } = useTranslation()
  const [products, setProducts] = useState<Product[]>([])

  const categoryName = slug ? (CATEGORY_NAMES[slug] ?? slug) : ''

  useEffect(() => {
    if (!slug) return
    getProducts({ category: slug })
      .then(setProducts)
      .catch(() => {
        setProducts(MOCK_PRODUCTS.filter((p) => p.categorySlug === slug))
      })
  }, [slug])

  // Always show filtered mock as fallback if empty
  const displayed = products.length > 0 ? products : MOCK_PRODUCTS.filter((p) => p.categorySlug === slug)

  return (
    <div className="bg-[#0d0d0d] min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link to="/productos" className="text-gray-400 hover:text-white text-sm mb-6 flex items-center gap-2 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          {t('products.title')}
        </Link>

        <h1 className="text-4xl font-bold text-white mb-10">{categoryName}</h1>

        {displayed.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 mb-6">No hay productos en esta categoría aún.</p>
            <Link to="/productos" className="bg-[#E8001D] text-white px-6 py-3 rounded font-semibold hover:bg-red-700 transition-colors">
              Ver todos los productos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayed.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
