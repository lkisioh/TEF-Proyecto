import { OrderOrmEntity } from "src/modules/orders/infra/databases/order.orm-entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'users' })
export class UserOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  surname: string;
  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => OrderOrmEntity, (o) => o.user)
  orders: OrderOrmEntity[];

  @Column()
  phone: string;

  @Column({ default: 'user' })
  role: string;
}
