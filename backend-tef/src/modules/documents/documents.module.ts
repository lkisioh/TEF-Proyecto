import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentOrmEntity } from './infra/databases/document.orm-entity';
import { DocumentsService } from './application/services/documents.service';
import { DocumentRepositoryImpl } from './infra/repositories/document.repository.impl';
import { DocumentsController } from './infra/controllers/documents.controller';
import { DOCUMENT_REPOSITORY } from './../tokkens/document.tokkens';

@Module({
  imports: [TypeOrmModule.forFeature([DocumentOrmEntity])],
  controllers: [DocumentsController],
  providers: [
    DocumentsService,
    DocumentRepositoryImpl,
    {
      provide: DOCUMENT_REPOSITORY,
      useClass: DocumentRepositoryImpl,
    },
  ],
  exports: [DocumentsService],
})
export class DocumentsModule {}
