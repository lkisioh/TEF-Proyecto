import { OrderEntity } from '../entities/order.entity';
export const ORDER_REPO = Symbol('PRODUCT_REPO');

export interface IOrderRepository {
  create(order: OrderEntity): Promise<OrderEntity>;
  findAll(): Promise<OrderEntity[]>;
  findByUuid(uuid: string): Promise<OrderEntity | null>;
  delete(uuid: string): Promise<void>;
}
