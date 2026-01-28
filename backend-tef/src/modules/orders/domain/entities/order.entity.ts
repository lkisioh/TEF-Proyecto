import { OrderDetailEntity } from "./order-detail.entity";
export class OrderEntity {
  public readonly id: number;
  public uuid: string;
  public createdAt: Date;
  public userUuid: string | null; // Usuario que realiza el pedido
  public estado: string;
  public notes: string;
  public details: OrderDetailEntity[];
  public total: number;
}
