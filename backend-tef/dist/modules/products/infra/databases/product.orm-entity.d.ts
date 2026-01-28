import { OrderDetailOrmEntity } from "src/modules/orders/infra/databases/order-details.orm-entity";
export declare class ProductOrmEntity {
    id: number;
    uuid: string;
    name: string;
    price: number;
    description: string;
    category: string;
    orderDetails: OrderDetailOrmEntity[];
}
