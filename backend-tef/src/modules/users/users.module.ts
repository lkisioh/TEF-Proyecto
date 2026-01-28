import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infra/databases/user.orm-entity';
import { UsersService } from './application/services/users.service';
import { UserRepositoryImpl } from './infra/repositories/user.repository.impl';
import { UsersController } from './infra/controllers/users.controller';
import { USER_REPOSITORY } from '../tokkens/user.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    UserRepositoryImpl,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
  ],
  exports: [UsersService, USER_REPOSITORY],
})
export class UsersModule {}
