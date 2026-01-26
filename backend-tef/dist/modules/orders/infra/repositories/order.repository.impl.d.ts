import { Repository } from 'typeorm';
import { OrderOrmEntity } from '../databases/order.orm-entity';
import { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import { OrderEntity } from '../../domain/entities/order.entity';
import { UpdateOrderDto } from '../../application/dto/update-order.dto';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
export declare class OrderRepositoryImpl implements IOrderRepository {
    private readonly orderRepo;
    constructor(orderRepo: Repository<OrderOrmEntity>);
    createOrder(dto: CreateOrderDto): Promise<OrderEntity>;
    findAll(): Promise<OrderEntity[]>;
    findByUuid(uuid: string): Promise<OrderEntity | null>;
    update(dto: UpdateOrderDto, uuid: string): Promise<OrderEntity | string>;
    delete(uuid: string): Promise<void>;
}
