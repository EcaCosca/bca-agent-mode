import type { CartItem } from '../types'

export function buildWhatsAppLink(items: CartItem[], phone = '5491100000000'): string {
  const header = 'Hola! Me interesa comprar los siguientes productos de BCA Argentina:\n\n'
  const itemLines = items
    .map((i) => `• ${i.product.nameEs} x${i.quantity} — $${(i.product.price * i.quantity).toLocaleString('es-AR')}`)
    .join('\n')
  const total = items.reduce((s, i) => s + i.product.price * i.quantity, 0)
  const footer = `\n\nTotal: $${total.toLocaleString('es-AR')}\n\nQuedo a la espera. Gracias!`
  const message = encodeURIComponent(header + itemLines + footer)
  return `https://wa.me/${phone}?text=${message}`
}
