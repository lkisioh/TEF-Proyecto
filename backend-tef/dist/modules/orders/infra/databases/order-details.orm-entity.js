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
exports.OrderDetailOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const document_orm_entity_1 = require("../../../documents/infra/databases/document.orm-entity");
const hoja_orm_entity_1 = require("./hoja.orm-entity");
const product_orm_entity_1 = require("../../../products/infra/databases/product.orm-entity");
const order_orm_entity_1 = require("./order.orm-entity");
let OrderDetailOrmEntity = class OrderDetailOrmEntity {
    id;
    uuid;
    orderUuid;
    order;
    documentUuid;
    document;
    documentPageNumber;
    hojaUuid;
    hoja;
    precioHoja;
    engancheUuid;
    enganche;
    precioEnganche;
    cantidad;
    description;
    precioUnitario;
    subtotal;
};
exports.OrderDetailOrmEntity = OrderDetailOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderDetailOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], OrderDetailOrmEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], OrderDetailOrmEntity.prototype, "orderUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => order_orm_entity_1.OrderOrmEntity, (o) => o.details, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'orderUuid', referencedColumnName: 'uuid' }),
    __metadata("design:type", order_orm_entity_1.OrderOrmEntity)
], OrderDetailOrmEntity.prototype, "order", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], OrderDetailOrmEntity.prototype, "documentUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => document_orm_entity_1.DocumentOrmEntity, (d) => d.orderDetails, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'documentUuid', referencedColumnName: 'uuid' }),
    __metadata("design:type", Object)
], OrderDetailOrmEntity.prototype, "document", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int', nullable: true }),
    __metadata("design:type", Object)
], OrderDetailOrmEntity.prototype, "documentPageNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], OrderDetailOrmEntity.prototype, "hojaUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => hoja_orm_entity_1.HojaOrmEntity, (h) => h.orderDetails, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'hojaUuid', referencedColumnName: 'uuid' }),
    __metadata("design:type", Object)
], OrderDetailOrmEntity.prototype, "hoja", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], OrderDetailOrmEntity.prototype, "precioHoja", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Object)
], OrderDetailOrmEntity.prototype, "engancheUuid", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => product_orm_entity_1.ProductOrmEntity, (p) => p.orderDetails, {
        nullable: true,
        onDelete: 'SET NULL',
    }),
    (0, typeorm_1.JoinColumn)({ name: 'engancheUuid', referencedColumnName: 'uuid' }),
    __metadata("design:type", Object)
], OrderDetailOrmEntity.prototype, "enganche", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], OrderDetailOrmEntity.prototype, "precioEnganche", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], OrderDetailOrmEntity.prototype, "cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: '' }),
    __metadata("design:type", String)
], OrderDetailOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], OrderDetailOrmEntity.prototype, "precioUnitario", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'real', default: 0 }),
    __metadata("design:type", Number)
], OrderDetailOrmEntity.prototype, "subtotal", void 0);
exports.OrderDetailOrmEntity = OrderDetailOrmEntity = __decorate([
    (0, typeorm_1.Entity)('order_details')
], OrderDetailOrmEntity);
//# sourceMappingURL=order-details.orm-entity.js.map