import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductOrmEntity } from './infra/databases/product.orm-entity';
import { ProductsService } from './application/services/products.service';
import { ProductRepositoryImpl } from './infra/repositories/product.repository.impl';
import { ProductsController } from './infra/controllers/products.controller';
import { PRODUCT_REPOSITORY } from './../tokkens/product.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([ProductOrmEntity])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProductRepositoryImpl,
    {
      provide: PRODUCT_REPOSITORY,
      useClass: ProductRepositoryImpl,
    },
  ],
  exports: [ProductsService, PRODUCT_REPOSITORY],
})
export class ProductsModule {}
