import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Category } from './category.entity'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly repo: Repository<Category>,
  ) {}

  findAll() {
    return this.repo.find({ order: { sortOrder: 'ASC', name: 'ASC' } })
  }

  async findOne(slug: string) {
    const category = await this.repo.findOne({ where: { slug } })
    if (!category) throw new NotFoundException(`Category "${slug}" not found`)
    return category
  }

  create(dto: CreateCategoryDto) {
    const category = this.repo.create(dto)
    return this.repo.save(category)
  }

  async update(id: number, dto: UpdateCategoryDto) {
    const category = await this.repo.findOne({ where: { id } })
    if (!category) throw new NotFoundException(`Category #${id} not found`)
    Object.assign(category, dto)
    return this.repo.save(category)
  }

  async remove(id: number) {
    const category = await this.repo.findOne({ where: { id } })
    if (!category) throw new NotFoundException(`Category #${id} not found`)
    return this.repo.remove(category)
  }

  count() {
    return this.repo.count()
  }
}
