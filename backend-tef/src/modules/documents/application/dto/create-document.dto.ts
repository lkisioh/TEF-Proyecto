import { IsString } from 'class-validator';
export class CreateDocumentDto {
  @IsString()
  fileName: string;
  @IsString()
  contentType: string;
  // En SQLite se guarda como BLOB
  data: Buffer;
}
