import { OrderDetailOrmEntity } from "src/modules/orders/infra/databases/order-details.orm-entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'products' })
export class ProductOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  price: number;

  @Column({ default: null })
  description: string;

  @Column({ default: 'libreria' })
  category: string;

  @OneToMany(() => OrderDetailOrmEntity, (h) => h.enganche)
  orderDetails: OrderDetailOrmEntity[];
}
