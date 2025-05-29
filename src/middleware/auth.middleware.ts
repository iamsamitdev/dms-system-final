import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request & { session?: any }, res: Response, next: NextFunction) {
        // ตรวจสอบ authentication ก่อน
        if (!req.session?.user) {
            return res.redirect('/auth/login')
        }
        
        // ดึงชื่อ route จาก path
        const pathParts = req.path.split('/').filter(part => part !== '')
        const routeName = pathParts[pathParts.length - 1] || ''
        
        // Debug logging (สามารถลบออกได้ในภายหลัง)
        console.log('Auth Middleware:', {
            path: req.path,
            pathParts,
            routeName,
            userRoleId: req.session.user.roleId,
            hasError: !!req.query.error
        })
        
        // ข้ามการตรวจสอบสิทธิ์สำหรับ:
        // 1. Root path (/)
        // 2. Dashboard (หน้าหลัก)
        // 3. เมื่อมี error parameter (ป้องกัน redirect loop)
        // 4. เมื่อ path เป็น /backend เฉยๆ (base path)
        // 5. เมื่อ routeName เป็นค่าว่าง
        if (req.path === '/' ||
            routeName === 'dashboard' || 
            routeName === 'backend' || 
            routeName === '' ||
            req.query.error || 
            req.path === '/backend' ||
            req.path === '/backend/') {
            return next()
        }
        
        // ตรวจสอบสิทธิ์การเข้าถึงตาม role
        const userRoleId = req.session.user.roleId
        
        // กำหนดสิทธิ์การเข้าถึงตาม role
        const rolePermissions = {
            1: ['documents', 'users', 'reports', 'settings', 'profile'], // Administrator
            2: ['documents', 'reports', 'profile'], // Manager  
            3: ['documents', 'profile'] // User
        }
        
        // ตรวจสอบว่า role นี้มีสิทธิ์เข้าถึง route นี้หรือไม่
        const allowedRoutes = rolePermissions[userRoleId] || []
        
        if (!allowedRoutes.includes(routeName)) {
            console.log('Access denied for:', routeName, 'Role:', userRoleId)
            return res.redirect('/backend/dashboard?error=access_denied')
        }
        
        // ถ้าผ่านการตรวจสอบทั้งหมด
        next()
    }
}