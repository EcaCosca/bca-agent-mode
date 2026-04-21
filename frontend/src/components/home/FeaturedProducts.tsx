import type { Product } from '../../types'
import ProductCard from '../products/ProductCard'

interface Props {
  products: Product[]
}

export default function FeaturedProducts({ products }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}
