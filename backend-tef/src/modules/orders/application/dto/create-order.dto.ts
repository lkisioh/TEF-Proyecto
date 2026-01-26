import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  uuidUser: string;
  @IsString()
  createdAt: string;
  @IsString()
  documentUuid: string;
  @IsNumber()
  count: number;
  @IsString()
  hojaUuid: string;
  @IsString()
  engancheUuid: string;
  @IsString()
  description: string;
  @IsNumber()
  subtotal: number;
  @IsNumber()
  total: number;
}
