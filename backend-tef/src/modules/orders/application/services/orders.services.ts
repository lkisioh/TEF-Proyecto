import { Injectable, Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from '../../domain/entities/order.entity';
import { BadRequestException } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/modules/tokkens/order.tokens';
import { USER_REPOSITORY } from 'src/modules/tokkens/user.tokens';
import { DOCUMENT_REPOSITORY } from 'src/modules/tokkens/document.tokkens';
import { PRODUCT_REPOSITORY } from 'src/modules/tokkens/product.tokens';
import type { IProductRepository } from 'src/modules/products/domain/repositories/product.repository.interface';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import type { IUserRepository } from 'src/modules/users/domain/repositories/user.repository.interface';
import type { IDocumentRepository } from 'src/modules/documents/domain/repositories/document.repository.interface';
import { OrderDetailEntity } from '../../domain/entities/order-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(DOCUMENT_REPOSITORY)
    private readonly documentRepository: IDocumentRepository,
  ) {}

  async findAll() {
    return await this.orderRepository.findAll();
  }
  async findOne(uuid: string) {
    const order = await this.orderRepository.findByUuid(uuid);
    if (!order) throw new NotFoundException('Pedido no encontrado');
    return order;
  }

  async create(dto: CreateOrderDto) {
    if (dto.userUuid) {
      const user = await this.userRepository.findByUuid(dto.userUuid);
      if (!user) throw new NotFoundException('Usuario no encontrado');
    }

    const order = new OrderEntity();
    order.uuid = uuidv4();
    order.userUuid = dto.userUuid ?? 'Consumidor Final';
    order.estado = 'PENDIENTE';
    order.notes = dto.notes ?? '';
    order.details = [];
    order.total = 0;

    let total = 0;

    for (const d of dto.details) {
      const doc = await this.documentRepository.findByUuid(d.documentUuid);
      if (!doc)
        throw new NotFoundException(`Documento no existe: ${d.documentUuid}`);

      const hoja = await this.productRepository.findByUuid(d.hojaUuid);
      if (!hoja) throw new NotFoundException(`Hoja no existe: ${d.hojaUuid}`);

      const enganche = d.productUuid
        ? await this.productRepository.findByUuid(d.productUuid)
        : null;

      if (d.productUuid && !enganche) {
        throw new NotFoundException(`Enganche no existe: ${d.productUuid}`);
      }

      const hojaPrice = Number((hoja as any).price ?? 0);
      const enganchePrice = Number((enganche as any)?.price ?? 0);
      if (hojaPrice < 0 || enganchePrice < 0)
        throw new BadRequestException('Precios inválidos');

      // ✅ Elegí tu regla:
      // A) enganche por copia:
      const unitPrice = hojaPrice + enganchePrice;
      const subtotal = unitPrice * d.count;

      // B) enganche fijo por documento:
      // const unitPrice = hojaPrice;
      // const subtotal = hojaPrice * d.count + enganchePrice;

      const detail = new OrderDetailEntity();
      detail.uuid = uuidv4();
      detail.documentUuid = d.documentUuid;
      detail.hojaUuid = d.hojaUuid;
      detail.engancheUuid = d.productUuid;
      detail.count = d.count;
      detail.description = d.description ?? '';
      detail.unitPrice = unitPrice;
      detail.subtotal = subtotal;

      order.details.push(detail);
      total += subtotal;
    }

    order.total = total;

    // 4) Persistir (repo infra hace el mapping a ORM + transacción)
    return this.orderRepository.create(order);
  }

  async remove(uuid: string) {
    return await this.orderRepository.delete(uuid);
  }
}
