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
exports.DocumentOrmEntity = void 0;
const typeorm_1 = require("typeorm");
const order_details_orm_entity_1 = require("../../../orders/infra/databases/order-details.orm-entity");
let DocumentOrmEntity = class DocumentOrmEntity {
    id;
    uuid;
    fileName;
    contentType;
    cantidadPaginas;
    data;
    createdAt;
    orderDetails;
};
exports.DocumentOrmEntity = DocumentOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DocumentOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], DocumentOrmEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text' }),
    __metadata("design:type", String)
], DocumentOrmEntity.prototype, "fileName", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', default: 'application/pdf' }),
    __metadata("design:type", String)
], DocumentOrmEntity.prototype, "contentType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'integer' }),
    __metadata("design:type", Number)
], DocumentOrmEntity.prototype, "cantidadPaginas", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'blob' }),
    __metadata("design:type", Buffer)
], DocumentOrmEntity.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], DocumentOrmEntity.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_details_orm_entity_1.OrderDetailOrmEntity, (od) => od.document),
    __metadata("design:type", Array)
], DocumentOrmEntity.prototype, "orderDetails", void 0);
exports.DocumentOrmEntity = DocumentOrmEntity = __decorate([
    (0, typeorm_1.Entity)('documents')
], DocumentOrmEntity);
//# sourceMappingURL=document.orm-entity.js.map