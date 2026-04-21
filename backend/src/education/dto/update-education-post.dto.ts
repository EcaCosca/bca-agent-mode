import { PartialType } from '@nestjs/mapped-types'
import { CreateEducationPostDto } from './create-education-post.dto'

export class UpdateEducationPostDto extends PartialType(CreateEducationPostDto) {}
