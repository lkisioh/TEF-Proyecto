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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const user_orm_entity_1 = require("../../../users/infra/databases/user.orm-entity");
const order_details_orm_entity_1 = require("./order-details.orm-entity");
let OrderOrmEntity = class OrderOrmEntity {
    id;
    uuid;
    createdAt;
    userUuid;
    user;
    estado;
    details;
    notes;
    total;
};
exports.OrderOrmEntity = OrderOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], OrderOrmEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "userUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, (u) => u.orders, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userUuid', referencedColumnName: 'uuid' }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderOrmEntity.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_details_orm_entity_1.OrderDetailOrmEntity, (d) => d.order, {
        cascade: true,
        eager: true,
    }),
    __metadata("design:type", Array)
], OrderOrmEntity.prototype, "details", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], OrderOrmEntity.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], OrderOrmEntity.prototype, "total", void 0);
exports.OrderOrmEntity = OrderOrmEntity = __decorate([
    (0, typeorm_1.Entity)('orders')
], OrderOrmEntity);
//# sourceMappingURL=order.orm-entity.js.map