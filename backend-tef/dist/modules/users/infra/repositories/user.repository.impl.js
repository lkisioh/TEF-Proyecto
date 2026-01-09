"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const user_orm_entity_1 = require("../databases/user.orm-entity");
const user_entity_1 = require("../../domain/entities/user.entity");
let UserRepositoryImpl = class UserRepositoryImpl {
    userRepo;
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async findByEmail(email, password) {
        const user = await this.userRepo.findOne({ where: { email, password } });
        if (!user)
            return null;
        return { uuid: user.uuid };
    }
    async createUser(dto) {
        const user = this.userRepo.create({
            uuid: (0, uuid_1.v4)(),
            name: dto.name,
            surname: dto.surname,
            email: dto.email,
            password: dto.password,
            phone: dto.phone,
        });
        const saved = await this.userRepo.save(user);
        const domainUser = new user_entity_1.UserEntity();
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
    async findAll() {
        const entities = await this.userRepo.find();
        return entities.map((entity) => {
            const users = new user_entity_1.UserEntity();
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
    async findByUuid(uuid) {
        const entity = await this.userRepo.findOne({ where: { uuid } });
        if (!entity)
            return null;
        const userFind = new user_entity_1.UserEntity();
        Object.assign(userFind, {
            uuid: entity.uuid,
            name: entity.name,
            surname: entity.surname,
            email: entity.email,
        });
        return userFind;
    }
    async update(dto, uuid) {
        await this.userRepo.update({ uuid }, dto);
        const updatedEntity = await this.userRepo.findOne({ where: { uuid } });
        if (!updatedEntity) {
            return 'User not found';
        }
        const updatedUser = new user_entity_1.UserEntity();
        Object.assign(updatedUser, {
            uuid: updatedEntity.uuid,
            name: updatedEntity.name,
            surname: updatedEntity.surname,
            email: updatedEntity.email,
            phone: updatedEntity.phone,
        });
        return updatedUser;
    }
    async delete(uuid) {
        await this.userRepo.delete({ uuid });
    }
};
exports.UserRepositoryImpl = UserRepositoryImpl;
exports.UserRepositoryImpl = UserRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_orm_entity_1.UserOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserRepositoryImpl);
//# sourceMappingURL=user.repository.impl.js.map