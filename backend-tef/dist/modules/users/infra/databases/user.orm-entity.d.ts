import { OrderOrmEntity } from "src/modules/orders/infra/databases/order.orm-entity";
export declare class UserOrmEntity {
    id: number;
    uuid: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    orders: OrderOrmEntity[];
    phone: string;
    role: string;
}
