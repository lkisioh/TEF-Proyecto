import { Repository } from 'typeorm';
import { DocumentOrmEntity } from '../databases/document.orm-entity';
import { IDocumentRepository } from '../../domain/repositories/document.repository.interface';
import { DocumentEntity } from '../../domain/entities/document.entity';
import { UpdateDocumentDto } from '../../application/dto/update-document.dto';
import { CreateDocumentDto } from '../../application/dto/create-document.dto';
export declare class DocumentRepositoryImpl implements IDocumentRepository {
    private readonly documentRepo;
    constructor(documentRepo: Repository<DocumentOrmEntity>);
    createDocument(dto: CreateDocumentDto): Promise<DocumentEntity>;
    findAll(): Promise<DocumentEntity[]>;
    findByUuid(uuid: string): Promise<DocumentEntity | null>;
    update(dto: UpdateDocumentDto, uuid: string): Promise<DocumentEntity | string>;
    delete(uuid: string): Promise<void>;
    exists(uuid: string): Promise<boolean>;
}
