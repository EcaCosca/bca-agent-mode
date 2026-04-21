import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ProductCard from '../components/products/ProductCard'
import { useCartStore } from '../store/cartStore'
import type { Product } from '../types'

const MOCK_PRODUCTS: Product[] = [
  { id: 1, slug: 'tracker-4', name: 'BCA Tracker 4', nameEs: 'Baliza BCA Tracker 4', description: '', descriptionEs: 'La baliza de alud mas facil de usar del mundo. Tecnologia de triple antena con busqueda rapida.', price: 85000, images: ['/assets/images/hero/12_KELLER_BCA_2023_00238.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: true, inStock: true },
  { id: 2, slug: 'float-32', name: 'Float 32', nameEs: 'Mochila Airbag BCA Float 32', description: '', descriptionEs: 'Sistema de airbag de avalancha de doble bolsa que maximiza la supervivencia.', price: 320000, images: ['/assets/images/ski/CRICCO-BCA2023-100.jpg'], category: 'Airbags', categorySlug: 'airbags-avalancha', featured: true, inStock: true },
  { id: 3, slug: 'dozer-3d', name: 'Dozer 3D', nameEs: 'Pala de Rescate Dozer 3D', description: '', descriptionEs: 'Pala de aluminio ultra resistente y liviana con diseno 3D.', price: 28000, images: ['/assets/images/ski/KELLER_BCA_2023_00126.jpg'], category: 'Palas de Rescate', categorySlug: 'palas-rescate', featured: false, inStock: true },
  { id: 4, slug: 'stealth-270', name: 'Stealth 270', nameEs: 'Sonda de Carbono Stealth 270', description: '', descriptionEs: 'Sonda de carbono 270cm con plegado rapido para rescate eficiente.', price: 18000, images: ['/assets/images/ski/KELLER_BCA_2023_00204.jpg'], category: 'Sondas de Avalancha', categorySlug: 'sondas-avalancha', featured: false, inStock: true },
  { id: 5, slug: 'bc-link-2', name: 'BC Link 2.0', nameEs: 'Radio BCA BC Link 2.0', description: '', descriptionEs: 'Radio de comunicacion para backcountry. Alcance hasta 2.4km, resistente al agua.', price: 42000, images: ['/assets/images/ski/KELLER_BCA_2023_00210.jpg'], category: 'Radios', categorySlug: 'radios-bc-link', featured: true, inStock: true },
  { id: 6, slug: 'stash-20', name: 'Stash 20', nameEs: 'Mochila Stash 20L', description: '', descriptionEs: 'Mochila ligera de 20L para salidas de dia al backcountry.', price: 35000, images: ['/assets/images/hero/KELLER_BCA_2023_00239.jpg'], category: 'Mochilas', categorySlug: 'mochilas-stash', featured: false, inStock: true },
  { id: 7, slug: 'kit-rescate-basico', name: 'Rescue Kit', nameEs: 'Kit de Rescate BCA Basico', description: '', descriptionEs: 'Kit completo con baliza, pala y sonda BCA para salir con seguridad.', price: 115000, images: ['/assets/images/hero/KELLER_BCA_2023_00239.jpg'], category: 'Kits', categorySlug: 'kits-rescate', featured: true, inStock: true },
  { id: 8, slug: 'mtnpro-vest', name: 'MtnPro Vest', nameEs: 'Chaleco Airbag MtnPro Motonieve', description: '', descriptionEs: 'Chaleco de seguridad con airbag integrado para motonieve.', price: 180000, images: ['/assets/images/hero/BCA_BB-434.jpg'], category: 'Motonieve', categorySlug: 'motonieve', featured: false, inStock: false },
]

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const addItem = useCartStore((s) => s.addItem)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    fetch('/api/products/' + slug)
      .then((r) => r.json())
      .then((p) => { setProduct(p); setLoading(false) })
      .catch(() => {
        setProduct(MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null)
        setLoading(false)
      })
  }, [slug])

  if (loading) return (
    <div className="bg-[#0d0d0d] min-h-screen flex items-center justify-center">
      <div className="text-gray-400">Cargando...</div>
    </div>
  )

  if (!product) return (
    <div className="bg-[#0d0d0d] min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-white text-xl">Producto no encontrado.</p>
      <button onClick={() => navigate('/productos')} className="text-[#E8001D] hover:underline">Volver a productos</button>
    </div>
  )

  const related = MOCK_PRODUCTS.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, 3)

  return (
    <div className="bg-[#0d0d0d] min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white text-sm mb-8 flex items-center gap-2 transition-colors">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[activeImage] ?? '/assets/images/hero/12_KELLER_BCA_2023_00238.jpg'}
                alt={product.nameEs}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={"w-20 h-20 rounded overflow-hidden border-2 transition-colors " + (activeImage === idx ? "border-[#E8001D]" : "border-gray-700")}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <nav className="flex items-center gap-2 text-sm text-gray-400 mb-4">
              <a href="/productos" className="hover:text-white transition-colors">Productos</a>
              <span>/</span>
              <a href={"/categoria/" + product.categorySlug} className="hover:text-white transition-colors">{product.category}</a>
            </nav>
            <h1 className="text-3xl font-bold text-white mb-3">{product.nameEs}</h1>
            <p className="text-4xl font-bold text-white mb-4">
              $ {product.price.toLocaleString('es-AR')}
            </p>
            <span className={"inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6 " + (product.inStock ? "bg-green-900 text-green-300" : "bg-gray-800 text-gray-400")}>
              {product.inStock ? 'En stock' : 'Sin stock'}
            </span>
            <p className="text-gray-300 leading-relaxed mb-8">{product.descriptionEs}</p>
            {product.inStock && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white text-sm">Cantidad:</span>
                <div className="flex items-center border border-gray-700 rounded">
                  <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="px-3 py-2 text-white hover:bg-gray-800 transition-colors">-</button>
                  <span className="px-4 py-2 text-white border-x border-gray-700">{quantity}</span>
                  <button onClick={() => setQuantity((q) => Math.min(10, q + 1))} className="px-3 py-2 text-white hover:bg-gray-800 transition-colors">+</button>
                </div>
              </div>
            )}
            <button
              onClick={() => { addItem(product, quantity); navigate('/carrito') }}
              disabled={!product.inStock}
              className="w-full bg-[#E8001D] text-white py-4 rounded font-bold text-lg hover:bg-red-700 transition-colors disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {product.inStock ? 'Agregar al carrito' : 'Sin stock'}
            </button>
          </div>
        </div>
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">También te puede interesar</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
