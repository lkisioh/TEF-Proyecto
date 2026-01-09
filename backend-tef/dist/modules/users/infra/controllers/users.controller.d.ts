import { UsersService } from '../../application/services/users.service';
import { CreateUserDto } from '../../application/dto/create-user.dto';
import { UpdateUserDto } from '../../application/dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<import("../../domain/entities/user.entity").UserEntity>;
    findAll(): Promise<import("../../domain/entities/user.entity").UserEntity[]>;
    findOne(uuid: string): Promise<import("../../domain/entities/user.entity").UserEntity | null>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<string | import("../../domain/entities/user.entity").UserEntity>;
    remove(uuid: string): Promise<void>;
}
