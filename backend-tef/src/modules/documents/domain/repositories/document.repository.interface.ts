import { DocumentEntity } from '../entities/document.entity';
import { UpdateDocumentDto } from '../../application/dto/update-document.dto';
import { CreateDocumentDto } from '../../application/dto/create-document.dto';
export const DOCUMENT_REPO = Symbol('DOCUMENT_REPO');

export interface IDocumentRepository {
  createDocument(document: CreateDocumentDto): Promise<DocumentEntity>;
  findAll(): Promise<DocumentEntity[]>;
  findByUuid(uuid: string): Promise<DocumentEntity | null>;
  update(
    document: UpdateDocumentDto,
    uuid: string,
  ): Promise<DocumentEntity | string>;
  delete(uuid: string): Promise<void>;
  exists(uuid: string): Promise<boolean>;
}
