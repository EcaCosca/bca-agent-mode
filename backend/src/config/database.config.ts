import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Product } from '../products/product.entity'
import { Category } from '../categories/category.entity'
import { EducationPost } from '../education/education-post.entity'
import { User } from '../auth/user.entity'

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'better-sqlite3',
  database: process.env.NODE_ENV === 'production' ? '/tmp/bca-argentina.db' : 'bca-argentina.db',
  entities: [Product, Category, EducationPost, User],
  synchronize: true,
}
