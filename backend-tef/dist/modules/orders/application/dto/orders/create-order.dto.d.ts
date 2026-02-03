declare class CreateOrderDetailDto {
    documentUuid: string;
    hojaUuid: string;
    productUuid?: string;
    printType: 'byn_simple' | 'byn_doble' | 'col_simple' | 'col_doble';
    cantidad: number;
    description?: string;
}
export declare class CreateOrderDto {
    userUuid?: string;
    notes?: string;
    details: CreateOrderDetailDto[];
}
export {};
