import { DataSource, Repository } from 'typeorm';
import { OrderOrmEntity } from '../databases/order.orm-entity';
import { OrderEntity } from '../../domain/entities/order.entity';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
export declare class OrderRepositoryImpl implements IOrderRepository {
    private readonly dataSource;
    private readonly orderRepo;
    constructor(dataSource: DataSource, orderRepo: Repository<OrderOrmEntity>);
    create(order: OrderEntity): Promise<OrderEntity>;
    findAll(): Promise<OrderEntity[]>;
    findByUuid(uuid: string): Promise<OrderEntity | null>;
    delete(uuid: string): Promise<void>;
    private toDomain;
}
