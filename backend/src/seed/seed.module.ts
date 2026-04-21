import { Module } from '@nestjs/common'
import { SeedService } from './seed.service'
import { CategoriesModule } from '../categories/categories.module'
import { ProductsModule } from '../products/products.module'
import { EducationModule } from '../education/education.module'

@Module({
  imports: [CategoriesModule, ProductsModule, EducationModule],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
