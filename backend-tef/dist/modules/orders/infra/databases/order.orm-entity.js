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
const document_orm_entity_1 = require("../../../documents/infra/databases/document.orm-entity");
const user_orm_entity_1 = require("../../../users/infra/databases/user.orm-entity");
const hoja_orm_entity_1 = require("./hoja.orm-entity");
const product_orm_entity_1 = require("../../../products/infra/databases/product.orm-entity");
let OrderOrmEntity = class OrderOrmEntity {
    id;
    uuid;
    createdAt;
    user;
    document;
    count;
    hoja;
    enganche;
    description;
    subtotal;
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
    (0, typeorm_1.ManyToOne)(() => user_orm_entity_1.UserOrmEntity, (u) => u.orders, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'userUuid' }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_orm_entity_1.DocumentOrmEntity, (d) => d.orders, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'documentUuid' }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderOrmEntity.prototype, "count", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hoja_orm_entity_1.HojaOrmEntity, (h) => h.orders, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'hojaUuid' }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "hoja", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_orm_entity_1.ProductOrmEntity, (p) => p.orders, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'productUuid' }),
    __metadata("design:type", Object)
], OrderOrmEntity.prototype, "enganche", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], OrderOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderOrmEntity.prototype, "subtotal", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderOrmEntity.prototype, "total", void 0);
exports.OrderOrmEntity = OrderOrmEntity = __decorate([
    (0, typeorm_1.Entity)('orders')
], OrderOrmEntity);
//# sourceMappingURL=order.orm-entity.js.map