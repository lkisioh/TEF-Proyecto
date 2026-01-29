import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HojaOrmEntity } from './infra/databases/hoja.orm-entity';
import { HojasController } from './infra/controllers/hojas.controller';
import { HojasService } from './application/services/hojas.services';
import { HOJA_REPOSITORY } from '../tokkens/hoja.tokkens';
import { HojasRepositoryImpl } from './infra/repositories/hoja.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([HojaOrmEntity])],
  controllers: [HojasController],
  providers: [
    HojasService,
    HojasRepositoryImpl,
    {
      provide: HOJA_REPOSITORY,
      useClass: HojasRepositoryImpl,
    },
  ],
  exports: [HojasService, HOJA_REPOSITORY],
})
export class HojasModule {}
