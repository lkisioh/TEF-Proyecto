import { OrderOrmEntity } from 'src/modules/orders/infra/databases/order.orm-entity';
export declare class DocumentOrmEntity {
    id: number;
    uuid: string;
    fileName: string;
    contentType: string;
    data: Buffer;
    createdAt: Date;
    orders: OrderOrmEntity[];
}
