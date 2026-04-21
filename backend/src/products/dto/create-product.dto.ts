import { IsString, IsOptional, IsNumber, IsBoolean, IsArray } from 'class-validator'
import { Transform, Type } from 'class-transformer'

export class CreateProductDto {
  @IsString()
  slug: string

  @IsOptional()
  @IsString()
  name?: string

  @IsString()
  nameEs: string

  @IsOptional()
  @IsString()
  description?: string

  @IsOptional()
  @IsString()
  descriptionEs?: string

  @IsNumber()
  @Type(() => Number)
  price: number

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  images?: string[]

  @IsString()
  categorySlug: string

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  featured?: boolean

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  inStock?: boolean
}
