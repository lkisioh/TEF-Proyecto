import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateHojaDto {
  @IsOptional()
  @IsNumber()
  uuid?: number;

  @IsString()
  tamano: string;

  @IsNumber()
  @Min(1)
  gramaje: number;

  @IsString()
  tipo: string;

  @IsNumber()
  @Min(0)
  precioBynSimple: number;

  @IsNumber()
  @Min(0)
  precioBynDobleFaz: number;

  @IsNumber()
  @Min(0)
  precioColorSimple: number;

  @IsNumber()
  @Min(0)
  precioColorDobleFaz: number;

  @IsOptional()
  @IsString()
  description: string;
}
