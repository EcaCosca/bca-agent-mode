import { useState, useEffect } from 'react'
import HeroSection from '../components/home/HeroSection'
import CategoryGrid from '../components/home/CategoryGrid'
import FeaturedProducts from '../components/home/FeaturedProducts'
import EducationBanner from '../components/home/EducationBanner'
import { getCategories, getProducts } from '../lib/api'
import type { Category, Product } from '../types'
import { useTranslation } from 'react-i18next'

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'Avalanche Beacons', nameEs: 'Balizas de Alud', slug: 'balizas-alud', description: '', image: '/assets/images/hero/hero-1.jpg' },
  { id: 2, name: 'Airbag Packs', nameEs: 'Airbags de Avalancha', slug: 'airbags-avalancha', description: '', image: '/assets/images/ski/ski-1.jpg' },
  { id: 3, name: 'Shovels', nameEs: 'Palas de Rescate', slug: 'palas-rescate', description: '', image: '/assets/images/ski/ski-2.jpg' },
  { id: 4, name: 'Probes', nameEs: 'Sondas de Avalancha', slug: 'sondas-avalancha', description: '', image: '/assets/images/hero/hero-2.jpg' },
  { id: 5, name: 'Radios', nameEs: 'Radios BC Link™', slug: 'radios-bc-link', description: '', image: '/assets/images/hero/hero-3.jpg' },
  { id: 6, name: 'Packs', nameEs: 'Mochilas Stash™', slug: 'mochilas-stash', description: '', image: '/assets/images/ski/ski-3.jpg' },
  { id: 7, name: 'Rescue Kits', nameEs: 'Kits de Rescate', slug: 'kits-rescate', description: '', image: '/assets/images/sled/sled-1.jpg' },
  { id: 8, name: 'Snowmobile', nameEs: 'Equipamiento Motonieve', slug: 'equipamiento-motonieve', description: '', image: '/assets/images/sled/sled-2.jpg' },
]

const MOCK_PRODUCTS: Product[] = [
  { id: 1, slug: 'tracker4', name: 'BCA Tracker4', nameEs: 'BCA Tracker4™', description: 'Advanced avalanche beacon', descriptionEs: 'Baliza de alud de alta performance con tecnología de triple antena.', price: 580000, images: ['/assets/images/hero/hero-1.jpg'], category: 'Balizas de Alud', categorySlug: 'balizas-alud', featured: true, inStock: true },
  { id: 2, slug: 'float-22', name: 'Float 22', nameEs: 'Float™ 22', description: 'Airbag backpack 22L', descriptionEs: 'Mochila airbag 22L para mayor seguridad en avalanchas.', price: 1250000, images: ['/assets/images/ski/ski-1.jpg'], category: 'Airbags de Avalancha', categorySlug: 'airbags-avalancha', featured: true, inStock: true },
  { id: 3, slug: 'dozer-3d', name: 'Dozer 3D', nameEs: 'Dozer™ 3D', description: 'Avalanche shovel', descriptionEs: 'Pala de rescate de aluminio ultra resistente y liviana.', price: 95000, images: ['/assets/images/ski/ski-2.jpg'], category: 'Palas de Rescate', categorySlug: 'palas-rescate', featured: true, inStock: true },
  { id: 4, slug: 'stealth-270', name: 'Stealth 270', nameEs: 'Stealth™ 270', description: 'Carbon avalanche probe', descriptionEs: 'Sonda de carbono 270cm, plegado rápido para rescate eficiente.', price: 65000, images: ['/assets/images/hero/hero-2.jpg'], category: 'Sondas de Avalancha', categorySlug: 'sondas-avalancha', featured: true, inStock: true },
]

export default function HomePage() {
  const { t } = useTranslation()
  const [categories, setCategories] = useState<Category[]>(MOCK_CATEGORIES)
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>(MOCK_PRODUCTS)

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories(MOCK_CATEGORIES))
    getProducts({ category: 'featured' })
      .then((p) => setFeaturedProducts(p.filter((x) => x.featured).slice(0, 4)))
      .catch(() => setFeaturedProducts(MOCK_PRODUCTS))
  }, [])

  return (
    <>
      <HeroSection />

      <section className="bg-[#0d0d0d] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-2">{t('home.categories_title')}</h2>
          <p className="text-gray-400 mb-10">{t('home.categories_subtitle')}</p>
          <CategoryGrid categories={categories} />
        </div>
      </section>

      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10">{t('home.featured_title')}</h2>
          <FeaturedProducts products={featuredProducts} />
        </div>
      </section>

      <EducationBanner />
    </>
  )
}
