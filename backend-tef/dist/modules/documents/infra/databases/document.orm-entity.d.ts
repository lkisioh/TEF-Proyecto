import { OrderDetailOrmEntity } from 'src/modules/orders/infra/databases/order-details.orm-entity';
export declare class DocumentOrmEntity {
    id: number;
    uuid: string;
    fileName: string;
    contentType: string;
    data: Buffer;
    createdAt: Date;
    orderDetails: OrderDetailOrmEntity[];
}
