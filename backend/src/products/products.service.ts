import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly repo: Repository<Product>,
  ) {}

  findAll(query: { category?: string; search?: string; featured?: string }) {
    const qb = this.repo.createQueryBuilder('product')

    if (query.category) {
      qb.andWhere('product.categorySlug = :category', { category: query.category })
    }

    if (query.search) {
      qb.andWhere(
        '(product.nameEs LIKE :search OR product.name LIKE :search OR product.descriptionEs LIKE :search)',
        { search: `%${query.search}%` },
      )
    }

    if (query.featured === 'true' || query.featured === '1') {
      qb.andWhere('product.featured = :featured', { featured: true })
    }

    return qb.orderBy('product.createdAt', 'DESC').getMany()
  }

  async findOne(slug: string) {
    const product = await this.repo.findOne({ where: { slug } })
    if (!product) throw new NotFoundException(`Product "${slug}" not found`)
    return product
  }

  create(dto: CreateProductDto) {
    const product = this.repo.create(dto)
    return this.repo.save(product)
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.repo.findOne({ where: { id } })
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    Object.assign(product, dto)
    return this.repo.save(product)
  }

  async remove(id: number) {
    const product = await this.repo.findOne({ where: { id } })
    if (!product) throw new NotFoundException(`Product #${id} not found`)
    return this.repo.remove(product)
  }
}
