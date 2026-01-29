import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class CreateOrderDetailDto {
  @IsString()
  documentUuid: string;

  @IsString()
  hojaUuid: string;

  @IsOptional()
  @IsString()
  productUuid?: string; // enganche opcional

  @IsInt()
  @Min(1)
  count: number;

  @IsOptional()
  @IsString()
  description?: string;
}
