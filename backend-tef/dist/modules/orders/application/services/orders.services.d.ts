import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { UpdateOrderDto } from '../dto/update-order.dto';
import { CreateOrderDto } from '../dto/create-order.dto';
export declare class OrdersService {
    private readonly orderRepository;
    constructor(orderRepository: IOrderRepository);
    findAll(): Promise<import("../../domain/entities/order.entity").OrderEntity[]>;
    findOne(uuid: string): Promise<import("../../domain/entities/order.entity").OrderEntity>;
    create(createOrderDto: CreateOrderDto): Promise<import("../../domain/entities/order.entity").OrderEntity>;
    update(uuid: string, updateOrderDto: UpdateOrderDto): Promise<string | import("../../domain/entities/order.entity").OrderEntity>;
    remove(uuid: string): Promise<void>;
}
