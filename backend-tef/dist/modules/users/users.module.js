"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_orm_entity_1 = require("./infra/databases/user.orm-entity");
const users_service_1 = require("./application/services/users.service");
const user_repository_impl_1 = require("./infra/repositories/user.repository.impl");
const users_controller_1 = require("./infra/controllers/users.controller");
const user_tokens_1 = require("../tokkens/user.tokens");
let UsersModule = class UsersModule {
};
exports.UsersModule = UsersModule;
exports.UsersModule = UsersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_orm_entity_1.UserOrmEntity])],
        controllers: [users_controller_1.UsersController],
        providers: [
            users_service_1.UsersService,
            user_repository_impl_1.UserRepositoryImpl,
            {
                provide: user_tokens_1.USER_REPOSITORY,
                useClass: user_repository_impl_1.UserRepositoryImpl,
            },
        ],
        exports: [users_service_1.UsersService],
    })
], UsersModule);
//# sourceMappingURL=users.module.js.map