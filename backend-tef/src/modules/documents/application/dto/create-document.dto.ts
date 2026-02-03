import { IsNumber, IsString } from 'class-validator';
export class CreateDocumentDto {
  @IsString()
  fileName: string;
  @IsString()
  contentType: string;
  @IsNumber()
  cantidadPaginas: number;
  // En SQLite se guarda como BLOB
  data: Buffer;
}
