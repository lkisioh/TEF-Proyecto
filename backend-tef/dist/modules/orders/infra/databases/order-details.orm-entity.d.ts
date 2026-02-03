import { DocumentOrmEntity } from 'src/modules/documents/infra/databases/document.orm-entity';
import { HojaOrmEntity } from './hoja.orm-entity';
import { ProductOrmEntity } from 'src/modules/products/infra/databases/product.orm-entity';
import { OrderOrmEntity } from './order.orm-entity';
export declare class OrderDetailOrmEntity {
    id: number;
    uuid: string;
    orderUuid: string;
    order: OrderOrmEntity;
    documentUuid: string | null;
    document: DocumentOrmEntity | null;
    documentPageNumber: number | null;
    hojaUuid: string | null;
    hoja: HojaOrmEntity | null;
    precioHoja: number;
    engancheUuid: string | null;
    enganche: ProductOrmEntity | null;
    precioEnganche: number;
    cantidad: number;
    description: string;
    precioUnitario: number;
    subtotal: number;
}
