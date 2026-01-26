import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderOrmEntity } from './databases/order.orm-entity';
import { OrdersService } from '../application/services/orders.services';
import { OrderRepositoryImpl } from './repositories/order.repository.impl';
import { OrdersController } from './controllers/orders.controller';
import { ORDER_REPOSITORY } from 'src/modules/tokkens/order.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([OrderOrmEntity])],
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
