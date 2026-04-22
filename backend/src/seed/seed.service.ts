import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CategoriesService } from '../categories/categories.service'
import { ProductsService } from '../products/products.service'
import { EducationService } from '../education/education.service'
import { User } from '../auth/user.entity'
import * as bcrypt from 'bcrypt'

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name)

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
    private readonly educationService: EducationService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async seed() {
    await this.seedUsers()

    const count = await this.categoriesService.count()
    if (count > 0) {
      this.logger.log('Database already seeded, skipping.')
      return
    }

    this.logger.log('Seeding database...')

    const categories = [
      { slug: 'balizas-alud', name: 'Avalanche Beacons', nameEs: 'Balizas de Alud', image: '/assets/images/hero/12_KELLER_BCA_2023_00238.jpg', sortOrder: 1 },
      { slug: 'airbags-avalancha', name: 'Avalanche Airbags', nameEs: 'Airbags de Avalancha', image: '/assets/images/ski/CRICCO-BCA2023-100.jpg', sortOrder: 2 },
      { slug: 'palas-rescate', name: 'Avalanche Shovels', nameEs: 'Palas de Rescate', image: '/assets/images/ski/KELLER_BCA_2023_00126.jpg', sortOrder: 3 },
      { slug: 'sondas-avalancha', name: 'Avalanche Probes', nameEs: 'Sondas de Avalancha', image: '/assets/images/ski/KELLER_BCA_2023_00204.jpg', sortOrder: 4 },
      { slug: 'radios-bc-link', name: 'BC Link Radios', nameEs: 'Radios BC Link™', image: '/assets/images/ski/KELLER_BCA_2023_00210.jpg', sortOrder: 5 },
      { slug: 'mochilas-stash', name: 'Stash Packs', nameEs: 'Mochilas Stash™', image: '/assets/images/hero/KELLER_BCA_2023_00239.jpg', sortOrder: 6 },
      { slug: 'kits-rescate', name: 'Rescue Packages', nameEs: 'Kits de Rescate', image: '/assets/images/hero/CRICCO-BCA2023-297 red copy.jpg', sortOrder: 7 },
      { slug: 'motonieve', name: 'Snowmobile Gear', nameEs: 'Equipamiento Motonieve', image: '/assets/images/sled/BCA_BB-1005.jpg', sortOrder: 8 },
    ]

    for (const cat of categories) {
      await this.categoriesService.create(cat)
    }
    this.logger.log(`Seeded ${categories.length} categories.`)

    const products = [
      {
        slug: 'tracker-4',
        name: 'BCA Tracker™ 4 Beacon',
        nameEs: 'Baliza BCA Tracker™ 4',
        price: 85000,
        categorySlug: 'balizas-alud',
        featured: true,
        descriptionEs: 'La baliza de alud más fácil de usar del mundo. Triple antena, búsqueda digital avanzada.',
        images: [],
        inStock: true,
      },
      {
        slug: 'float-32',
        name: 'BCA Float™ 32 Airbag Pack',
        nameEs: 'Mochila Airbag BCA Float™ 32',
        price: 320000,
        categorySlug: 'airbags-avalancha',
        featured: true,
        descriptionEs: 'Sistema de airbag de avalancha que te mantiene en la superficie. 32 litros de capacidad.',
        images: [],
        inStock: true,
      },
      {
        slug: 'dozer-3d',
        name: 'BCA Dozer™ 3D Shovel',
        nameEs: 'Pala BCA Dozer™ 3D',
        price: 28000,
        categorySlug: 'palas-rescate',
        featured: false,
        descriptionEs: 'Pala de rescate de avalancha ultraligera con hoja de aluminio reforzado.',
        images: [],
        inStock: true,
      },
      {
        slug: 'stealth-270',
        name: 'BCA Stealth™ 270 Probe',
        nameEs: 'Sonda BCA Stealth™ 270',
        price: 18000,
        categorySlug: 'sondas-avalancha',
        featured: false,
        descriptionEs: 'Sonda de avalancha de carbono, 270cm, ultraligera y rígida.',
        images: [],
        inStock: true,
      },
      {
        slug: 'bc-link-2',
        name: 'BCA BC Link™ 2.0 Radio',
        nameEs: 'Radio BCA BC Link™ 2.0',
        price: 42000,
        categorySlug: 'radios-bc-link',
        featured: true,
        descriptionEs: 'Radio de comunicación para backcountry con alcance de hasta 3km.',
        images: [],
        inStock: true,
      },
      {
        slug: 'stash-30',
        name: 'BCA Stash™ 30 Pack',
        nameEs: 'Mochila BCA Stash™ 30',
        price: 58000,
        categorySlug: 'mochilas-stash',
        featured: false,
        descriptionEs: 'Mochila técnica de 30 litros para ski touring y splitboard.',
        images: [],
        inStock: true,
      },
      {
        slug: 'kit-rescate-basico',
        name: 'BCA Basic Rescue Kit',
        nameEs: 'Kit de Rescate BCA Básico',
        price: 115000,
        categorySlug: 'kits-rescate',
        featured: true,
        descriptionEs: 'Kit completo: baliza Tracker 4 + pala Dozer + sonda Stealth. Todo lo que necesitás.',
        images: [],
        inStock: true,
      },
      {
        slug: 'mtnpro-kit',
        name: 'BCA MtnPro™ Snowmobile Kit',
        nameEs: 'Kit MtnPro™ para Motonieve',
        price: 95000,
        categorySlug: 'motonieve',
        featured: false,
        descriptionEs: 'Equipamiento de seguridad avalancha específico para motonieves.',
        images: [],
        inStock: true,
      },
    ]

    for (const product of products) {
      await this.productsService.create(product)
    }
    this.logger.log(`Seeded ${products.length} products.`)

    const educationPosts = [
      {
        slug: 'como-usar-baliza-alud',
        title: 'How to Use an Avalanche Beacon',
        titleEs: 'Cómo usar una baliza de alud',
        excerpt: 'Step-by-step guide to correctly using a BCA Tracker beacon in an avalanche situation.',
        excerptEs: 'Guía paso a paso para usar correctamente una baliza BCA Tracker en caso de avalancha.',
        featured: true,
        publishedAt: new Date('2024-06-01').toISOString(),
      },
      {
        slug: 'preparacion-backcountry',
        title: 'Backcountry Preparation',
        titleEs: 'Preparación antes de salir al backcountry',
        excerpt: 'Everything you need to know before your first backcountry outing.',
        excerptEs: 'Todo lo que necesitás saber antes de tu primera salida al backcountry.',
        featured: false,
        publishedAt: new Date('2024-06-15').toISOString(),
      },
      {
        slug: 'tecnicas-rescate-avalancha',
        title: 'Avalanche Rescue Techniques',
        titleEs: 'Técnicas de rescate en avalancha',
        excerpt: 'How to organize and execute an effective avalanche rescue with your group.',
        excerptEs: 'Cómo organizar y ejecutar un rescate de avalancha efectivo con tu grupo.',
        featured: false,
        publishedAt: new Date('2024-07-01').toISOString(),
      },
    ]

    for (const post of educationPosts) {
      await this.educationService.create(post as any)
    }
    this.logger.log(`Seeded ${educationPosts.length} education posts.`)
    this.logger.log('Database seeding complete.')

    await this.seedUsers()
  }

  async seedUsers() {
    const count = await this.userRepo.count()
    if (count > 0) {
      this.logger.log('Admin users already seeded, skipping.')
      return
    }
    const users = [
      { username: 'nacho', password: '420' },
      { username: 'eca', password: '270' },
    ]
    for (const u of users) {
      const passwordHash = await bcrypt.hash(u.password, 10)
      await this.userRepo.save(this.userRepo.create({ username: u.username, passwordHash, role: 'admin' }))
    }
    this.logger.log('Admin users seeded: nacho, eca')
  }
}
