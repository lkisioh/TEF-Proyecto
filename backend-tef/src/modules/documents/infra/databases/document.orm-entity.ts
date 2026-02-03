import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { OrderDetailOrmEntity } from 'src/modules/orders/infra/databases/order-details.orm-entity';

@Entity('documents')
export class DocumentOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ type: 'text' })
  fileName: string;

  @Column({ type: 'text', default: 'application/pdf' })
  contentType: string;

  @Column({ type: 'integer' })
  cantidadPaginas: number;

  // En SQLite se guarda como BLOB
  @Column({ type: 'blob' })
  data: Buffer;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderDetailOrmEntity, (od) => od.document)
  orderDetails: OrderDetailOrmEntity[];
}
