import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useCartStore } from '../store/cartStore'
import { buildWhatsAppLink } from '../lib/whatsapp'

export default function CartPage() {
  const { t } = useTranslation()
  const { items, removeItem, updateQty, clearCart } = useCartStore()
  const totalPrice = useCartStore((s) => s.totalPrice())

  const handleWhatsApp = () => {
    const link = buildWhatsAppLink(items, '5491100000000')
    window.open(link, '_blank')
  }

  if (items.length === 0) {
    return (
      <div className="bg-[#0d0d0d] min-h-screen flex flex-col items-center justify-center gap-6 px-4">
        <svg className="h-24 w-24 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <h1 className="text-2xl font-bold text-white">{t('cart.title')}</h1>
        <p className="text-gray-400">{t('cart.empty')}</p>
        <Link
          to="/productos"
          className="bg-[#E8001D] text-white px-8 py-3 rounded font-semibold hover:bg-red-700 transition-colors"
        >
          {t('cart.empty_cta')}
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-[#0d0d0d] min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">{t('cart.title')}</h1>
          <button
            onClick={clearCart}
            className="text-gray-500 hover:text-red-400 text-sm transition-colors"
          >
            Vaciar carrito
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.product.id} className="bg-gray-900 rounded-lg p-4 flex gap-4">
                <img
                  src={item.product.images[0] || '/assets/images/placeholder.jpg'}
                  alt={item.product.nameEs}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1 min-w-0">
                  <p className="text-[#E8001D] text-xs uppercase tracking-wide">{item.product.category}</p>
                  <h3 className="text-white font-semibold truncate">{item.product.nameEs}</h3>
                  <p className="text-gray-400 text-sm">${item.product.price.toLocaleString('es-AR')} c/u</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <p className="text-white font-bold">${(item.product.price * item.quantity).toLocaleString('es-AR')}</p>
                  <div className="flex items-center border border-gray-700 rounded">
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                      className="px-2 py-1 text-white hover:bg-gray-800 transition-colors text-sm"
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-white text-sm border-x border-gray-700">{item.quantity}</span>
                    <button
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                      className="px-2 py-1 text-white hover:bg-gray-800 transition-colors text-sm"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.product.id)}
                    className="text-gray-500 hover:text-red-400 text-xs transition-colors"
                  >
                    {t('cart.remove')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-lg p-6 sticky top-24">
              <h2 className="text-white font-bold text-lg mb-6">Resumen del pedido</h2>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-400 truncate pr-4">{item.product.nameEs} x{item.quantity}</span>
                    <span className="text-white whitespace-nowrap">${(item.product.price * item.quantity).toLocaleString('es-AR')}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-700 pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-white font-semibold">{t('cart.subtotal')}</span>
                  <span className="text-white font-bold text-lg">${totalPrice.toLocaleString('es-AR')}</span>
                </div>
              </div>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-green-600 text-white py-4 rounded font-bold flex items-center justify-center gap-3 hover:bg-green-700 transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                {t('cart.whatsapp_cta')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
