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
const order_orm_entity_1 = require("../databases/order.orm-entity");
const order_details_orm_entity_1 = require("../databases/order-details.orm-entity");
const order_entity_1 = require("../../domain/entities/order.entity");
const order_detail_entity_1 = require("../../domain/entities/order-detail.entity");
let OrderRepositoryImpl = class OrderRepositoryImpl {
    dataSource;
    orderRepo;
    constructor(dataSource, orderRepo) {
        this.dataSource = dataSource;
        this.orderRepo = orderRepo;
    }
    async create(order) {
        return this.dataSource.transaction(async (manager) => {
            const orderData = {
                uuid: order.uuid,
                estado: order.estado,
                notes: order.notes ?? '',
                total: order.total,
                userUuid: order.userUuid ?? undefined,
            };
            const orderOrm = manager.create(order_orm_entity_1.OrderOrmEntity, orderData);
            const savedOrder = await manager.save(order_orm_entity_1.OrderOrmEntity, orderOrm);
            const detailOrms = order.details.map((d) => {
                const detailData = {
                    uuid: d.uuid,
                    orderUuid: savedOrder.uuid,
                    documentUuid: d.documentUuid,
                    hojaUuid: d.hojaUuid,
                    engancheUuid: d.engancheUuid,
                    count: d.count,
                    description: d.description ?? '',
                    unitPrice: d.unitPrice,
                    subtotal: d.subtotal,
                };
                return manager.create(order_details_orm_entity_1.OrderDetailOrmEntity, detailData);
            });
            await manager.save(order_details_orm_entity_1.OrderDetailOrmEntity, detailOrms);
            return this.toDomain(savedOrder, detailOrms);
        });
    }
    async findAll() {
        const rows = await this.orderRepo.find({
            relations: { details: true, user: true },
            order: { createdAt: 'DESC' },
        });
        return rows.map((o) => this.toDomain(o, o.details ?? []));
    }
    async findByUuid(uuid) {
        const row = await this.orderRepo.findOne({
            where: { uuid },
            relations: { details: true, user: true },
        });
        if (!row)
            return null;
        return this.toDomain(row, row.details ?? []);
    }
    async delete(uuid) {
        await this.orderRepo.delete({ uuid });
    }
    toDomain(orderOrm, detailsOrm) {
        const o = new order_entity_1.OrderEntity();
        o.uuid = orderOrm.uuid;
        o.createdAt = orderOrm.createdAt;
        o.userUuid = orderOrm.userUuid ?? null;
        o.estado = orderOrm.estado;
        o.notes = orderOrm.notes;
        o.total = orderOrm.total;
        o.details = detailsOrm.map((d) => {
            const dd = new order_detail_entity_1.OrderDetailEntity();
            dd.uuid = d.uuid;
            dd.documentUuid = d.document?.uuid;
            dd.hojaUuid = d.hoja?.uuid;
            dd.engancheUuid = d.enganche?.uuid;
            dd.count = d.count;
            dd.description = d.description;
            dd.unitPrice = d.unitPrice;
            dd.subtotal = d.subtotal;
            return dd;
        });
        return o;
    }
};
exports.OrderRepositoryImpl = OrderRepositoryImpl;
exports.OrderRepositoryImpl = OrderRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(order_orm_entity_1.OrderOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], OrderRepositoryImpl);
//# sourceMappingURL=order.repository.impl.js.map