import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { useCartStore } from '../../store/cartStore'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { t } = useTranslation()
  const addItem = useCartStore((s) => s.addItem)

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden group hover:ring-1 hover:ring-[#E8001D] transition">
      <Link to={`/productos/${product.slug}`}>
        <div className="aspect-square overflow-hidden bg-gray-800">
          <img
            src={product.images[0] || '/assets/images/placeholder.jpg'}
            alt={product.nameEs}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-[#E8001D] text-xs uppercase tracking-widest font-medium">{product.category}</span>
        <Link to={`/productos/${product.slug}`}>
          <h3 className="text-white font-semibold mt-1 mb-2 hover:text-[#E8001D] transition-colors line-clamp-2">{product.nameEs}</h3>
        </Link>
        <p className="text-white font-bold text-lg mb-4">${product.price.toLocaleString('es-AR')}</p>
        {product.inStock ? (
          <button
            onClick={() => addItem(product)}
            className="w-full bg-[#E8001D] text-white py-2 px-4 rounded font-semibold hover:bg-red-700 transition-colors text-sm"
          >
            {t('products.add_to_cart')}
          </button>
        ) : (
          <div className="w-full bg-gray-700 text-gray-400 py-2 px-4 rounded text-center text-sm">
            {t('products.out_of_stock')}
          </div>
        )}
      </div>
    </div>
  )
}
