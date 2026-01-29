import { PartialType } from '@nestjs/mapped-types';
import { CreateHojaDto } from './create-hoja.dto';

export class UpdateHojaDto extends PartialType(CreateHojaDto) {}
