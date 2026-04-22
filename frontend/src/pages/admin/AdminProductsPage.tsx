import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../lib/api'
import { useAdminStore } from '../../store/adminStore'

interface Product {
  id: string
  name: string
  nameEs?: string
  slug: string
  price: number
  categorySlug?: string
  category?: string
  inStock: boolean
  featured: boolean
  images?: string[]
  descriptionEs?: string
}

interface ProductFormData {
  name: string
  slug: string
  price: string
  categorySlug: string
  descriptionEs: string
  featured: boolean
  inStock: boolean
  images: string
}

const emptyForm: ProductFormData = {
  name: '',
  slug: '',
  price: '',
  categorySlug: '',
  descriptionEs: '',
  featured: false,
  inStock: true,
  images: '',
}

function getAuthHeader(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default function AdminProductsPage() {
  const { token } = useAdminStore()
  const navigate = useNavigate()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<ProductFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  async function fetchProducts() {
    try {
      const res = await api.get('/products', { headers: getAuthHeader(token) })
      setProducts(Array.isArray(res.data) ? res.data : [])
    } catch (err: unknown) {
      if ((err as { response?: { status?: number } })?.response?.status === 401) {
        navigate('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setFormError('')
    setShowModal(true)
  }

  function openEdit(p: Product) {
    setEditingId(p.id)
    setForm({
      name: p.nameEs ?? p.name ?? '',
      slug: p.slug ?? '',
      price: String(p.price ?? ''),
      categorySlug: p.categorySlug ?? p.category ?? '',
      descriptionEs: p.descriptionEs ?? '',
      featured: p.featured ?? false,
      inStock: p.inStock ?? true,
      images: (p.images ?? []).join(', '),
    })
    setFormError('')
    setShowModal(true)
  }

  async function handleDelete(id: string, name: string) {
    if (!confirm(`¿Eliminar "${name}"?`)) return
    try {
      await api.delete(`/products/${id}`, { headers: getAuthHeader(token) })
      setProducts((prev) => prev.filter((p) => p.id !== id))
    } catch (err: unknown) {
      if ((err as { response?: { status?: number } })?.response?.status === 401) {
        navigate('/admin/login')
      }
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormError('')
    setSaving(true)
    const payload = {
      name: form.name,
      slug: form.slug,
      price: parseFloat(form.price),
      categorySlug: form.categorySlug,
      descriptionEs: form.descriptionEs,
      featured: form.featured,
      inStock: form.inStock,
      images: form.images
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    }
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload, {
          headers: getAuthHeader(token),
        })
      } else {
        await api.post('/products', payload, {
          headers: getAuthHeader(token),
        })
      }
      setShowModal(false)
      await fetchProducts()
    } catch (err: unknown) {
      if ((err as { response?: { status?: number } })?.response?.status === 401) {
        navigate('/admin/login')
      } else {
        setFormError('Error al guardar. Verificá los datos.')
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout title="Productos">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-400 text-sm">{products.length} productos</p>
        <button
          onClick={openCreate}
          className="bg-[#E8001D] hover:bg-[#c0001a] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Nuevo Producto
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Cargando...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Nombre</th>
                <th className="px-4 py-3 text-left">Precio (ARS)</th>
                <th className="px-4 py-3 text-left">Categoría</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-center">Destacado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-3 text-white">{p.nameEs ?? p.name}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {p.price != null
                      ? `$${Number(p.price).toLocaleString('es-AR')}`
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-400">{p.categorySlug ?? p.category ?? '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${p.inStock ? 'bg-green-500' : 'bg-red-500'}`}
                    />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {p.featured ? (
                      <span className="text-[#E8001D] text-xs font-bold">★</span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="bg-[#2a2a2a] hover:bg-[#333] text-gray-300 text-xs px-3 py-1.5 rounded transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.nameEs ?? p.name)}
                      className="bg-[#E8001D]/10 hover:bg-[#E8001D] text-[#E8001D] hover:text-white text-xs px-3 py-1.5 rounded transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                    No hay productos
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a]">
              <h2 className="font-semibold text-white">
                {editingId ? 'Editar Producto' : 'Nuevo Producto'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Field label="Nombre (ES)">
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Slug">
                <input
                  type="text"
                  required
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className={inputClass}
                  placeholder="mi-producto"
                />
              </Field>
              <Field label="Precio (ARS)">
                <input
                  type="number"
                  required
                  min="0"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="Categoría (slug)">
                <input
                  type="text"
                  value={form.categorySlug}
                  onChange={(e) => setForm({ ...form, categorySlug: e.target.value })}
                  className={inputClass}
                  placeholder="proteinas"
                />
              </Field>
              <Field label="Descripción (ES)">
                <textarea
                  rows={3}
                  value={form.descriptionEs}
                  onChange={(e) => setForm({ ...form, descriptionEs: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </Field>
              <Field label="Imágenes (URLs separadas por coma)">
                <input
                  type="text"
                  value={form.images}
                  onChange={(e) => setForm({ ...form, images: e.target.value })}
                  className={inputClass}
                  placeholder="https://..."
                />
              </Field>
              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="accent-[#E8001D]"
                  />
                  Destacado
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.inStock}
                    onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                    className="accent-[#E8001D]"
                  />
                  En Stock
                </label>
              </div>
              {formError && <p className="text-[#E8001D] text-sm">{formError}</p>}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm text-gray-400 hover:text-white bg-[#2a2a2a] hover:bg-[#333] rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 text-sm font-semibold bg-[#E8001D] hover:bg-[#c0001a] disabled:opacity-50 text-white rounded-lg transition-colors"
                >
                  {saving ? 'Guardando...' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}

const inputClass =
  'w-full bg-[#0d0d0d] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#E8001D] transition-colors'

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1.5 uppercase tracking-wider">{label}</label>
      {children}
    </div>
  )
}
