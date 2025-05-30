import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Document, DocumentStatus } from "./document.entity"

export interface PaginationResult {
    documents: Document[]
    total: number
    page: number
    limit: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
}

@Injectable()
export class DocumentService {
    constructor(
        @InjectRepository(Document)
        private documentRepository: Repository<Document>
    ) {}

    // ดึงเอกสารพร้อม pagination
    async findWithPagination(page: number = 1, limit: number = 5): Promise<PaginationResult> {
        try {
            console.log(`DocumentService: findWithPagination - page: ${page}, limit: ${limit}`)
            
            const skip = (page - 1) * limit
            
            const [documents, total] = await this.documentRepository.findAndCount({
                where: { isActive: true },
                relations: {
                    owner: {
                        role: true
                    },
                    category: true
                },
                order: { createdAt: 'DESC' },
                skip,
                take: limit
            })
            
            const totalPages = Math.ceil(total / limit)
            
            console.log(`DocumentService: Found ${documents.length} documents, total: ${total}, totalPages: ${totalPages}`)
            
            return {
                documents,
                total,
                page,
                limit,
                totalPages,
                hasNext: page < totalPages,
                hasPrev: page > 1
            }
        } catch (error) {
            console.error('DocumentService: Error in findWithPagination:', error)
            throw error
        }
    }

    // ดึงเอกสารทั้งหมด (เก็บไว้สำหรับ backward compatibility)
    async findAll(): Promise<Document[]> {
        try {
            console.log('DocumentService: Starting findAll query...')
            
            // ตรวจสอบข้อมูลทั้งหมดก่อน (รวม inactive)
            const allDocuments = await this.documentRepository.find({
                order: { createdAt: 'DESC' }
            })
            console.log('DocumentService: Total documents in DB:', allDocuments.length)
            
            // ตรวจสอบเฉพาะ active documents
            const activeDocuments = await this.documentRepository.find({
                where: { isActive: true },
                order: { createdAt: 'DESC' }
            })
            console.log('DocumentService: Active documents:', activeDocuments.length)
            
            // ดึงข้อมูลพร้อม relations
            const documents = await this.documentRepository.find({
                where: { isActive: true },
                relations: {
                    owner: {
                        role: true
                    },
                    category: true
                },
                order: { createdAt: 'DESC' }
            })
            
            console.log('DocumentService: Documents with relations:', documents.length)
            
            if (documents.length > 0) {
                console.log('DocumentService: Sample document:', {
                    id: documents[0].id,
                    title: documents[0].title,
                    ownerId: documents[0].ownerId,
                    categoryId: documents[0].categoryId,
                    hasOwner: !!documents[0].owner,
                    hasCategory: !!documents[0].category,
                    ownerName: documents[0].owner ? `${documents[0].owner.firstName} ${documents[0].owner.lastName}` : 'No owner'
                })
            }
            
            return documents
        } catch (error) {
            console.error('DocumentService: Error in findAll:', error)
            throw error
        }
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
        status?: DocumentStatus
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