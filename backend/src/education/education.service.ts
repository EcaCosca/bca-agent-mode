import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { EducationPost } from './education-post.entity'
import { CreateEducationPostDto } from './dto/create-education-post.dto'
import { UpdateEducationPostDto } from './dto/update-education-post.dto'

@Injectable()
export class EducationService {
  constructor(
    @InjectRepository(EducationPost)
    private readonly repo: Repository<EducationPost>,
  ) {}

  findAll() {
    return this.repo.find({ order: { publishedAt: 'DESC', createdAt: 'DESC' } })
  }

  async findOne(slug: string) {
    const post = await this.repo.findOne({ where: { slug } })
    if (!post) throw new NotFoundException(`Education post "${slug}" not found`)
    return post
  }

  create(dto: CreateEducationPostDto) {
    const post = this.repo.create(dto)
    return this.repo.save(post)
  }

  async update(id: number, dto: UpdateEducationPostDto) {
    const post = await this.repo.findOne({ where: { id } })
    if (!post) throw new NotFoundException(`Education post #${id} not found`)
    Object.assign(post, dto)
    return this.repo.save(post)
  }

  async remove(id: number) {
    const post = await this.repo.findOne({ where: { id } })
    if (!post) throw new NotFoundException(`Education post #${id} not found`)
    return this.repo.remove(post)
  }
}
