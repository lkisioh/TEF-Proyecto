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
    hojaUuid: string | null;
    hoja: HojaOrmEntity | null;
    engancheUuid: string | null;
    enganche: ProductOrmEntity | null;
    count: number;
    description: string;
    unitPrice: number;
    subtotal: number;
}
