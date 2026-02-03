import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { OrderOrmEntity } from '../databases/order.orm-entity';
import { OrderDetailOrmEntity } from '../databases/order-details.orm-entity';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { OrderEntity } from '../../domain/entities/order.entity';
import { OrderDetailEntity } from '../../domain/entities/order-detail.entity';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';

@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(
    private readonly dataSource: DataSource,
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepo: Repository<OrderOrmEntity>,
  ) {}

  async create(order: OrderEntity): Promise<OrderEntity> {
    return this.dataSource.transaction(async (manager) => {
      // 1) Crear OrderOrmEntity desde Domain (sin relaciones)
      const orderData: DeepPartial<OrderOrmEntity> = {
        uuid: order.uuid,
        estado: order.estado,
        notes: order.notes ?? '',
        total: order.total,
        userUuid: order.userUuid ?? null, // ✅ FK directa
      };

      const orderOrm = manager.create(OrderOrmEntity, orderData);
      const savedOrder = await manager.save(OrderOrmEntity, orderOrm);

      // 2) Crear details desde Domain (usando FKs directas)
      const detailOrms = order.details.map((d) => {
        const detailData: DeepPartial<OrderDetailOrmEntity> = {
          uuid: d.uuid,

          orderUuid: savedOrder.uuid,
          documentUuid: d.documentUuid,
          hojaUuid: d.hojaUuid,
          engancheUuid: d.engancheUuid,

          documentPageNumber: d.documentPageNumber,
          cantidad: d.cantidad,
          description: d.description ?? '',
          precioUnitario: d.precioUnitario,
          precioHoja: d.precioHoja,
          precioEnganche: d.precioEnganche,
          subtotal: d.subtotal,
        };

        return manager.create(OrderDetailOrmEntity, detailData);
      });

      await manager.save(OrderDetailOrmEntity, detailOrms);

      // 3) Devolver Domain mapeado
      return this.toDomain(savedOrder, detailOrms);
    });
  }

  async findAll(): Promise<OrderEntity[]> {
    const rows = await this.orderRepo.find({
      relations: { details: true, user: true }, // ajustá según necesidad
      order: { createdAt: 'DESC' },
    });
    return rows.map((o) => this.toDomain(o, o.details ?? []));
  }

  async findByUuid(uuid: string): Promise<OrderEntity | null> {
    const row = await this.orderRepo.findOne({
      where: { uuid },
      relations: { details: true, user: true },
    });
    if (!row) return null;
    return this.toDomain(row, row.details ?? []);
  }

  async delete(uuid: string): Promise<void> {
    await this.orderRepo.delete({ uuid } as any);
  }

  private toDomain(
    orderOrm: OrderOrmEntity,
    detailsOrm: OrderDetailOrmEntity[],
  ): OrderEntity {
    const o = new OrderEntity();
    o.uuid = orderOrm.uuid;
    o.createdAt = orderOrm.createdAt;
    o.userUuid = orderOrm.userUuid ?? null;
    o.estado = orderOrm.estado;
    o.notes = orderOrm.notes;
    o.total = orderOrm.total;

    o.details = detailsOrm.map((d) => {
      const dd = new OrderDetailEntity();
      dd.uuid = d.uuid;

      // ✅ USAR FKs (siempre existen aunque no estén las relaciones cargadas)
      dd.documentUuid = d.documentUuid ?? null;
      dd.hojaUuid = d.hojaUuid ?? null;
      dd.engancheUuid = d.engancheUuid ?? null;

      dd.documentPageNumber = d.documentPageNumber ?? null;
      dd.precioHoja = d.precioHoja;
      dd.precioEnganche = d.precioEnganche;

      dd.cantidad = d.cantidad;
      dd.description = d.description;
      dd.precioUnitario = d.precioUnitario;
      dd.subtotal = d.subtotal;
      return dd;
    });

    return o;
  }
}
