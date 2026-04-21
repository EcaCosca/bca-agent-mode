import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { useCartStore } from '../../store/cartStore'

interface Props {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const addItem = useCartStore((s) => s.addItem)

  const image = product.images[0] ?? '/assets/images/hero/12_KELLER_BCA_2023_00238.jpg'

  const formattedPrice = product.price.toLocaleString('es-AR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })

  return (
    <div className="bg-[#1a1a1a] rounded-lg overflow-hidden flex flex-col group hover:ring-1 hover:ring-[#E8001D] transition">
      <Link to={`/productos/${product.slug}`} className="block">
        <div className="aspect-square overflow-hidden bg-gray-800">
          <img
            src={image}
            alt={product.nameEs}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-[#E8001D] uppercase tracking-wider font-semibold mb-1">
          {product.category}
        </span>
        <Link to={`/productos/${product.slug}`} className="block flex-1">
          <h3 className="text-white font-semibold text-sm mb-2 hover:text-[#E8001D] transition-colors line-clamp-2">
            {product.nameEs}
          </h3>
        </Link>
        <p className="text-white font-bold text-lg mb-4">
          $ {formattedPrice}
        </p>
        {product.inStock ? (
          <button
            onClick={() => addItem(product)}
            className="w-full bg-black text-white py-2 px-4 font-semibold hover:bg-[#E8001D] transition-colors rounded text-sm border border-white/10"
          >
            Agregar al carrito
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-700 text-gray-400 py-2 px-4 font-semibold rounded text-sm cursor-not-allowed"
          >
            Sin stock
          </button>
        )}
      </div>
    </div>
  )
}
