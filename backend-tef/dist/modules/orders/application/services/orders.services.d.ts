import { CreateOrderDto } from '../dto/orders/create-order.dto';
import { OrderEntity } from '../../domain/entities/order.entity';
import type { IProductRepository } from 'src/modules/products/domain/repositories/product.repository.interface';
import type { IOrderRepository } from '../../domain/repositories/order.repository.interface';
import type { IUserRepository } from 'src/modules/users/domain/repositories/user.repository.interface';
import type { IDocumentRepository } from 'src/modules/documents/domain/repositories/document.repository.interface';
export declare class OrdersService {
    private readonly orderRepository;
    private readonly productRepository;
    private readonly userRepository;
    private readonly documentRepository;
    constructor(orderRepository: IOrderRepository, productRepository: IProductRepository, userRepository: IUserRepository, documentRepository: IDocumentRepository);
    findAll(): Promise<OrderEntity[]>;
    findOne(uuid: string): Promise<OrderEntity>;
    create(dto: CreateOrderDto): Promise<OrderEntity>;
    remove(uuid: string): Promise<void>;
}
