import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { DocumentOrmEntity } from 'src/modules/documents/infra/databases/document.orm-entity';
import { HojaOrmEntity } from './hoja.orm-entity';
import { ProductOrmEntity } from 'src/modules/products/infra/databases/product.orm-entity';
import { OrderOrmEntity } from './order.orm-entity';
@Entity('order_details')
export class OrderDetailOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column()
  orderUuid: string;

  @ManyToOne(() => OrderOrmEntity, (o) => o.details, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'orderUuid', referencedColumnName: 'uuid' })
  order: OrderOrmEntity;

  @Column({ nullable: true })
  documentUuid: string | null;

  @ManyToOne(() => DocumentOrmEntity, (d) => d.orderDetails, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'documentUuid', referencedColumnName: 'uuid' })
  document: DocumentOrmEntity | null;

  @Column({ nullable: true })
  hojaUuid: string | null;

  @ManyToOne(() => HojaOrmEntity, (h) => h.orderDetails, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'hojaUuid', referencedColumnName: 'uuid' })
  hoja: HojaOrmEntity | null;

  @Column({ nullable: true })
  engancheUuid: string | null;

  @ManyToOne(() => ProductOrmEntity, (p) => p.orderDetails, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'engancheUuid', referencedColumnName: 'uuid' })
  enganche: ProductOrmEntity | null;

  @Column()
  count: number;

  @Column({ default: '' })
  description: string;

  @Column()
  unitPrice: number;

  @Column()
  subtotal: number;
}
