import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { DocumentOrmEntity } from '../databases/document.orm-entity';
import { IDocumentRepository } from '../../domain/repositories/document.repository.interface';

import { DocumentEntity } from '../../domain/entities/document.entity';

import { UpdateDocumentDto } from '../../application/dto/update-document.dto';
import { CreateDocumentDto } from '../../application/dto/create-document.dto';

@Injectable()
export class DocumentRepositoryImpl implements IDocumentRepository {
  constructor(
    @InjectRepository(DocumentOrmEntity)
    private readonly documentRepo: Repository<DocumentOrmEntity>,
  ) {}

  async createDocument(dto: CreateDocumentDto): Promise<DocumentEntity> {
    const document = this.documentRepo.create({
      uuid: uuidv4(),
      fileName: dto.fileName,
      contentType: dto.contentType,
      data: dto.data,
    });

    const saved = await this.documentRepo.save(document);

    const domainDocument = new DocumentEntity();
    Object.assign(domainDocument, {
      id: saved.id,
      uuid: saved.uuid,
      fileName: saved.fileName,
      contentType: saved.contentType,
      data: saved.data,
      createdAt: saved.createdAt,
    });

    return domainDocument;
  }

  async findAll(): Promise<DocumentEntity[]> {
    const entities = await this.documentRepo.find();
    return entities.map((entity) => {
      const products = new DocumentEntity();
      Object.assign(products, {
        uuid: entity.uuid,
        fileName: entity.fileName,
        contentType: entity.contentType,
        data: entity.data,
        createdAt: entity.createdAt,
      });
      return products;
    });
  }

  async findByUuid(uuid: string): Promise<DocumentEntity | null> {
    const entity = await this.documentRepo.findOne({ where: { uuid } });
    if (!entity) return null;

    const productFind = new DocumentEntity();
    Object.assign(productFind, {
      uuid: entity.uuid,
      fileName: entity.fileName,
      contentType: entity.contentType,
      data: entity.data,
      createdAt: entity.createdAt,
    });

    return productFind;
  }
  async update(
    dto: UpdateDocumentDto,
    uuid: string,
  ): Promise<DocumentEntity | string> {
    await this.documentRepo.update({ uuid }, dto);
    const updatedEntity = await this.documentRepo.findOne({ where: { uuid } });
    if (!updatedEntity) {
      return 'Product not found';
    }
    const updatedDocument = new DocumentEntity();
    Object.assign(updatedDocument, {
      uuid: updatedEntity.uuid,
      fileName: updatedEntity.fileName,
      contentType: updatedEntity.contentType,
      data: updatedEntity.data,
      createdAt: updatedEntity.createdAt,
    });
    return updatedDocument;
  }

  async delete(uuid: string): Promise<void> {
    await this.documentRepo.delete({ uuid });
  }

  async exists(uuid: string): Promise<boolean> {
    const count = await this.documentRepo.count({ where: { uuid } });
    return count > 0;
  }
}
