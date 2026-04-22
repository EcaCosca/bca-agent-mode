import { useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { useAdminStore } from '../../store/adminStore'

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const navigate = useNavigate()
  const { isAuthenticated, clearToken } = useAdminStore()

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/admin/login')
    }
  }, [isAuthenticated, navigate])

  function handleLogout() {
    clearToken()
    navigate('/admin/login')
  }

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `block px-4 py-2 rounded text-sm font-medium transition-colors ${
      isActive
        ? 'bg-[#E8001D] text-white'
        : 'text-gray-400 hover:text-white hover:bg-[#222]'
    }`

  return (
    <div className="flex min-h-screen bg-[#0d0d0d] text-white">
      {/* Sidebar */}
      <aside className="w-56 bg-[#111111] flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-[#222]">
          <span className="text-[#E8001D] font-black text-2xl tracking-tight">BCA</span>
          <span className="text-[10px] text-gray-500 block -mt-1 uppercase tracking-widest">Admin Panel</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          <NavLink to="/admin" end className={navLinkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/productos" className={navLinkClass}>
            Productos
          </NavLink>
          <NavLink to="/admin/educacion" className={navLinkClass}>
            Educación
          </NavLink>
        </nav>
        <div className="p-3 border-t border-[#222]">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded text-sm text-gray-400 hover:text-white hover:bg-[#222] transition-colors"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-[#111111] border-b border-[#222] px-8 py-4">
          <h1 className="text-lg font-semibold text-white">{title}</h1>
        </header>
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
