import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../lib/api'
import { useAdminStore } from '../../store/adminStore'

export default function AdminLoginPage() {
  const navigate = useNavigate()
  const { setToken, isAuthenticated } = useAdminStore()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/admin')
    }
  }, [isAuthenticated, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/_admin/login', { username, password })
      setToken(res.data.access_token)
      navigate('/admin')
    } catch {
      setError('Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-[#E8001D] font-black text-4xl tracking-tight">BCA</span>
          <p className="text-gray-500 text-sm mt-1 uppercase tracking-widest">Panel de Administración</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-8 space-y-5"
        >
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoFocus
              className="w-full bg-[#0d0d0d] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#E8001D] transition-colors"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#0d0d0d] border border-[#333] rounded-lg px-4 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-[#E8001D] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-[#E8001D] text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E8001D] hover:bg-[#c0001a] disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg transition-colors"
          >
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  )
}
