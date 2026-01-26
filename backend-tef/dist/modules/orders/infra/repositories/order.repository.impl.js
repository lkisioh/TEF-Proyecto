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
exports.OrderRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const order_orm_entity_1 = require("../databases/order.orm-entity");
const order_entity_1 = require("../../domain/entities/order.entity");
let OrderRepositoryImpl = class OrderRepositoryImpl {
    orderRepo;
    constructor(orderRepo) {
        this.orderRepo = orderRepo;
    }
    async createOrder(dto) {
        const order = this.orderRepo.create({
            uuid: (0, uuid_1.v4)(),
            user: dto.uuidUser ? { uuid: dto.uuidUser } : null,
            document: dto.documentUuid
                ? { uuid: dto.documentUuid }
                : null,
            count: dto.count,
            hoja: dto.hojaUuid ? { uuid: dto.hojaUuid } : null,
            enganche: dto.engancheUuid
                ? { uuid: dto.engancheUuid }
                : null,
            description: dto.description,
            subtotal: dto.subtotal,
            total: dto.total,
        });
        const saved = await this.orderRepo.save(order);
        const domainOrder = new order_entity_1.OrderEntity();
        Object.assign(domainOrder, {
            id: saved.id,
            uuid: saved.uuid,
            user: saved.user,
            createdAt: saved.createdAt,
            document: saved.document,
            count: saved.count,
            hoja: saved.hoja,
            enganche: saved.enganche,
            description: saved.description,
            subtotal: saved.subtotal,
            total: saved.total,
        });
        return domainOrder;
    }
    async findAll() {
        const entities = await this.orderRepo.find();
        return entities.map((entity) => {
            const orders = new order_entity_1.OrderEntity();
            Object.assign(orders, {
                uuid: entity.uuid,
                user: entity.user,
                createdAt: entity.createdAt,
                document: entity.document,
                count: entity.count,
                hoja: entity.hoja,
                enganche: entity.enganche,
                description: entity.description,
                subtotal: entity.subtotal,
                total: entity.total,
            });
            return orders;
        });
    }
    async findByUuid(uuid) {
        const entity = await this.orderRepo.findOne({ where: { uuid } });
        if (!entity)
            return null;
        const orderFind = new order_entity_1.OrderEntity();
        Object.assign(orderFind, {
            uuid: entity.uuid,
            user: entity.user,
            createdAt: entity.createdAt,
            document: entity.document,
            count: entity.count,
            hoja: entity.hoja,
            enganche: entity.enganche,
            description: entity.description,
            subtotal: entity.subtotal,
            total: entity.total,
        });
        return orderFind;
    }
    async update(dto, uuid) {
        await this.orderRepo.update({ uuid }, dto);
        const updatedEntity = await this.orderRepo.findOne({ where: { uuid } });
        if (!updatedEntity) {
            return 'Product not found';
        }
        const updatedOrder = new order_entity_1.OrderEntity();
        Object.assign(updatedOrder, {
            uuid: updatedEntity.uuid,
            user: updatedEntity.user,
            createdAt: updatedEntity.createdAt,
            document: updatedEntity.document,
            count: updatedEntity.count,
            hoja: updatedEntity.hoja,
            enganche: updatedEntity.enganche,
            description: updatedEntity.description,
            subtotal: updatedEntity.subtotal,
            total: updatedEntity.total,
        });
        return updatedOrder;
    }
    async delete(uuid) {
        await this.orderRepo.delete({ uuid });
    }
};
exports.OrderRepositoryImpl = OrderRepositoryImpl;
exports.OrderRepositoryImpl = OrderRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(order_orm_entity_1.OrderOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderRepositoryImpl);
//# sourceMappingURL=order.repository.impl.js.map