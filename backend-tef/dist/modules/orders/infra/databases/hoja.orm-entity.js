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
exports.HojaOrmEntity = void 0;
const order_orm_entity_1 = require("./order.orm-entity");
const typeorm_1 = require("typeorm");
let HojaOrmEntity = class HojaOrmEntity {
    id;
    uuid;
    gramaje;
    precioBynSimple;
    precioBynDobleFaz;
    precioColorSimple;
    precioColorDobleFaz;
    description;
    orders;
};
exports.HojaOrmEntity = HojaOrmEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], HojaOrmEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], HojaOrmEntity.prototype, "uuid", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], HojaOrmEntity.prototype, "gramaje", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HojaOrmEntity.prototype, "precioBynSimple", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HojaOrmEntity.prototype, "precioBynDobleFaz", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HojaOrmEntity.prototype, "precioColorSimple", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], HojaOrmEntity.prototype, "precioColorDobleFaz", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", String)
], HojaOrmEntity.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => order_orm_entity_1.OrderOrmEntity, (h) => h.hoja),
    __metadata("design:type", Array)
], HojaOrmEntity.prototype, "orders", void 0);
exports.HojaOrmEntity = HojaOrmEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'hojas' })
], HojaOrmEntity);
//# sourceMappingURL=hoja.orm-entity.js.map