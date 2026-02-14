import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { HojaOrmEntity } from '../databases/hoja.orm-entity';
import { HojaEntity } from '../../domain/entities/hoja.entity';

import { IHojaRepository } from '../../domain/repositories/hoja.repository,interface';

import { CreateHojaDto } from '../../application/dto/hojas/create-hoja.dto';
import { UpdateHojaDto } from '../../application/dto/hojas/update-hoja.dto';

@Injectable()
export class HojasRepositoryImpl implements IHojaRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(HojaOrmEntity)
    private readonly hojaRepo: Repository<HojaOrmEntity>,
  ) {}

  async create(hoja: HojaEntity): Promise<HojaEntity> {
    const orm = this.hojaRepo.create({
      uuid: hoja.uuid,
      tamano: hoja.tamano,
      tipo: hoja.tipo,
      gramaje: hoja.gramaje,
      precioBynSimple: hoja.precioBynSimple,
      precioBynDobleFaz: hoja.precioBynDobleFaz,
      precioColorSimple: hoja.precioColorSimple,
      precioColorDobleFaz: hoja.precioColorDobleFaz,
      description: hoja.description,
    });

    const saved = await this.hojaRepo.save(orm);

    const domain = new HojaEntity();
    Object.assign(domain, saved);
    return domain;
  }

  async findAll(): Promise<HojaEntity[]> {
    const entities = await this.hojaRepo.find();
    return entities.map((entity) => {
      const hojas = new HojaEntity();
      Object.assign(hojas, {
        uuid: entity.uuid,
        tamano: entity.tamano,
        tipo: entity.tipo,
        gramaje: entity.gramaje,
        precioBynSimple: entity.precioBynSimple,
        precioBynDobleFaz: entity.precioBynDobleFaz,
        precioColorSimple: entity.precioColorSimple,
        precioColorDobleFaz: entity.precioColorDobleFaz,
        description: entity.description,
      });
      return hojas;
    });
  }

  async findByUuid(uuid: string): Promise<HojaEntity | null> {
    const entity = await this.hojaRepo.findOne({ where: { uuid } });
    if (!entity) return null;

    const hojaFind = new HojaEntity();
    Object.assign(hojaFind, {
      uuid: entity.uuid,
      tamano: entity.tamano,
      gramaje: entity.gramaje,
      precioBynSimple: entity.precioBynSimple,
      precioBynDobleFaz: entity.precioBynDobleFaz,
      precioColorSimple: entity.precioColorSimple,
      precioColorDobleFa: entity.precioColorDobleFaz,
      description: entity.description,
    });

    return hojaFind;
  }
  async update(dto: UpdateHojaDto, uuid: string): Promise<HojaEntity | string> {
    const nuevosValores = new HojaOrmEntity();
    Object.assign(dto, nuevosValores);

    await this.hojaRepo.update({ uuid }, nuevosValores);
    const updatedEntity = await this.hojaRepo.findOne({ where: { uuid } });
    if (!updatedEntity) {
      return 'Product not found';
    }
    const updatedHoja = new HojaEntity();
    Object.assign(updatedHoja, {
      tamano: updatedHoja.tamano,
      gramaje: updatedHoja.gramaje,
      precioBynSimple: updatedHoja.precioBynSimple,
      precioBynDobleFaz: updatedHoja.precioBynDobleFaz,
      precioColorSimple: updatedHoja.precioColorSimple,
      precioColorDobleFa: updatedHoja.precioColorDobleFaz,
      description: updatedHoja.description,
    });
    return updatedHoja;
  }

  async delete(uuid: string): Promise<void> {
    await this.hojaRepo.delete({ uuid });
  }
}
