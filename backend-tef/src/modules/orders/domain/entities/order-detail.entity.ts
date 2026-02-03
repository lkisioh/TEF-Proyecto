export class OrderDetailEntity {
  public readonly id: number;
  public uuid: string;
  public orderUuid: string;

  public documentUuid: string | null;
  public documentPageNumber: number | null; // páginas a imprimir (ya calculadas)

  public hojaUuid: string | null;
  public precioHoja: number; // precio por hoja según printType

  public engancheUuid: string | null;
  public precioEnganche: number;

  public cantidad: number;
  public description: string;

  public precioUnitario: number; // pagesPrinted * precioHoja
  public subtotal: number; // precioUnitario * cantidad + enganche
}
