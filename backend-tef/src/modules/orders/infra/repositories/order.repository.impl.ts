import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { OrderOrmEntity } from '../databases/order.orm-entity';
import { IOrderRepository } from '../../domain/repositories/order.repository.interface';

import { OrderEntity } from '../../domain/entities/order.entity';

import { UpdateOrderDto } from '../../application/dto/update-order.dto';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { UserOrmEntity } from 'src/modules/users/infra/databases/user.orm-entity';
import { DocumentOrmEntity } from 'src/modules/documents/infra/databases/document.orm-entity';
import { HojaOrmEntity } from '../databases/hoja.orm-entity';
import { ProductOrmEntity } from 'src/modules/products/infra/databases/product.orm-entity';

@Injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  constructor(
    @InjectRepository(OrderOrmEntity)
    private readonly orderRepo: Repository<OrderOrmEntity>,
  ) {}

  async createOrder(dto: CreateOrderDto): Promise<OrderEntity> {
    const order = this.orderRepo.create({
      uuid: uuidv4(),
      user: dto.uuidUser ? ({ uuid: dto.uuidUser } as UserOrmEntity) : null,
      document: dto.documentUuid
        ? ({ uuid: dto.documentUuid } as DocumentOrmEntity)
        : null,
      count: dto.count,
      hoja: dto.hojaUuid ? ({ uuid: dto.hojaUuid } as HojaOrmEntity) : null,
      enganche: dto.engancheUuid
        ? ({ uuid: dto.engancheUuid } as ProductOrmEntity)
        : null,
      description: dto.description,
      subtotal: dto.subtotal,
      total: dto.total,
    });

    const saved = await this.orderRepo.save(order);

    const domainOrder = new OrderEntity();
    Object.assign(domainOrder, {
      id: saved.id,
      uuid: saved.uuid,
      user: saved.user,
      createdAt: saved.createdAt,
      document: saved.document,
      count: saved.count,
      hoja: saved.hoja,
      enganche: saved.enganche,
      description: saved.description,
      subtotal: saved.subtotal,
      total: saved.total,
    });

    return domainOrder;
  }

  async findAll(): Promise<OrderEntity[]> {
    const entities = await this.orderRepo.find();
    return entities.map((entity) => {
      const orders = new OrderEntity();
      Object.assign(orders, {
        uuid: entity.uuid,
        user: entity.user,
        createdAt: entity.createdAt,
        document: entity.document,
        count: entity.count,
        hoja: entity.hoja,
        enganche: entity.enganche,
        description: entity.description,
        subtotal: entity.subtotal,
        total: entity.total,
      });
      return orders;
    });
  }

  async findByUuid(uuid: string): Promise<OrderEntity | null> {
    const entity = await this.orderRepo.findOne({ where: { uuid } });
    if (!entity) return null;

    const orderFind = new OrderEntity();
    Object.assign(orderFind, {
      uuid: entity.uuid,
      user: entity.user,
      createdAt: entity.createdAt,
      document: entity.document,
      count: entity.count,
      hoja: entity.hoja,
      enganche: entity.enganche,
      description: entity.description,
      subtotal: entity.subtotal,
      total: entity.total,
    });

    return orderFind;
  }
  async update(
    dto: UpdateOrderDto,
    uuid: string,
  ): Promise<OrderEntity | string> {
    await this.orderRepo.update({ uuid }, dto);
    const updatedEntity = await this.orderRepo.findOne({ where: { uuid } });
    if (!updatedEntity) {
      return 'Product not found';
    }
    const updatedOrder = new OrderEntity();
    Object.assign(updatedOrder, {
      uuid: updatedEntity.uuid,
      user: updatedEntity.user,
      createdAt: updatedEntity.createdAt,
      document: updatedEntity.document,
      count: updatedEntity.count,
      hoja: updatedEntity.hoja,
      enganche: updatedEntity.enganche,
      description: updatedEntity.description,
      subtotal: updatedEntity.subtotal,
      total: updatedEntity.total,
    });
    return updatedOrder;
  }

  async delete(uuid: string): Promise<void> {
    await this.orderRepo.delete({ uuid });
  }
}
