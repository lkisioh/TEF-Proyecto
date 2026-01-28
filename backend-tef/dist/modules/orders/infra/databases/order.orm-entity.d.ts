import { UserOrmEntity } from 'src/modules/users/infra/databases/user.orm-entity';
import { OrderDetailOrmEntity } from './order-details.orm-entity';
export declare class OrderOrmEntity {
    id: number;
    uuid: string;
    createdAt: Date;
    userUuid: string | null;
    user: UserOrmEntity | null;
    estado: string;
    details: OrderDetailOrmEntity[];
    notes: string;
    total: number;
}
