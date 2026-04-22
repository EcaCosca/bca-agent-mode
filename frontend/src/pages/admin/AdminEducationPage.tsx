import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../lib/api'
import { useAdminStore } from '../../store/adminStore'

interface EducationPost {
  id: string
  titleEs?: string
  title?: string
  slug: string
  featured: boolean
  publishedAt?: string
  createdAt?: string
  bodyEs?: string
  body?: string
  imageUrl?: string
}

interface PostFormData {
  titleEs: string
  slug: string
  featured: boolean
  publishedAt: string
  bodyEs: string
  imageUrl: string
}

const emptyForm: PostFormData = {
  titleEs: '',
  slug: '',
  featured: false,
  publishedAt: '',
  bodyEs: '',
  imageUrl: '',
}

function getAuthHeader(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default function AdminEducationPage() {
  const { token } = useAdminStore()
  const navigate = useNavigate()
  const [posts, setPosts] = useState<EducationPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState<PostFormData>(emptyForm)
  const [saving, setSaving] = useState(false)
  const [formError, setFormError] = useState('')

  async function fetchPosts() {
    try {
      const res = await api.get('/education', { headers: getAuthHeader(token) })
      setPosts(Array.isArray(res.data) ? res.data : [])
    } catch (err: unknown) {
      if ((err as { response?: { status?: number } })?.response?.status === 401) {
        navigate('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [token]) // eslint-disable-line react-hooks/exhaustive-deps

  function openCreate() {
    setEditingId(null)
    setForm(emptyForm)
    setFormError('')
    setShowModal(true)
  }

  function openEdit(p: EducationPost) {
    setEditingId(p.id)
    setForm({
      titleEs: p.titleEs ?? p.title ?? '',
      slug: p.slug ?? '',
      featured: p.featured ?? false,
      publishedAt: p.publishedAt
        ? new Date(p.publishedAt).toISOString().slice(0, 10)
        : '',
      bodyEs: p.bodyEs ?? p.body ?? '',
      imageUrl: p.imageUrl ?? '',
    })
    setFormError('')
    setShowModal(true)
  }

  async function handleDelete(id: string, title: string) {
    if (!confirm(`¿Eliminar "${title}"?`)) return
    try {
      await api.delete(`/education/${id}`, { headers: getAuthHeader(token) })
      setPosts((prev) => prev.filter((p) => p.id !== id))
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
      titleEs: form.titleEs,
      slug: form.slug,
      featured: form.featured,
      publishedAt: form.publishedAt || undefined,
      bodyEs: form.bodyEs,
      imageUrl: form.imageUrl || undefined,
    }
    try {
      if (editingId) {
        await api.put(`/education/${editingId}`, payload, {
          headers: getAuthHeader(token),
        })
      } else {
        await api.post('/education', payload, {
          headers: getAuthHeader(token),
        })
      }
      setShowModal(false)
      await fetchPosts()
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
    <AdminLayout title="Educación">
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-400 text-sm">{posts.length} posts</p>
        <button
          onClick={openCreate}
          className="bg-[#E8001D] hover:bg-[#c0001a] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          + Nuevo Post
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Cargando...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[#2a2a2a]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1a1a1a] text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-4 py-3 text-left">Título (ES)</th>
                <th className="px-4 py-3 text-left">Slug</th>
                <th className="px-4 py-3 text-center">Destacado</th>
                <th className="px-4 py-3 text-left">Publicado</th>
                <th className="px-4 py-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#222]">
              {posts.map((p) => (
                <tr key={p.id} className="hover:bg-[#1a1a1a] transition-colors">
                  <td className="px-4 py-3 text-white">{p.titleEs ?? p.title}</td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">{p.slug}</td>
                  <td className="px-4 py-3 text-center">
                    {p.featured ? (
                      <span className="text-[#E8001D] text-xs font-bold">★</span>
                    ) : (
                      <span className="text-gray-600">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-400 text-xs">
                    {p.publishedAt
                      ? new Date(p.publishedAt).toLocaleDateString('es-AR')
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-right space-x-2">
                    <button
                      onClick={() => openEdit(p)}
                      className="bg-[#2a2a2a] hover:bg-[#333] text-gray-300 text-xs px-3 py-1.5 rounded transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDelete(p.id, p.titleEs ?? p.title ?? p.id)}
                      className="bg-[#E8001D]/10 hover:bg-[#E8001D] text-[#E8001D] hover:text-white text-xs px-3 py-1.5 rounded transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
              {posts.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-gray-600">
                    No hay posts
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
                {editingId ? 'Editar Post' : 'Nuevo Post'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-white text-xl leading-none"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <Field label="Título (ES)">
                <input
                  type="text"
                  required
                  value={form.titleEs}
                  onChange={(e) => setForm({ ...form, titleEs: e.target.value })}
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
                  placeholder="mi-post"
                />
              </Field>
              <Field label="Fecha de Publicación">
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => setForm({ ...form, publishedAt: e.target.value })}
                  className={inputClass}
                />
              </Field>
              <Field label="URL de Imagen">
                <input
                  type="text"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  className={inputClass}
                  placeholder="https://..."
                />
              </Field>
              <Field label="Contenido (ES)">
                <textarea
                  rows={5}
                  value={form.bodyEs}
                  onChange={(e) => setForm({ ...form, bodyEs: e.target.value })}
                  className={`${inputClass} resize-none`}
                />
              </Field>
              <div>
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                    className="accent-[#E8001D]"
                  />
                  Destacado
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
