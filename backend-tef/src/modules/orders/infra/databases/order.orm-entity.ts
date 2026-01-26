import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { DocumentOrmEntity } from 'src/modules/documents/infra/databases/document.orm-entity';
import { UserOrmEntity } from 'src/modules/users/infra/databases/user.orm-entity';
import { HojaOrmEntity } from './hoja.orm-entity';
import { ProductOrmEntity } from 'src/modules/products/infra/databases/product.orm-entity';

@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => UserOrmEntity, (u) => u.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userUuid' })
  user: UserOrmEntity | null;

  @ManyToOne(() => DocumentOrmEntity, (d) => d.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'documentUuid' })
  document: DocumentOrmEntity | null;

  @Column()
  count: number;

  @ManyToOne(() => HojaOrmEntity, (h) => h.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'hojaUuid' })
  hoja: HojaOrmEntity | null;

  @ManyToOne(() => ProductOrmEntity, (p) => p.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'productUuid' })
  enganche: ProductOrmEntity | null;

  @Column({ default: null })
  description: string;

  @Column()
  subtotal: number;

  @Column()
  total: number;
}
