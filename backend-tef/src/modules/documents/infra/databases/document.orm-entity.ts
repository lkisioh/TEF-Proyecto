import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { OrderOrmEntity } from 'src/modules/orders/infra/databases/order.orm-entity';

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

  // En SQLite se guarda como BLOB
  @Column({ type: 'blob' })
  data: Buffer;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => OrderOrmEntity, (o) => o.document)
  orders: OrderOrmEntity[];
}
