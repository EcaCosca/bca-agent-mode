import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import type { Product } from '../types'

const MOCK_PRODUCTS: Product[] = [
  { id: 1, slug: 'tracker-4', name: 'BCA Tracker 4', nameEs: 'Baliza BCA Tracker 4', description: '', descriptionEs: 'La baliza de alud mas facil de usar del mundo.', price: 85000, images: ['/assets/images/hero/12_KELLER_BCA_2023_00238.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: true, inStock: true },
  { id: 2, slug: 'float-32', name: 'Float 32', nameEs: 'Mochila Airbag BCA Float 32', description: '', descriptionEs: 'Sistema de airbag de avalancha de doble bolsa.', price: 320000, images: ['/assets/images/ski/CRICCO-BCA2023-100.jpg'], category: 'Airbags', categorySlug: 'airbags-avalancha', featured: true, inStock: true },
  { id: 3, slug: 'dozer-3d', name: 'Dozer 3D', nameEs: 'Pala de Rescate Dozer 3D', description: '', descriptionEs: 'Pala de aluminio ultra resistente y liviana.', price: 28000, images: ['/assets/images/ski/KELLER_BCA_2023_00126.jpg'], category: 'Palas de Rescate', categorySlug: 'palas-rescate', featured: false, inStock: true },
  { id: 4, slug: 'stealth-270', name: 'Stealth 270', nameEs: 'Sonda de Carbono Stealth 270', description: '', descriptionEs: 'Sonda de carbono 270cm con plegado rapido.', price: 18000, images: ['/assets/images/ski/KELLER_BCA_2023_00204.jpg'], category: 'Sondas de Avalancha', categorySlug: 'sondas-avalancha', featured: false, inStock: true },
  { id: 5, slug: 'bc-link-2', name: 'BC Link 2.0', nameEs: 'Radio BCA BC Link 2.0', description: '', descriptionEs: 'Radio de comunicacion para backcountry.', price: 42000, images: ['/assets/images/ski/KELLER_BCA_2023_00210.jpg'], category: 'Radios', categorySlug: 'radios-bc-link', featured: true, inStock: true },
  { id: 6, slug: 'stash-20', name: 'Stash 20', nameEs: 'Mochila Stash 20L', description: '', descriptionEs: 'Mochila ligera de 20L para salidas de dia.', price: 35000, images: ['/assets/images/hero/KELLER_BCA_2023_00239.jpg'], category: 'Mochilas', categorySlug: 'mochilas-stash', featured: false, inStock: true },
  { id: 7, slug: 'kit-rescate-basico', name: 'Rescue Kit', nameEs: 'Kit de Rescate BCA Basico', description: '', descriptionEs: 'Kit completo con baliza, pala y sonda BCA.', price: 115000, images: ['/assets/images/hero/KELLER_BCA_2023_00239.jpg'], category: 'Kits', categorySlug: 'kits-rescate', featured: true, inStock: true },
  { id: 8, slug: 'mtnpro-vest', name: 'MtnPro Vest', nameEs: 'Chaleco Airbag MtnPro Motonieve', description: '', descriptionEs: 'Chaleco de seguridad con airbag para motonieve.', price: 180000, images: ['/assets/images/hero/BCA_BB-434.jpg'], category: 'Motonieve', categorySlug: 'motonieve', featured: false, inStock: false },
]

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>()
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS)

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => setProducts(MOCK_PRODUCTS))
  }, [])

  const filtered = products.filter((p) => p.categorySlug === slug)
  const categoryName = filtered[0]?.category ?? slug ?? 'Categoria'

  return (
    <div className="bg-[#0d0d0d] min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline gap-4 mb-8">
          <h1 className="text-4xl font-bold text-white">{categoryName}</h1>
          <span className="text-gray-400 text-sm">{filtered.length} productos</span>
        </div>
        {filtered.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No hay productos en esta categoria.</p>
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
