import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HojasService } from '../../application/services/hojas.services';

import { CreateHojaDto } from '../../application/dto/hojas/create-hoja.dto';
import { UpdateHojaDto } from '../../application/dto/hojas/update-hoja.dto';

@Controller('hojas')
export class HojasController {
  constructor(private readonly hojasService: HojasService) {}

  @Post()
  create(@Body() createHojaDto: CreateHojaDto) {
    return this.hojasService.create(createHojaDto);
  }

  @Get()
  findAll() {
    return this.hojasService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.hojasService.findOne(uuid);
  }

  @Patch(':uuid')
  update(@Param('uuid') uuid: string, @Body() updateHojaDto: UpdateHojaDto) {
    return 'Not implemented' + uuid + JSON.stringify(updateHojaDto);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.hojasService.remove(uuid);
  }
}
