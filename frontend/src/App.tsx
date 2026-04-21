import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import Layout from './components/layout/Layout'
import HeroSection from './components/home/HeroSection'
import CategoryGrid from './components/home/CategoryGrid'
import FeaturedProducts from './components/home/FeaturedProducts'
import type { Category, Product } from './types'

const mockCategories: Category[] = [
  { id:1, slug:'balizas-alud', nameEs:'Balizas de Alud', name:'Avalanche Beacons', description:'', image:'/assets/images/hero/12_KELLER_BCA_2023_00238.jpg' },
  { id:2, slug:'airbags-avalancha', nameEs:'Airbags de Avalancha', name:'Avalanche Airbags', description:'', image:'/assets/images/ski/CRICCO-BCA2023-100.jpg' },
  { id:3, slug:'palas-rescate', nameEs:'Palas de Rescate', name:'Shovels', description:'', image:'/assets/images/ski/KELLER_BCA_2023_00126.jpg' },
  { id:4, slug:'sondas-avalancha', nameEs:'Sondas de Avalancha', name:'Probes', description:'', image:'/assets/images/ski/KELLER_BCA_2023_00204.jpg' },
  { id:5, slug:'radios-bc-link', nameEs:'Radios BC Link', name:'BC Link Radios', description:'', image:'/assets/images/ski/KELLER_BCA_2023_00210.jpg' },
  { id:6, slug:'mochilas-stash', nameEs:'Mochilas Stash', name:'Stash Packs', description:'', image:'/assets/images/hero/KELLER_BCA_2023_00239.jpg' },
  { id:7, slug:'kits-rescate', nameEs:'Kits de Rescate', name:'Rescue Packages', description:'', image:'/assets/images/hero/CRICCO-BCA2023-125 copy red.jpg' },
  { id:8, slug:'motonieve', nameEs:'Equipamiento Motonieve', name:'Snowmobile', description:'', image:'/assets/images/hero/BCA_BB-434.jpg' },
]

const mockProducts: Product[] = [
  { id:1, slug:'tracker-4', name:'BCA Tracker 4', nameEs:'Baliza BCA Tracker 4', description:'', descriptionEs:'La baliza de alud mas facil de usar.', price:85000, images:['/assets/images/hero/12_KELLER_BCA_2023_00238.jpg'], category:'Balizas', categorySlug:'balizas-alud', featured:true, inStock:true },
  { id:2, slug:'float-32', name:'Float 32', nameEs:'Mochila Airbag BCA Float 32', description:'', descriptionEs:'Sistema de airbag de avalancha.', price:320000, images:['/assets/images/ski/CRICCO-BCA2023-100.jpg'], category:'Airbags', categorySlug:'airbags-avalancha', featured:true, inStock:true },
  { id:5, slug:'bc-link-2', name:'BC Link 2.0', nameEs:'Radio BCA BC Link 2.0', description:'', descriptionEs:'Radio de comunicacion para backcountry.', price:42000, images:['/assets/images/ski/KELLER_BCA_2023_00210.jpg'], category:'Radios', categorySlug:'radios-bc-link', featured:true, inStock:true },
  { id:7, slug:'kit-rescate', name:'Rescue Kit', nameEs:'Kit de Rescate BCA', description:'', descriptionEs:'Kit completo: baliza + pala + sonda.', price:115000, images:['/assets/images/hero/KELLER_BCA_2023_00239.jpg'], category:'Kits', categorySlug:'kits-rescate', featured:true, inStock:true },
]

function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid categories={mockCategories} />
      <FeaturedProducts products={mockProducts} />
      <section className="relative min-h-[400px] flex items-center justify-center overflow-hidden">
        <img src="/assets/images/ski/CRICCO-BCA2023-100.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Educacion y Preparacion</h2>
          <p className="text-white/80 text-lg italic mb-8 max-w-2xl mx-auto">Ir al backcountry no es salir del mundo real, es entrar en el.</p>
          <a href="/educacion" className="bg-[#E8001D] text-white px-8 py-3 font-semibold hover:bg-red-700 transition-colors rounded inline-block">Ver guias de seguridad</a>
        </div>
      </section>
    </>
  )
}

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
            <Route path="*" element={<ComingSoon />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </I18nextProvider>
  )
}
