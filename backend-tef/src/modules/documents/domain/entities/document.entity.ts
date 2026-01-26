import { OrderEntity } from "src/modules/orders/domain/entities/order.entity";
export class DocumentEntity {
  public readonly id: number;
  public readonly uuid: string;
  public fileName: string;
  public contentType: string;
  public data: Buffer;
  public createdAt: Date;
  public orders: OrderEntity[];
}
