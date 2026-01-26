import { Injectable, Inject } from '@nestjs/common';
import { ORDER_REPOSITORY } from 'src/modules/tokkens/order.tokens';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { NotFoundException } from '@nestjs/common';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @Inject(ORDER_REPOSITORY)
    private readonly orderRepository: IOrderRepository,
  ) {}

  async findAll() {
    return this.orderRepository.findAll();
  }
  async findOne(uuid: string) {
    const order = await this.orderRepository.findByUuid(uuid);
    if (!order) throw new NotFoundException('Pedido no encontrado');
    return order;
  }

  async create(createOrderDto: CreateOrderDto) {
    return await this.orderRepository.createOrder(createOrderDto);
  }

  async update(uuid: string, updateOrderDto: UpdateOrderDto) {
    return await this.orderRepository.update(updateOrderDto, uuid);
  }

  async remove(uuid: string) {
    return await this.orderRepository.delete(uuid);
  }
}
