import { OrderOrmEntity } from "./order.orm-entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'hojas' })
export class HojaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ nullable: true })
  gramaje: number;

  @Column()
  precioBynSimple: number;

  @Column()
  precioBynDobleFaz: number;

  @Column()
  precioColorSimple: number;

  @Column()
  precioColorDobleFaz: number;

  @Column({ default: null })
  description: string;

  @OneToMany(() => OrderOrmEntity, (h) => h.hoja)
  orders: OrderOrmEntity[];
}
