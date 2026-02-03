export declare class OrderDetailEntity {
    readonly id: number;
    uuid: string;
    orderUuid: string;
    documentUuid: string | null;
    documentPageNumber: number | null;
    hojaUuid: string | null;
    precioHoja: number;
    engancheUuid: string | null;
    precioEnganche: number;
    cantidad: number;
    description: string;
    precioUnitario: number;
    subtotal: number;
}
