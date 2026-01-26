import { OrderOrmEntity } from "./order.orm-entity";
export declare class HojaOrmEntity {
    id: number;
    uuid: string;
    gramaje: number;
    precioBynSimple: number;
    precioBynDobleFaz: number;
    precioColorSimple: number;
    precioColorDobleFaz: number;
    description: string;
    orders: OrderOrmEntity[];
}
