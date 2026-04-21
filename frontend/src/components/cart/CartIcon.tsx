import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/cartStore'

export default function CartIcon() {
  const totalItems = useCartStore((s) => s.totalItems())
  return (
    <Link to="/carrito" className="relative text-white hover:text-[#E8001D] transition-colors">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#E8001D] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
