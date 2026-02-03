import {
  IsArray,
  IsOptional,
  IsString,
  ValidateNested,
  IsUUID,
  IsInt,
  Min,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

class CreateOrderDetailDto {
  @IsUUID()
  documentUuid: string;

  @IsUUID()
  hojaUuid: string;

  @IsOptional()
  @IsUUID()
  productUuid?: string;

  @IsString()
  @IsIn(['byn_simple', 'byn_doble', 'col_simple', 'col_doble'])
  printType: 'byn_simple' | 'byn_doble' | 'col_simple' | 'col_doble';

  @IsInt()
  @Min(1)
  cantidad: number;

  @IsOptional()
  @IsString()
  description?: string;
}

export class CreateOrderDto {
  @IsOptional()
  @IsUUID()
  userUuid?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetailDto)
  details: CreateOrderDetailDto[];
}
