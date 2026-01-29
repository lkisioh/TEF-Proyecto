import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './infra/databases/order.orm-entity';
import { OrdersService } from './application/services/orders.services';
import { OrderRepositoryImpl } from './infra/repositories/order.repository.impl';
import { OrdersController } from './infra/controllers/orders.controller';
import { ORDER_REPOSITORY } from 'src/modules/tokkens/order.tokens';
import { OrderDetailOrmEntity } from './infra/databases/order-details.orm-entity';
import { ProductsModule } from 'src/modules/products/products.module';
import { UsersModule } from 'src/modules/users/users.module';
import { DocumentsModule } from 'src/modules/documents/documents.module';
import { HojasModule } from './hojas.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderOrmEntity, OrderDetailOrmEntity]),
    ProductsModule, // ✅ para PRODUCT_REPOSITORY
    UsersModule, // ✅ para USER_REPOSITORY
    DocumentsModule, // ✅ para DOCUMENT_REPOSITORY
    HojasModule,
  ],
  controllers: [OrdersController],
  providers: [
    OrdersService,
    OrderRepositoryImpl,
    {
      provide: ORDER_REPOSITORY,
      useClass: OrderRepositoryImpl,
    },
  ],
  exports: [OrdersService],
})
export class OrdersModule {}
