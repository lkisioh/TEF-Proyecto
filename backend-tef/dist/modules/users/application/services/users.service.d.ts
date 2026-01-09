import type { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: IUserRepository);
    create(createUserDto: CreateUserDto): Promise<import("../../domain/entities/user.entity").UserEntity>;
    findAll(): Promise<import("../../domain/entities/user.entity").UserEntity[]>;
    findOne(uuid: string): Promise<import("../../domain/entities/user.entity").UserEntity | null>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<string | import("../../domain/entities/user.entity").UserEntity>;
    remove(uuid: string): Promise<void>;
}
