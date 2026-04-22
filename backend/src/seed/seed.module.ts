import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SeedService } from './seed.service'
import { CategoriesModule } from '../categories/categories.module'
import { ProductsModule } from '../products/products.module'
import { EducationModule } from '../education/education.module'
import { User } from '../auth/user.entity'

@Module({
  imports: [CategoriesModule, ProductsModule, EducationModule, TypeOrmModule.forFeature([User])],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
