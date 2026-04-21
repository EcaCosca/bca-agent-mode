import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Product } from '../products/product.entity'
import { Category } from '../categories/category.entity'
import { EducationPost } from '../education/education-post.entity'

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: 'bca-argentina.db',
  entities: [Product, Category, EducationPost],
  synchronize: process.env.NODE_ENV !== 'production',
}
