import { Controller, Get, Render, Req } from '@nestjs/common'
import { Request } from 'express'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Home page with layout
  @Get()
  @Render('front/index')
  getHome(@Req() req: Request) {
    return {
      title: 'Home',
      description: 'Professional Document Management System for modern businesses. Secure storage, real-time collaboration, and intelligent organization.',
      layout: 'layouts/frontlayout',
      user: req.session?.user
    }
  }

}



