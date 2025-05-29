import { Injectable, NestMiddleware } from "@nestjs/common"
import { Request, Response, NextFunction } from "express"

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request & { session?: any }, res: Response, next: NextFunction) {
        if (!req.session?.user) {
            return res.redirect('/auth/login')
        }
        // ถ้า session มี user ให้เรียก next() เพื่อดำเนินการต่อ
        next()
    }
}