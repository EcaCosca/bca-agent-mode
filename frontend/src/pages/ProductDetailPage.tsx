import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ProductCard from '../components/products/ProductCard'
import { getProduct } from '../lib/api'
import { useCartStore } from '../store/cartStore'
import type { Product } from '../types'

const MOCK_PRODUCTS: Product[] = [
  { id: 1, slug: 'tracker4', name: 'BCA Tracker4', nameEs: 'BCA Tracker4™', description: 'Advanced avalanche beacon', descriptionEs: 'Baliza de alud de alta performance con tecnología de triple antena. El Tracker4 es el estándar de la industria para la búsqueda de víctimas de avalancha, con algoritmos de señal mejorados y pantalla de alta resolución.', price: 580000, images: ['/assets/images/hero/hero-1.jpg', '/assets/images/hero/hero-2.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: true, inStock: true },
  { id: 2, slug: 'tracker-s', name: 'BCA Tracker S', nameEs: 'BCA Tracker S™', description: 'Entry level avalanche beacon', descriptionEs: 'Baliza de alud de entrada, ideal para principiantes que se inician en el backcountry. Interfaz intuitiva y tecnología de triple antena.', price: 420000, images: ['/assets/images/hero/hero-2.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: false, inStock: true },
  { id: 3, slug: 'float-22', name: 'Float 22', nameEs: 'Float™ 22', description: 'Airbag backpack 22L', descriptionEs: 'Mochila airbag 22L para mayor seguridad en avalanchas. Sistema de airbag de doble bolsa que aumenta significativamente las chances de supervivencia en una avalancha.', price: 1250000, images: ['/assets/images/ski/ski-1.jpg'], category: 'Airbags de Avalancha', categorySlug: 'airbags-avalancha', featured: true, inStock: true },
  { id: 4, slug: 'float-32', name: 'Float 32', nameEs: 'Float™ 32', description: 'Airbag backpack 32L', descriptionEs: 'Mochila airbag 32L con mayor capacidad de almacenamiento. Ideal para travesías de varios días en el backcountry.', price: 1450000, images: ['/assets/images/ski/ski-2.jpg'], category: 'Airbags de Avalancha', categorySlug: 'airbags-avalancha', featured: false, inStock: true },
  { id: 5, slug: 'dozer-3d', name: 'Dozer 3D', nameEs: 'Dozer™ 3D', description: 'Avalanche shovel', descriptionEs: 'Pala de rescate de aluminio ultra resistente y liviana. Diseño ergonómico y hoja 3D para mayor eficiencia en el desenterramiento de víctimas.', price: 95000, images: ['/assets/images/ski/ski-3.jpg'], category: 'Palas de Rescate', categorySlug: 'palas-rescate', featured: true, inStock: true },
  { id: 6, slug: 'stealth-270', name: 'Stealth 270', nameEs: 'Stealth™ 270', description: 'Carbon avalanche probe', descriptionEs: 'Sonda de carbono 270cm, plegado rápido para rescate eficiente. Material de carbono para máxima rigidez con mínimo peso.', price: 65000, images: ['/assets/images/hero/hero-3.jpg'], category: 'Sondas de Avalancha', categorySlug: 'sondas-avalancha', featured: true, inStock: true },
  { id: 7, slug: 'bc-link-20', name: 'BC Link 2.0', nameEs: 'BC Link™ 2.0', description: 'Two-way radio', descriptionEs: 'Radio bidireccional de largo alcance para comunicación en el backcountry. Resistente al agua y al frío extremo.', price: 180000, images: ['/assets/images/sled/sled-1.jpg'], category: 'Radios BC Link™', categorySlug: 'radios-bc-link', featured: false, inStock: true },
  { id: 8, slug: 'mtnpro-vest', name: 'MtnPro Vest', nameEs: 'MtnPro™ Vest', description: 'Snowmobile safety vest', descriptionEs: 'Chaleco de seguridad para motonieve con airbag integrado. Diseñado específicamente para las necesidades del motoniever.', price: 320000, images: ['/assets/images/sled/sled-2.jpg'], category: 'Equipamiento Motonieve', categorySlug: 'equipamiento-motonieve', featured: false, inStock: false },
]

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const addItem = useCartStore((s) => s.addItem)

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!slug) return
    setLoading(true)
    getProduct(slug)
      .then((p) => { setProduct(p); setLoading(false) })
      .catch(() => {
        const found = MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null
        setProduct(found)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="bg-[#0d0d0d] min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="bg-[#0d0d0d] min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-white text-xl">Producto no encontrado.</p>
        <button onClick={() => navigate('/productos')} className="text-[#E8001D] hover:underline">
          Volver a productos
        </button>
      </div>
    )
  }

  const related = MOCK_PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 3)

  const handleAddToCart = () => {
    addItem(product, quantity)
    navigate('/carrito')
  }

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
          {/* Images */}
          <div>
            <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden mb-4">
              <img
                src={product.images[activeImage] || '/assets/images/placeholder.jpg'}
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
                    className={`w-20 h-20 rounded overflow-hidden border-2 transition-colors ${activeImage === idx ? 'border-[#E8001D]' : 'border-gray-700'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-[#E8001D] text-xs uppercase tracking-widest font-medium">{product.category}</span>
            <h1 className="text-3xl font-bold text-white mt-2 mb-4">{product.nameEs}</h1>
            <p className="text-4xl font-bold text-white mb-6">${product.price.toLocaleString('es-AR')}</p>

            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-6 ${product.inStock ? 'bg-green-900 text-green-300' : 'bg-gray-800 text-gray-400'}`}>
              {product.inStock ? t('products.in_stock') : t('products.out_of_stock')}
            </span>

            <p className="text-gray-300 leading-relaxed mb-8">{product.descriptionEs}</p>

            {product.inStock && (
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white text-sm">{t('cart.quantity')}:</span>
                <div className="flex items-center border border-gray-700 rounded">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-4 py-2 text-white border-x border-gray-700">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-white hover:bg-gray-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-[#E8001D] text-white py-4 rounded font-bold text-lg hover:bg-red-700 transition-colors disabled:bg-gray-700 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              {product.inStock ? t('products.add_to_cart') : t('products.out_of_stock')}
            </button>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-white mb-8">Productos relacionados</h2>
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
