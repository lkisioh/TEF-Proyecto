import { Injectable, Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';

import { HojaEntity } from '../../domain/entities/hoja.entity';
//import { UpdateHojaDto } from '../dto/hojas/update-hoja.dto';
import { CreateHojaDto } from '../dto/hojas/create-hoja.dto';
import { v4 as uuidv4 } from 'uuid';

import { HOJA_REPOSITORY } from 'src/modules/tokkens/hoja.tokkens';

import type { IHojaRepository } from '../../domain/repositories/hoja.repository,interface';

@Injectable()
export class HojasService {
  constructor(
    @Inject(HOJA_REPOSITORY)
    private readonly hojaRepository: IHojaRepository,
  ) {}

  async findAll() {
    return await this.hojaRepository.findAll();
  }
  async findOne(uuid: string) {
    const order = await this.hojaRepository.findByUuid(uuid);
    if (!order) throw new NotFoundException('Hoja no encontrado');
    return order;
  }

  async create(dto: CreateHojaDto) {
    const hoja = new HojaEntity();
    hoja.uuid = uuidv4();
    hoja.tamano = dto.tamano;
    hoja.tipo = dto.tipo;
    hoja.gramaje = dto.gramaje;
    hoja.precioBynSimple = dto.precioBynSimple;
    hoja.precioBynDobleFaz = dto.precioBynDobleFaz;
    hoja.precioColorSimple = dto.precioColorSimple;
    hoja.precioColorDobleFaz = dto.precioColorDobleFaz;
    hoja.description = dto.description;

    return await this.hojaRepository.create(hoja);
  }

  async remove(uuid: string) {
    return await this.hojaRepository.delete(uuid);
  }
}
