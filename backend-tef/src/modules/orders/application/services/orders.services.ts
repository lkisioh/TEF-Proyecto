import { Injectable, Inject } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/orders/create-order.dto';
import { v4 as uuidv4 } from 'uuid';
import { OrderEntity } from '../../domain/entities/order.entity';
import { BadRequestException } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/modules/tokkens/order.tokens';
import { USER_REPOSITORY } from 'src/modules/tokkens/user.tokens';
import { DOCUMENT_REPOSITORY } from 'src/modules/tokkens/document.tokkens';
import { PRODUCT_REPOSITORY } from 'src/modules/tokkens/product.tokens';
import { HOJA_REPOSITORY } from 'src/modules/tokkens/hoja.tokkens';
import type { IProductRepository } from 'src/modules/products/domain/repositories/product.repository.interface';
import type { IHojaRepository } from '../../domain/repositories/hoja.repository,interface';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import type { IUserRepository } from 'src/modules/users/domain/repositories/user.repository.interface';
import type { IDocumentRepository } from 'src/modules/documents/domain/repositories/document.repository.interface';

import { OrderDetailEntity } from '../../domain/entities/order-detail.entity';
import { HojaEntity } from '../../domain/entities/hoja.entity';

function pagesToPrint(pageCount: number, printType: string) {
  const pages = Number(pageCount ?? 0);
  if (pages <= 0) return 0;

  const isDoble = printType === 'byn_doble' || printType === 'col_doble';
  return isDoble ? Math.ceil(pages / 2) : pages;
}

function hojaUnitPrice(hoja: HojaEntity, printType: string) {
  switch (printType) {
    case 'byn_simple':
      return Number(hoja.precioBynSimple ?? 0);
    case 'byn_doble':
      return Number(hoja.precioBynDobleFaz ?? 0);
    case 'col_simple':
      return Number(hoja.precioColorSimple ?? 0);
    case 'col_doble':
      return Number(hoja.precioColorDobleFaz ?? 0);
    default:
      return 0;
  }
}

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
    @Inject(HOJA_REPOSITORY)
    private readonly hojasRepository: IHojaRepository,
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
    // ✅ user opcional: FK debe ser uuid o null
    if (dto.userUuid) {
      const user = await this.userRepository.findByUuid(dto.userUuid);
      if (!user) throw new NotFoundException('Usuario no encontrado');
    }

    const order = new OrderEntity();
    order.uuid = uuidv4();
    order.userUuid = dto.userUuid ?? null; // ✅ null si consumidor final
    order.estado = 'PENDIENTE';
    order.notes = dto.notes ?? '';
    order.details = [];
    order.total = 0;

    let total = 0;

    for (const d of dto.details) {
      // 1) Documento
      const doc = await this.documentRepository.findByUuid(d.documentUuid);
      if (!doc)
        throw new NotFoundException(`Documento no existe: ${d.documentUuid}`);

      const pageCount = doc.cantidadPaginas ?? 0;

      if (pageCount <= 0)
        throw new BadRequestException('El documento no tiene páginas válidas');

      // 2) Hoja (✅ OJO: hojasRepository, no productRepository)
      const hoja = await this.hojasRepository.findByUuid(d.hojaUuid);
      if (!hoja) throw new NotFoundException(`Hoja no existe: ${d.hojaUuid}`);

      // 3) Enganche opcional
      let enganchePrice = 0;
      let engancheUuid: string | undefined = undefined;

      if (d.productUuid) {
        const enganche = await this.productRepository.findByUuid(d.productUuid);
        if (!enganche)
          throw new NotFoundException(`Enganche no existe: ${d.productUuid}`);
        engancheUuid = enganche.uuid;
        enganchePrice = enganche.price;
      }

      // 4) Tipo impresión (si todavía NO lo mandás, elegí un default)
      const printType = d.printType ?? 'byn_simple';

      const pagesPrinted = pagesToPrint(pageCount, printType);
      const hojaPrice = hojaUnitPrice(hoja, printType);

      if (hojaPrice < 0 || enganchePrice < 0)
        throw new BadRequestException('Precios inválidos');
      if (!d.cantidad || d.cantidad < 1)
        throw new BadRequestException('Cantidad inválida');

      // ✅ regla típica:
      // subtotal = (pagesPrinted * hojaPrice) * cantidad + enganchePrice
      const unitPrice = pagesPrinted * hojaPrice;
      const subtotal = unitPrice * Number(d.cantidad) + enganchePrice;

      const detail = new OrderDetailEntity();
      detail.uuid = uuidv4();
      detail.documentUuid = d.documentUuid;
      detail.hojaUuid = d.hojaUuid;
      detail.engancheUuid = engancheUuid ?? null;

      detail.documentPageNumber = pagesPrinted; // ✅ guardás páginas “a imprimir”
      detail.cantidad = Number(d.cantidad);
      detail.description = d.description ?? '';

      detail.precioHoja = hojaPrice; // ✅ calculado backend
      detail.precioEnganche = enganchePrice; // ✅ calculado backend
      detail.precioUnitario = unitPrice; // ✅ calculado backend
      detail.subtotal = subtotal; // ✅ calculado backend

      order.details.push(detail);
      total += subtotal;
    }

    order.total = total;
    return this.orderRepository.create(order);
  }

  async remove(uuid: string) {
    return await this.orderRepository.delete(uuid);
  }
}
