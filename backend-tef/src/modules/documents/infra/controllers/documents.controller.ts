import {
  Controller,
  Get,
  Param,
  Post,
  Res,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DocumentsService } from '../../application/services/documents.service';
import type { Response } from 'express';
import { CreateDocumentDto } from '../../application/dto/create-document.dto';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly docs: DocumentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File | undefined) {
    if (!file)
      throw new BadRequestException('No llegó el archivo (campo "file")');

    if (
      !file.mimetype?.includes('pdf') &&
      !file.originalname.toLowerCase().endsWith('.pdf')
    ) {
      throw new BadRequestException('Solo PDF');
    }

    if (!file.buffer?.length) {
      throw new BadRequestException('No llegó el buffer (¿memoryStorage?)');
    }

    const dto: CreateDocumentDto = {
      fileName: file.originalname,
      contentType: file.mimetype ?? 'application/pdf',
      data: file.buffer,
    };

    return this.docs.create(dto);
  }

  @Get()
  list() {
    return this.docs.findAll();
  }

  @Get(':uuid')
  async download(@Param('uuid') uuid: string, @Res() res: Response) {
    const doc = await this.docs.findOne(uuid);

    res.setHeader('Content-Type', doc.contentType);
    // inline = ver en navegador, attachment = descargar
    res.setHeader('Content-Disposition', `inline; filename="${doc.fileName}"`);

    return res.send(doc.data);
  }
}
