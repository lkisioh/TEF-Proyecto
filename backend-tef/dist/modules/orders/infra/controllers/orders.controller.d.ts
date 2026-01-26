import { OrdersService } from '../../application/services/orders.services';
import { CreateOrderDto } from '../../application/dto/create-order.dto';
import { UpdateOrderDto } from '../../application/dto/update-order.dto';
export declare class OrdersController {
    private readonly productsService;
    constructor(productsService: OrdersService);
    create(createOrderDto: CreateOrderDto): Promise<import("../../domain/entities/order.entity").OrderEntity>;
    findAll(): Promise<import("../../domain/entities/order.entity").OrderEntity[]>;
    findOne(uuid: string): Promise<import("../../domain/entities/order.entity").OrderEntity>;
    update(uuid: string, updateOrderDto: UpdateOrderDto): Promise<string | import("../../domain/entities/order.entity").OrderEntity>;
    remove(uuid: string): Promise<void>;
}
