import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.setGlobalPrefix('api')
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://frontend-two-gamma-54.vercel.app',
      'https://backcountryaccess.com.ar',
    ],
  })
  const port = process.env.PORT ?? 3000
  await app.listen(port)
  console.log(`BCA Argentina API running on port ${port}`)
}
bootstrap()
