import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common'
import { EducationService } from './education.service'
import { CreateEducationPostDto } from './dto/create-education-post.dto'
import { UpdateEducationPostDto } from './dto/update-education-post.dto'

@Controller('education')
export class EducationController {
  constructor(private readonly educationService: EducationService) {}

  @Get()
  findAll() {
    return this.educationService.findAll()
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.educationService.findOne(slug)
  }

  @Post()
  create(@Body() dto: CreateEducationPostDto) {
    return this.educationService.create(dto)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateEducationPostDto) {
    return this.educationService.update(id, dto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.educationService.remove(id)
  }
}
