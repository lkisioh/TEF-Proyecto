import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { AdminEntity } from "src/modules/users/domain/entities/admin.entity";
import { HojaEntity } from "src/modules/orders/domain/entities/hoja.entity";
import { ConsumidorFinalEntity } from "src/modules/users/domain/entities/final-customer";
import { ProductEntity } from "src/modules/products/domain/entities/product.entity";

export class OrderEntity {
  public readonly id: number;
  public readonly uuid: string;
  public user: UserEntity | AdminEntity | ConsumidorFinalEntity;
  public date: string;
  public file: string; // Ruta del archivo asociado -> futuro debería ser uuid archivo en bbdd cloud
  public count: number;
  public hoja: HojaEntity;
  public enganche: ProductEntity;
  public subtotal: number;
  public total: number;
}
