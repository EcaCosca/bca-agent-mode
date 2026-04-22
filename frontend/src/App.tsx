import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import EducationPage from './pages/EducationPage'
import AboutPage from './pages/AboutPage'
import CategoryPage from './pages/CategoryPage'
import AdminLoginPage from './pages/admin/AdminLoginPage'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminProductsPage from './pages/admin/AdminProductsPage'
import AdminEducationPage from './pages/admin/AdminEducationPage'

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Routes>
          {/* Admin routes — own layout, no public Layout wrapper */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin" element={<AdminDashboardPage />} />
          <Route path="/admin/productos" element={<AdminProductsPage />} />
          <Route path="/admin/educacion" element={<AdminEducationPage />} />

          {/* Public routes — wrapped in Layout */}
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/productos" element={<ProductsPage />} />
                  <Route path="/productos/:slug" element={<ProductDetailPage />} />
                  <Route path="/categoria/:slug" element={<CategoryPage />} />
                  <Route path="/carrito" element={<CartPage />} />
                  <Route path="/educacion" element={<EducationPage />} />
                  <Route path="/nosotros" element={<AboutPage />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </I18nextProvider>
  )
}
