import type { IDocumentRepository } from '../../domain/repositories/document.repository.interface';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { CreateDocumentDto } from '../dto/create-document.dto';
export declare class DocumentsService {
    private readonly documentRepository;
    constructor(documentRepository: IDocumentRepository);
    findAll(): Promise<import("../../domain/entities/document.entity").DocumentEntity[]>;
    findOne(uuid: string): Promise<import("../../domain/entities/document.entity").DocumentEntity>;
    create(createDocumentDto: CreateDocumentDto): Promise<import("../../domain/entities/document.entity").DocumentEntity>;
    update(uuid: string, updateDocumentDto: UpdateDocumentDto): Promise<string | import("../../domain/entities/document.entity").DocumentEntity>;
    remove(uuid: string): Promise<void>;
    exists(uuid: string): Promise<import("../../domain/entities/document.entity").DocumentEntity | null>;
}
