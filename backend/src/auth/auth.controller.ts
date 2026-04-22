import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { AuthService } from './auth.service'
import { IsString } from 'class-validator'

class LoginDto {
  @IsString()
  username: string

  @IsString()
  password: string
}

@Controller('_admin')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password)
  }
}
