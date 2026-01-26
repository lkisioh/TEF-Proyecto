import { OrderEntity } from "src/modules/orders/domain/entities/order.entity";
export declare class DocumentEntity {
    readonly id: number;
    readonly uuid: string;
    fileName: string;
    contentType: string;
    data: Buffer;
    createdAt: Date;
    orders: OrderEntity[];
}
