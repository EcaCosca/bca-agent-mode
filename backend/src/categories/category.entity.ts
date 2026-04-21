import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  slug: string

  @Column()
  name: string

  @Column()
  nameEs: string

  @Column({ nullable: true, type: 'text' })
  description: string

  @Column({ nullable: true })
  image: string

  @Column({ default: 0 })
  sortOrder: number

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
