import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserOrmEntity } from './modules/users/infra/databases/user.orm-entity';
import { UsersModule } from './modules/users/users.module';

import { ProductOrmEntity } from './modules/products/infra/databases/product.orm-entity';
import { ProductsModule } from './modules/products/products.module';

import { DocumentOrmEntity } from './modules/documents/infra/databases/document.orm-entity';
import { DocumentsModule } from './modules/documents/documents.module';

import { OrderOrmEntity } from './modules/orders/infra/databases/order.orm-entity';
import { OrderDetailOrmEntity } from './modules/orders/infra/databases/order-details.orm-entity';
import { OrdersModule } from './modules/orders/orders.module';
import { HojaOrmEntity } from './modules/orders/infra/databases/hoja.orm-entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [
        UserOrmEntity,
        ProductOrmEntity,
        DocumentOrmEntity,
        HojaOrmEntity,
        OrderOrmEntity,
        OrderDetailOrmEntity,
      ], // o autoLoadEntities: true
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    DocumentsModule,
    OrdersModule,
  ],
})
export class AppModule {}
