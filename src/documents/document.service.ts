import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Document, DocumentStatus } from "./document.entity"

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>
    ) {}

    // ดึงเอกสารทั้งหมด
    async findAll(): Promise<Document[]> {
        return this.documentRepository.find({
            where: { isActive: true },
            relations: ['owner', 'category'],
            order: { createdAt: 'DESC' }
        })
    }

    // ดึงเอกสารตาม ID
    async findById(id: string): Promise<Document | null> {
        return this.documentRepository.findOne({
            where: { id, isActive: true },
            relations: ['owner', 'category']
        })
    }

    // สร้างเอกสารใหม่
    async create(documentData: {
        title: string
        description?: string
        filename: string
        originalName: string
        mimeType: string
        size: number
        path: string
        ownerId: string
        categoryId?: string
    }): Promise<Document> {
        const document = this.documentRepository.create(documentData)
        return this.documentRepository.save(document)
    }

    // อัพเดทเอกสาร
    async update(id: string, documentData: Partial<Document>): Promise<Document | null> {
        await this.documentRepository.update(id, documentData)
        return this.findById(id)
    }

    // ลบเอกสาร (soft delete)
    async delete(id: string): Promise<boolean> {
        const result = await this.documentRepository.update(id, { isActive: false })
        return (result.affected ?? 0) > 0
    }

    // เพิ่มจำนวนการดาวน์โหลด
    async incrementDownloadCount(id: string): Promise<void> {
        await this.documentRepository.increment({ id }, 'downloadCount', 1)
    }
} 