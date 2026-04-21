import { useEffect, useState } from 'react'
import HeroSection from '../components/home/HeroSection'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import EducationBanner from '../components/home/EducationBanner'
import type { Category, Product } from '../types'

const mockCategories: Category[] = [
  { id: 1, slug: 'balizas-alud', nameEs: 'Balizas de Alud', name: 'Avalanche Beacons', description: '', image: '/assets/images/hero/12_KELLER_BCA_2023_00238.jpg' },
  { id: 2, slug: 'airbags-avalancha', nameEs: 'Airbags de Avalancha', name: 'Avalanche Airbags', description: '', image: '/assets/images/ski/CRICCO-BCA2023-100.jpg' },
  { id: 3, slug: 'palas-rescate', nameEs: 'Palas de Rescate', name: 'Shovels', description: '', image: '/assets/images/ski/KELLER_BCA_2023_00126.jpg' },
  { id: 4, slug: 'sondas-avalancha', nameEs: 'Sondas de Avalancha', name: 'Probes', description: '', image: '/assets/images/ski/KELLER_BCA_2023_00204.jpg' },
  { id: 5, slug: 'radios-bc-link', nameEs: 'Radios BC Link', name: 'BC Link Radios', description: '', image: '/assets/images/ski/KELLER_BCA_2023_00210.jpg' },
  { id: 6, slug: 'mochilas-stash', nameEs: 'Mochilas Stash', name: 'Stash Packs', description: '', image: '/assets/images/hero/KELLER_BCA_2023_00239.jpg' },
  { id: 7, slug: 'kits-rescate', nameEs: 'Kits de Rescate', name: 'Rescue Packages', description: '', image: '/assets/images/hero/CRICCO-BCA2023-297 red copy.jpg' },
  { id: 8, slug: 'motonieve', nameEs: 'Equipamiento Motonieve', name: 'Snowmobile', description: '', image: '/assets/images/hero/BCA_BB-434.jpg' },
]

const mockProducts: Product[] = [
  { id: 1, slug: 'tracker-4', name: 'BCA Tracker 4', nameEs: 'Baliza BCA Tracker 4', description: '', descriptionEs: 'La baliza de alud mas facil de usar del mundo.', price: 85000, images: ['/assets/images/hero/12_KELLER_BCA_2023_00238.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: true, inStock: true },
  { id: 2, slug: 'float-32', name: 'Float 32', nameEs: 'Mochila Airbag BCA Float 32', description: '', descriptionEs: 'Sistema de airbag de avalancha.', price: 320000, images: ['/assets/images/ski/CRICCO-BCA2023-100.jpg'], category: 'Airbags', categorySlug: 'airbags-avalancha', featured: true, inStock: true },
  { id: 5, slug: 'bc-link-2', name: 'BC Link 2.0', nameEs: 'Radio BCA BC Link 2.0', description: '', descriptionEs: 'Radio de comunicacion para backcountry.', price: 42000, images: ['/assets/images/ski/KELLER_BCA_2023_00210.jpg'], category: 'Radios', categorySlug: 'radios-bc-link', featured: true, inStock: true },
  { id: 7, slug: 'kit-rescate-basico', name: 'Rescue Kit', nameEs: 'Kit de Rescate BCA Basico', description: '', descriptionEs: 'Kit completo baliza + pala + sonda.', price: 115000, images: ['/assets/images/hero/KELLER_BCA_2023_00239.jpg'], category: 'Kits', categorySlug: 'kits-rescate', featured: true, inStock: true },
]

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(mockProducts)

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then(setCategories)
      .catch(() => setCategories(mockCategories))

    fetch('/api/products?featured=true')
      .then((r) => r.json())
      .then(setFeaturedProducts)
      .catch(() => setFeaturedProducts(mockProducts))
  }, [])

  return (
    <>
      <HeroSection />
      <section className="bg-[#0d0d0d] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <CategoryGrid categories={categories} />
        </div>
      </section>
      <section className="bg-[#111] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10">Productos Destacados</h2>
          <FeaturedProducts products={featuredProducts} />
        </div>
      </section>
      <EducationBanner />
    </>
  )
}
