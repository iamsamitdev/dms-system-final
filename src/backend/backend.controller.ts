import { Controller, Get, Render, Req } from '@nestjs/common'
import { Request } from 'express'
import { UserService } from '../users/user.service'

@Controller('backend')
export class BackendController {
  
  constructor(private userService: UserService) {}
  
  @Get('dashboard')
  @Render('back/dashboard')
  async getDashboard(@Req() req: Request) {
    const user = await this.getUserWithRole(req)
    
    // ตรวจสอบ error message จาก URL parameter
    const errorMessage = req.query.error === 'access_denied' 
      ? 'คุณไม่มีสิทธิ์เข้าถึงหน้าที่ต้องการ' 
      : null
    
    return {
      title: 'Dashboard',
      description: 'DMS System Admin Dashboard - Monitor and manage your document management system',
      layout: 'layouts/backlayout',
      user,
      error: errorMessage
    }
  }

  @Get('documents')
  @Render('back/documents')
  async getDocuments(@Req() req: Request) {
    const user = await this.getUserWithRole(req)
    return {
      title: 'Documents',
      description: 'Manage all documents in the system',
      layout: 'layouts/backlayout',
      user
    }
  }

  @Get('users')
  @Render('back/users')
  async getUsers(@Req() req: Request) {
    const user = await this.getUserWithRole(req)
    return {
      title: 'Users',
      description: 'Manage system users and permissions',
      layout: 'layouts/backlayout',
      user
    }
  }

  @Get('reports')
  @Render('back/reports')
  async getReports(@Req() req: Request) {
    const user = await this.getUserWithRole(req)
    return {
      title: 'Reports',
      description: 'View system analytics and reports',
      layout: 'layouts/backlayout',
      user
    }
  }

  @Get('settings')
  @Render('back/settings')
  async getSettings(@Req() req: Request) {
    const user = await this.getUserWithRole(req)
    return {
      title: 'Settings',
      description: 'Configure system settings and preferences',
      layout: 'layouts/backlayout',
      user
    }
  }

  @Get('profile')
  @Render('back/profile')
  async getProfile(@Req() req: Request) {
    const user = await this.getUserWithRole(req)
    return {
      title: 'Profile',
      description: 'Manage your profile settings',
      layout: 'layouts/backlayout',
      user
    }
  }

  private async getUserWithRole(req: Request) {
    if (req.session?.user?.id) {
      const user = await this.userService.findById(req.session.user.id)
      return user
    }
    return req.session?.user
  }
} 