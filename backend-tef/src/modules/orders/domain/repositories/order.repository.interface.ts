import { OrderEntity } from '../entities/order.entity';
import { UpdateOrderDto } from '../../application/dto/update-order.dto';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
export const ORDER_REPO = Symbol('PRODUCT_REPO');

export interface IOrderRepository {
  createOrder(order: CreateOrderDto): Promise<OrderEntity>;
  findAll(): Promise<OrderEntity[]>;
  findByUuid(uuid: string): Promise<OrderEntity | null>;
  update(order: UpdateOrderDto, uuid: string): Promise<OrderEntity | string>;
  delete(uuid: string): Promise<void>;
}
