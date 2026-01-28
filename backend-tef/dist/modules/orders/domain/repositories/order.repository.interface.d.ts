import { OrderEntity } from '../entities/order.entity';
export declare const ORDER_REPO: unique symbol;
export interface IOrderRepository {
    create(order: OrderEntity): Promise<OrderEntity>;
    findAll(): Promise<OrderEntity[]>;
    findByUuid(uuid: string): Promise<OrderEntity | null>;
    delete(uuid: string): Promise<void>;
}
