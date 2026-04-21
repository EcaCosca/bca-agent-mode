import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateCategoryDto {
  @IsString()
  slug: string

  @IsString()
  name: string

  @IsString()
  nameEs: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  sortOrder?: number
}
