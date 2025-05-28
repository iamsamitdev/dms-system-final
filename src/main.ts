import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import * as hbs from 'hbs'
import { join } from 'path'
import * as dotenv from 'dotenv'

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)

  // ตั้งค่า Handlebars เป็น view engine
  app.setViewEngine('hbs')

  // ตั้งค่าโฟลเดอร์สำหรับ static assets (เช่น CSS)
  app.useStaticAssets(join(__dirname, '..', '..', 'public'))

  // ตั้งค่าโฟลเดอร์สำหรับ views
  app.setBaseViewsDir(join(__dirname, '..', 'views'))

  // ลงทะเบียน partials (ถ้ามี)
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'))

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
