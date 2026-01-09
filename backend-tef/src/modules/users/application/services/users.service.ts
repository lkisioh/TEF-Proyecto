import { Injectable, Inject } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/modules/tokkens/user.tokens';
import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}
  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.createUser(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(uuid: string) {
    return await this.userRepository.findByUuid(uuid);
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(updateUserDto, uuid);
  }

  async remove(uuid: string) {
    return await this.userRepository.delete(uuid);
  }
}
