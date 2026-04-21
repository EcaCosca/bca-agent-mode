import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('education_posts')
export class EducationPost {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  slug: string

  @Column({ nullable: true })
  title: string

  @Column()
  titleEs: string

  @Column({ type: 'text', nullable: true })
  excerpt: string

  @Column({ type: 'text', nullable: true })
  excerptEs: string

  @Column({ type: 'text', nullable: true })
  content: string

  @Column({ type: 'text', nullable: true })
  contentEs: string

  @Column({ nullable: true })
  image: string

  @Column({ nullable: true, type: 'datetime' })
  publishedAt: Date

  @Column({ default: false })
  featured: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
