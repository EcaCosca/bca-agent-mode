import { useEffect, useState } from 'react'
import AdminLayout from '../../components/admin/AdminLayout'
import api from '../../lib/api'
import { useAdminStore } from '../../store/adminStore'
import { useNavigate } from 'react-router-dom'

function getAuthHeader(token: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export default function AdminDashboardPage() {
  const { token } = useAdminStore()
  const navigate = useNavigate()
  const [productCount, setProductCount] = useState<number | null>(null)
  const [educationCount, setEducationCount] = useState<number | null>(null)

  useEffect(() => {
    async function fetchCounts() {
      try {
        const [products, education] = await Promise.all([
          api.get('/products', { headers: getAuthHeader(token) }),
          api.get('/education', { headers: getAuthHeader(token) }),
        ])
        setProductCount(Array.isArray(products.data) ? products.data.length : 0)
        setEducationCount(Array.isArray(education.data) ? education.data.length : 0)
      } catch (err: unknown) {
        if ((err as { response?: { status?: number } })?.response?.status === 401) {
          navigate('/admin/login')
        }
      }
    }
    fetchCounts()
  }, [token, navigate])

  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
        <SummaryCard
          label="Productos"
          count={productCount}
          href="/admin/productos"
        />
        <SummaryCard
          label="Posts de Educación"
          count={educationCount}
          href="/admin/educacion"
        />
      </div>
    </AdminLayout>
  )
}

function SummaryCard({
  label,
  count,
  href,
}: {
  label: string
  count: number | null
  href: string
}) {
  return (
    <a
      href={href}
      className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#E8001D] transition-colors group"
    >
      <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">{label}</p>
      <p className="text-4xl font-bold text-white group-hover:text-[#E8001D] transition-colors">
        {count === null ? '—' : count}
      </p>
    </a>
  )
}
