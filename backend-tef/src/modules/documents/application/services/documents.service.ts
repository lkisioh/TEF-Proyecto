import { Injectable, Inject } from '@nestjs/common';
import { DOCUMENT_REPOSITORY } from 'src/modules/tokkens/document.tokkens';
import type { IDocumentRepository } from '../../domain/repositories/document.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { UpdateDocumentDto } from '../dto/update-document.dto';
import { CreateDocumentDto } from '../dto/create-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async findAll() {
    return this.documentRepository.findAll();
  }
  async findOne(uuid: string) {
    const document = await this.documentRepository.findByUuid(uuid);
    if (!document) throw new NotFoundException('Documento no encontrado');
    return document;
  }

  async create(createDocumentDto: CreateDocumentDto) {
    return await this.documentRepository.createDocument(createDocumentDto);
  }

  async update(uuid: string, updateDocumentDto: UpdateDocumentDto) {
    return await this.documentRepository.update(updateDocumentDto, uuid);
  }

  async remove(uuid: string) {
    return await this.documentRepository.delete(uuid);
  }
  /* async uploadPdf(file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Falta archivo');

    const isPdfMime = file.mimetype === 'application/pdf';
    const hasPdfExt = (file.originalname || '').toLowerCase().endsWith('.pdf');

    if (!isPdfMime && !hasPdfExt) {
      throw new BadRequestException('Solo se permiten archivos PDF');
    }

    if (!file.buffer || file.buffer.length === 0) {
      throw new BadRequestException(
        'No se recibió el contenido del archivo (¿diskStorage?)',
      );
    }

    // acá el buffer YA es válido

    const doc = await this.documentRepository.createDocument({
      fileName: file.originalname,
      contentType: 'application/pdf',
      data: file.buffer,
    });

    const saved = await this.documentRepository.save(doc);

    return {
      uuid: saved.uuid,
      fileName: saved.fileName,
      createdAt: saved.createdAt,
    };
  }*/

  async exists(uuid: string) {
    return this.documentRepository.findByUuid(uuid);
  }
}
