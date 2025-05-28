import { Controller, Get, Render } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Home page with layout
  @Get()
  @Render('front/index')
  getHome() {
    return {
      title: 'Home',
      description: 'Professional Document Management System for modern businesses. Secure storage, real-time collaboration, and intelligent organization.',
      layout: 'layouts/frontlayout'
    }
  }

}



