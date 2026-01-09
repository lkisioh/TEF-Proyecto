import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserOrmEntity } from './modules/users/infra/databases/user.orm-entity';
import { UsersModule } from './modules/users/users.module';

import { ProductOrmEntity } from './modules/products/infra/databases/product.orm-entity';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [UserOrmEntity, ProductOrmEntity], // o autoLoadEntities: true
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
  ],
})
export class AppModule {}
