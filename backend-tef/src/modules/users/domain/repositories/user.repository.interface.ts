import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { CreateUserDto } from '../../application/dto/create-user.dto';
export const USER_REPO = Symbol('USER_REPO');

export interface IUserRepository {
  findByEmail(
    email: string,
    password: string,
  ): Promise<{ uuid: string } | null>;
  createUser(user: CreateUserDto): Promise<UserEntity>;
  findAll(): Promise<UserEntity[]>;
  findByUuid(uuid: string): Promise<UserEntity | null>;
  update(user: UpdateUserDto, uuid: string): Promise<UserEntity | string>;
  delete(uuid: string): Promise<void>;
}
