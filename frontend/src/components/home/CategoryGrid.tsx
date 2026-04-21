import { Link } from 'react-router-dom'
import type { Category } from '../../types'

interface Props {
  categories: Category[]
}

export default function CategoryGrid({ categories }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/categoria/${category.slug}`}
          className="relative overflow-hidden rounded-lg aspect-square cursor-pointer group block"
        >
          {category.image ? (
            <img
              src={category.image}
              alt={category.nameEs}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gray-800" />
          )}
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white font-semibold text-sm md:text-base">{category.nameEs}</p>
          </div>
        </Link>
      ))}
    </div>
  )
}
