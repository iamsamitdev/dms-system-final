import { Controller, Get, Post, Render, Req, Res, Body, UseInterceptors, UploadedFile, BadRequestException, Query } from "@nestjs/common"
import { FileInterceptor } from "@nestjs/platform-express"
import { Request, Response } from "express"
import { DocumentService } from "./document.service"
import { DocumentStatus } from "./document.entity"
import { CategoryService } from "../categories/category.service"
import { diskStorage } from "multer"
import { extname, join } from "path"
import { existsSync, mkdirSync } from "fs"

@Controller('backend/documents')
export class DocumentController {
    constructor(
        private documentService: DocumentService,
        private categoryService: CategoryService
    ) {}

    // หน้าจัดการเอกสาร
    @Get()
    @Render('back/documents')
    async getDocuments(@Req() req: Request, @Query('page') page?: string) {
        console.log('=== DocumentController.getDocuments() called ===')
        console.log('Request path:', req.path)
        console.log('Page parameter:', page)
        console.log('User session:', req.session?.user ? 'exists' : 'not found')
        
        try {
            const currentPage = page ? parseInt(page, 10) : 1
            const limit = 5 // แบ่งหน้าละ 5 รายการ
            
            console.log(`Calling documentService.findWithPagination(${currentPage}, ${limit})...`)
            const paginationResult = await this.documentService.findWithPagination(currentPage, limit)
            
            console.log('Calling categoryService.findActive()...')
            const categories = await this.categoryService.findActive()
            
            const user = req.session?.user
            
            console.log('Pagination result:', {
                documentsCount: paginationResult.documents.length,
                total: paginationResult.total,
                page: paginationResult.page,
                totalPages: paginationResult.totalPages,
                hasNext: paginationResult.hasNext,
                hasPrev: paginationResult.hasPrev
            })
            console.log('Categories found:', categories.length)
            console.log('Returning data to template...')
            
            return {
                title: 'Documents',
                description: 'Manage all documents in the system',
                layout: 'layouts/backlayout',
                currentPath: req.path,
                user,
                documents: paginationResult.documents,
                categories,
                pagination: {
                    current: paginationResult.page,
                    total: paginationResult.totalPages,
                    hasNext: paginationResult.hasNext,
                    hasPrev: paginationResult.hasPrev,
                    totalItems: paginationResult.total,
                    itemsPerPage: paginationResult.limit,
                    startItem: ((paginationResult.page - 1) * paginationResult.limit) + 1,
                    endItem: Math.min(paginationResult.page * paginationResult.limit, paginationResult.total)
                }
            }
        } catch (error) {
            console.error('Error loading documents:', error)
            return {
                title: 'Documents',
                description: 'Manage all documents in the system',
                layout: 'layouts/backlayout',
                currentPath: req.path,
                user: req.session?.user,
                documents: [],
                categories: [],
                pagination: {
                    current: 1,
                    total: 0,
                    hasNext: false,
                    hasPrev: false,
                    totalItems: 0,
                    itemsPerPage: 5,
                    startItem: 0,
                    endItem: 0
                },
                error: 'เกิดข้อผิดพลาดในการโหลดข้อมูล'
            }
        }
    }

    // API: ดึงเอกสารทั้งหมด
    @Get('api')
    async getDocumentsApi() {
        return this.documentService.findAll()
    }

    // API: อัพโหลดเอกสาร
    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: (req, file, cb) => {
                const uploadPath = join(process.cwd(), 'uploads', 'documents')
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath, { recursive: true })
                }
                cb(null, uploadPath)
            },
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
                const ext = extname(file.originalname)
                cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`)
            }
        }),
        fileFilter: (req, file, cb) => {
            const allowedMimes = [
                'application/pdf',
                'application/msword',
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                'application/vnd.ms-excel',
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'application/vnd.ms-powerpoint',
                'application/vnd.openxmlformats-officedocument.presentationml.presentation',
                'text/plain',
                'image/jpeg',
                'image/png'
            ]
            
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true)
            } else {
                cb(new BadRequestException('ประเภทไฟล์ไม่ได้รับอนุญาต'), false)
            }
        },
        limits: {
            fileSize: 50 * 1024 * 1024 // 50MB
        }
    }))
    async uploadDocument(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: {
            title: string
            description?: string
            categoryId?: string
            status: string
        },
        @Req() req: Request,
        @Res() res: Response
    ) {
        try {
            if (!file) {
                return res.status(400).json({
                    success: false,
                    message: 'กรุณาเลือกไฟล์ที่ต้องการอัพโหลด'
                })
            }

            if (!body.title) {
                return res.status(400).json({
                    success: false,
                    message: 'กรุณากรอกชื่อเอกสาร'
                })
            }

            const user = req.session?.user
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'กรุณาเข้าสู่ระบบ'
                })
            }

            // สร้างเอกสารใหม่
            const document = await this.documentService.create({
                title: body.title,
                description: body.description || '',
                filename: file.filename,
                originalName: file.originalname,
                mimeType: file.mimetype,
                size: file.size,
                path: file.path,
                ownerId: user.id.toString(),
                categoryId: body.categoryId || undefined,
                status: body.status as DocumentStatus
            })

            return res.json({
                success: true,
                message: 'อัพโหลดเอกสารสำเร็จ',
                data: document
            })

        } catch (error) {
            console.error('Upload error:', error)
            return res.status(500).json({
                success: false,
                message: 'เกิดข้อผิดพลาดในการอัพโหลดเอกสาร'
            })
        }
    }
} 