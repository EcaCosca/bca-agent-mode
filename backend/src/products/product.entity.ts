import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ unique: true })
  slug: string

  @Column({ nullable: true })
  name: string

  @Column()
  nameEs: string

  @Column({ type: 'text', nullable: true })
  description: string

  @Column({ type: 'text', nullable: true })
  descriptionEs: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number

  @Column({ type: 'simple-json', nullable: true })
  images: string[]

  @Column()
  categorySlug: string

  @Column({ default: false })
  featured: boolean

  @Column({ default: true })
  inStock: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date
}
