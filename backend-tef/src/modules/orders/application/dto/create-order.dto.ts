export class CreateOrderDto {
  userUuid?: string;
  notes?: string;
  details: Array<{
    documentUuid: string;
    hojaUuid: string;
    productUuid?: string;
    count: number;
    description?: string;
  }>;
}
