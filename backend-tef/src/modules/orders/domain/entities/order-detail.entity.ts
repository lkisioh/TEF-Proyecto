export class OrderDetailEntity {
  public readonly id: number;
  public uuid: string;
  public orderUuid: string;
  public documentUuid: string | undefined;
  public hojaUuid: string | undefined;
  public engancheUuid: string | undefined;
  public count: number;
  public description: string;
  public unitPrice: number;
  public subtotal: number;
}
