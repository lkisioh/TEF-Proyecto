import { OrderDetailEntity } from "./order-detail.entity";
export declare class OrderEntity {
    readonly id: number;
    uuid: string;
    createdAt: Date;
    userUuid: string | null;
    estado: string;
    notes: string;
    details: OrderDetailEntity[];
    total: number;
}
