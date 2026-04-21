import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { EducationPost } from './education-post.entity'
import { EducationService } from './education.service'
import { EducationController } from './education.controller'

@Module({
  imports: [TypeOrmModule.forFeature([EducationPost])],
  controllers: [EducationController],
  providers: [EducationService],
  exports: [EducationService],
})
export class EducationModule {}
