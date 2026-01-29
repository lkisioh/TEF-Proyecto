import { OrderDetailOrmEntity } from "./order-details.orm-entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity({ name: 'hojas' })
export class HojaOrmEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uuid: string;

  @Column({ default: null })
  tamano: string;

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

  @Column({nullable : true})
  description: string;

  @OneToMany(() => OrderDetailOrmEntity, (h) => h.hoja)
  orderDetails: OrderDetailOrmEntity[];
}
