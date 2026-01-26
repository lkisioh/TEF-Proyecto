import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { AdminEntity } from "src/modules/users/domain/entities/admin.entity";
import { HojaEntity } from "src/modules/orders/domain/entities/hoja.entity";
import { ConsumidorFinalEntity } from "src/modules/users/domain/entities/final-customer";
import { ProductEntity } from "src/modules/products/domain/entities/product.entity";
import { DocumentEntity } from "src/modules/documents/domain/entities/document.entity";
export declare class OrderEntity {
    readonly id: number;
    readonly uuid: string;
    createdAt: Date;
    user: UserEntity | AdminEntity | ConsumidorFinalEntity;
    document: DocumentEntity;
    count: number;
    hoja: HojaEntity;
    enganche: ProductEntity;
    description: string;
    subtotal: number;
    total: number;
}
