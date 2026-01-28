import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { UserOrmEntity } from 'src/modules/users/infra/databases/user.orm-entity';
import { OrderDetailOrmEntity } from './order-details.orm-entity';
@Entity('orders')
export class OrderOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  userUuid: string | null;

  @ManyToOne(() => UserOrmEntity, (u) => u.orders, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'userUuid', referencedColumnName: 'uuid' })
  user: UserOrmEntity | null;

  @Column()
  estado: string;

  @OneToMany(() => OrderDetailOrmEntity, (d) => d.order, {
    cascade: true, // crea/actualiza detalles junto con el pedido
    eager: true, // opcional: trae details automáticamente
  })
  details: OrderDetailOrmEntity[];

  @Column({ default: '' })
  notes: string;

  @Column({ type: 'real', default: 0 })
  total: number;
}
