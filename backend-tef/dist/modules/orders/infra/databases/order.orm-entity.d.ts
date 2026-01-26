import { DocumentOrmEntity } from 'src/modules/documents/infra/databases/document.orm-entity';
import { UserOrmEntity } from 'src/modules/users/infra/databases/user.orm-entity';
import { HojaOrmEntity } from './hoja.orm-entity';
import { ProductOrmEntity } from 'src/modules/products/infra/databases/product.orm-entity';
export declare class OrderOrmEntity {
    id: number;
    uuid: string;
    createdAt: Date;
    user: UserOrmEntity | null;
    document: DocumentOrmEntity | null;
    count: number;
    hoja: HojaOrmEntity | null;
    enganche: ProductOrmEntity | null;
    description: string;
    subtotal: number;
    total: number;
}
