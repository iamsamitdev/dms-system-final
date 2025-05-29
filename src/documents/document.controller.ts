import { Controller, Get, Render, Req } from "@nestjs/common"
import { Request } from "express"
import { DocumentService } from "./document.service"

@Controller('backend/documents')
export class DocumentController {
    constructor(private documentService: DocumentService) {}

    // หน้าจัดการเอกสาร
    @Get()
    @Render('back/documents')
    async getDocuments(@Req() req: Request) {
        const documents = await this.documentService.findAll()
        const user = req.session?.user
        
        return {
            title: 'Documents',
            description: 'Manage all documents in the system',
            layout: 'layouts/backlayout',
            user,
            documents
        }
    }

    // API: ดึงเอกสารทั้งหมด
    @Get('api')
    async getDocumentsApi() {
        return this.documentService.findAll()
    }
} 