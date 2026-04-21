import axios from 'axios'
import type { Product, Category, EducationPost } from '../types'

const api = axios.create({ baseURL: '/api' })

export const getProducts = (params?: { category?: string; search?: string }) =>
  api.get<Product[]>('/products', { params }).then((r) => r.data)

export const getProduct = (slug: string) =>
  api.get<Product>(`/products/${slug}`).then((r) => r.data)

export const getCategories = () =>
  api.get<Category[]>('/categories').then((r) => r.data)

export const getEducationPosts = () =>
  api.get<EducationPost[]>('/education').then((r) => r.data)

export const getEducationPost = (slug: string) =>
  api.get<EducationPost>(`/education/${slug}`).then((r) => r.data)

export default api
