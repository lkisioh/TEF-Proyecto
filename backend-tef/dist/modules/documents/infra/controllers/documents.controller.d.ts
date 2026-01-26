import { DocumentsService } from '../../application/services/documents.service';
import type { Response } from 'express';
export declare class DocumentsController {
    private readonly docs;
    constructor(docs: DocumentsService);
    uploadFile(file: Express.Multer.File | undefined): Promise<import("../../domain/entities/document.entity").DocumentEntity>;
    list(): Promise<import("../../domain/entities/document.entity").DocumentEntity[]>;
    download(uuid: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
