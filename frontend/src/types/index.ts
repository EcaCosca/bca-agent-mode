export interface Product {
  id: number
  slug: string
  name: string
  nameEs: string
  description: string
  descriptionEs: string
  price: number
  images: string[]
  category: string
  categorySlug: string
  featured: boolean
  inStock: boolean
}

export interface Category {
  id: number
  name: string
  nameEs: string
  slug: string
  description: string
  image: string
}

export interface EducationPost {
  id: number
  slug: string
  title: string
  titleEs: string
  excerpt: string
  excerptEs: string
  content: string
  contentEs: string
  image: string
  publishedAt: string
}

export interface CartItem {
  product: Product
  quantity: number
}
