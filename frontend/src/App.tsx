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

function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-white mb-4">Proximamente</h1>
      <p className="text-gray-400 mb-8">Esta seccion esta en construccion.</p>
      <a href="/" className="bg-[#E8001D] text-white px-6 py-3 rounded font-semibold">Volver al inicio</a>
    </div>
  )
}

export default function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/productos" element={<ProductsPage />} />
            <Route path="/productos/:slug" element={<ProductDetailPage />} />
            <Route path="/categoria/:slug" element={<CategoryPage />} />
            <Route path="/carrito" element={<CartPage />} />
            <Route path="/educacion" element={<EducationPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </I18nextProvider>
  )
}
