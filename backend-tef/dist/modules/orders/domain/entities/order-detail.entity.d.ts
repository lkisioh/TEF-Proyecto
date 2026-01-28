export declare class OrderDetailEntity {
    readonly id: number;
    uuid: string;
    orderUuid: string;
    documentUuid: string | undefined;
    hojaUuid: string | undefined;
    engancheUuid: string | undefined;
    count: number;
    description: string;
    unitPrice: number;
    subtotal: number;
}
