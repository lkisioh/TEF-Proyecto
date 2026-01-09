import { IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  uuidUser: string;
  @IsString()
  date: string;
  @IsString()
  file: string;
  @IsNumber()
  count: number;
  @IsString()
  hoja: string;
  @IsString()
  enganche: string;
  @IsNumber()
  subtotal: number;
  @IsNumber()
  total: number;
}
