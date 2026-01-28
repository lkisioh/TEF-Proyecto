import { OrderDetailOrmEntity } from "./order-details.orm-entity";
export declare class HojaOrmEntity {
    id: number;
    uuid: string;
    gramaje: number;
    precioBynSimple: number;
    precioBynDobleFaz: number;
    precioColorSimple: number;
    precioColorDobleFaz: number;
    description: string;
    orderDetails: OrderDetailOrmEntity[];
}
