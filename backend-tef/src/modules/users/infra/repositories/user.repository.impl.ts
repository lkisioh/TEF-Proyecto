import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { UserOrmEntity } from '../databases/user.orm-entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';

import { UserEntity } from '../../domain/entities/user.entity';

import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { CreateUserDto } from '../../application/dto/create-user.dto';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly userRepo: Repository<UserOrmEntity>,
  ) {}

  async findByEmail(
    email: string,
    password: string,
  ): Promise<{ uuid: string } | null> {
    const user = await this.userRepo.findOne({ where: { email, password } });
    if (!user) return null;
    return { uuid: user.uuid };
  }

  async createUser(dto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepo.create({
      uuid: uuidv4(),
      name: dto.name,
      surname: dto.surname,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
    });

    const saved = await this.userRepo.save(user);

    const domainUser = new UserEntity();
    Object.assign(domainUser, {
      id: saved.id,
      uuid: saved.uuid,
      name: saved.name,
      surname: saved.surname,
      email: saved.email,
      password: saved.password,
      phone: saved.phone,
      role: saved.role,
    });

    return domainUser;
  }

  async findAll(): Promise<UserEntity[]> {
    const entities = await this.userRepo.find();
    return entities.map((entity) => {
      const users = new UserEntity();
      Object.assign(users, {
        uuid: entity.uuid,
        name: entity.name,
        surname: entity.surname,
        email: entity.email,
        phone: entity.phone,
      });
      return users;
    });
  }

  async findByUuid(uuid: string): Promise<UserEntity | null> {
    const entity = await this.userRepo.findOne({ where: { uuid } });
    if (!entity) return null;

    const userFind = new UserEntity();
    Object.assign(userFind, {
      uuid: entity.uuid,
      name: entity.name,
      surname: entity.surname,
      email: entity.email,
    });

    return userFind;
  }
  async update(dto: UpdateUserDto, uuid: string): Promise<UserEntity | string> {
    await this.userRepo.update({ uuid }, dto);
    const updatedEntity = await this.userRepo.findOne({ where: { uuid } });

    if (!updatedEntity) {
      return 'User not found';
    }
    const updatedUser = new UserEntity();
    Object.assign(updatedUser, {
      uuid: updatedEntity.uuid,
      name: updatedEntity.name,
      surname: updatedEntity.surname,
      email: updatedEntity.email,
      phone: updatedEntity.phone,
    });
    return updatedUser;
  }

  async delete(uuid: string): Promise<void> {
    await this.userRepo.delete({ uuid });
  }
}
