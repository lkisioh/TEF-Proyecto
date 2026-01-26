import { OrderOrmEntity } from "src/modules/orders/infra/databases/order.orm-entity";
export declare class ProductOrmEntity {
    id: number;
    uuid: string;
    name: string;
    price: number;
    description: string;
    orders: OrderOrmEntity[];
}
