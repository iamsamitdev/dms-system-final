import { Controller, Get, Render } from '@nestjs/common'

@Controller('backend')
export class BackendController {
  
  @Get('dashboard')
  @Render('back/dashboard')
  getDashboard() {
    return {
      title: 'Dashboard',
      description: 'DMS System Admin Dashboard - Monitor and manage your document management system',
      layout: 'layouts/backlayout'
    }
  }

  @Get('documents')
  @Render('back/documents')
  getDocuments() {
    return {
      title: 'Documents',
      description: 'Manage all documents in the system',
      layout: 'layouts/backlayout'
    }
  }

  @Get('users')
  @Render('back/users')
  getUsers() {
    return {
      title: 'Users',
      description: 'Manage system users and permissions',
      layout: 'layouts/backlayout'
    }
  }

  @Get('reports')
  @Render('back/reports')
  getReports() {
    return {
      title: 'Reports',
      description: 'View system analytics and reports',
      layout: 'layouts/backlayout'
    }
  }

  @Get('settings')
  @Render('back/settings')
  getSettings() {
    return {
      title: 'Settings',
      description: 'Configure system settings and preferences',
      layout: 'layouts/backlayout'
    }
  }

  @Get('profile')
  @Render('back/profile')
  getProfile() {
    return {
      title: 'Profile',
      description: 'Manage your profile settings',
      layout: 'layouts/backlayout'
    }
  }
} 