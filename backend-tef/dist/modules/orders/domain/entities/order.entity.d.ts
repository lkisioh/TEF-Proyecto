import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { AdminEntity } from "src/modules/users/domain/entities/admin.entity";
import { HojaEntity } from "src/modules/orders/domain/entities/hoja.entity";
import { ConsumidorFinalEntity } from "src/modules/users/domain/entities/final-customer";
import { ProductEntity } from "src/modules/products/domain/entities/product.entity";
export declare class OrderEntity {
    readonly id: number;
    readonly uuid: string;
    user: UserEntity | AdminEntity | ConsumidorFinalEntity;
    date: string;
    file: string;
    count: number;
    hoja: HojaEntity;
    enganche: ProductEntity;
    subtotal: number;
    total: number;
}
