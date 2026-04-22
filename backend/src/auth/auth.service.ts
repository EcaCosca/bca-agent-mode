import { Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from './user.entity'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.userRepo.findOne({ where: { username } })
    if (!user) throw new UnauthorizedException('Credenciales inválidas')
    const valid = await bcrypt.compare(password, user.passwordHash)
    if (!valid) throw new UnauthorizedException('Credenciales inválidas')
    const payload = { sub: user.id, username: user.username, role: user.role }
    return { access_token: this.jwtService.sign(payload) }
  }

  async seedUsers() {
    const exists = await this.userRepo.count()
    if (exists > 0) return
    const users = [
      { username: 'nacho', password: '420' },
      { username: 'eca', password: '270' },
    ]
    for (const u of users) {
      const passwordHash = await bcrypt.hash(u.password, 10)
      await this.userRepo.save({ username: u.username, passwordHash, role: 'admin' })
    }
  }
}
