import { Repository } from 'typeorm';
import { UserOrmEntity } from '../databases/user.orm-entity';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserEntity } from '../../domain/entities/user.entity';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
import { CreateUserDto } from '../../application/dto/create-user.dto';
export declare class UserRepositoryImpl implements IUserRepository {
    private readonly userRepo;
    constructor(userRepo: Repository<UserOrmEntity>);
    findByEmail(email: string, password: string): Promise<{
        uuid: string;
    } | null>;
    createUser(dto: CreateUserDto): Promise<UserEntity>;
    findAll(): Promise<UserEntity[]>;
    findByUuid(uuid: string): Promise<UserEntity | null>;
    update(dto: UpdateUserDto, uuid: string): Promise<UserEntity | string>;
    delete(uuid: string): Promise<void>;
}
