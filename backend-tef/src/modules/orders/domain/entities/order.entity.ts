import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { AdminEntity } from "src/modules/users/domain/entities/admin.entity";
import { HojaEntity } from "src/modules/orders/domain/entities/hoja.entity";
import { ConsumidorFinalEntity } from "src/modules/users/domain/entities/final-customer";
import { ProductEntity } from "src/modules/products/domain/entities/product.entity";
import { DocumentEntity } from "src/modules/documents/domain/entities/document.entity";
export class OrderEntity {
  public readonly id: number;
  public readonly uuid: string;
  public createdAt: Date;
  public user: UserEntity | AdminEntity | ConsumidorFinalEntity; // Usuario que realiza el pedido
  public document: DocumentEntity; // Ruta del archivo asociado -> futuro debería ser uuid archivo en bbdd cloud
  public count: number;
  public hoja: HojaEntity;
  public enganche: ProductEntity;
  public description: string;
  public subtotal: number;
  public total: number;
}
