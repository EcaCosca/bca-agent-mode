import { IsString, IsOptional, IsBoolean, IsDateString } from 'class-validator'
import { Transform } from 'class-transformer'

export class CreateEducationPostDto {
  @IsString()
  slug: string

  @IsOptional()
  @IsString()
  title?: string

  @IsString()
  titleEs: string

  @IsOptional()
  @IsString()
  excerpt?: string

  @IsOptional()
  @IsString()
  excerptEs?: string

  @IsOptional()
  @IsString()
  content?: string

  @IsOptional()
  @IsString()
  contentEs?: string

  @IsOptional()
  @IsString()
  image?: string

  @IsOptional()
  @IsDateString()
  publishedAt?: string

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true' || value === true)
  featured?: boolean
}
