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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const uuid_1 = require("uuid");
const order_entity_1 = require("../../domain/entities/order.entity");
const common_3 = require("@nestjs/common");
const order_tokens_1 = require("../../../tokkens/order.tokens");
const user_tokens_1 = require("../../../tokkens/user.tokens");
const document_tokkens_1 = require("../../../tokkens/document.tokkens");
const product_tokens_1 = require("../../../tokkens/product.tokens");
const order_detail_entity_1 = require("../../domain/entities/order-detail.entity");
let OrdersService = class OrdersService {
    orderRepository;
    productRepository;
    userRepository;
    documentRepository;
    constructor(orderRepository, productRepository, userRepository, documentRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
    }
    async findAll() {
        return await this.orderRepository.findAll();
    }
    async findOne(uuid) {
        const order = await this.orderRepository.findByUuid(uuid);
        if (!order)
            throw new common_2.NotFoundException('Pedido no encontrado');
        return order;
    }
    async create(dto) {
        if (dto.userUuid) {
            const user = await this.userRepository.findByUuid(dto.userUuid);
            if (!user)
                throw new common_2.NotFoundException('Usuario no encontrado');
        }
        const order = new order_entity_1.OrderEntity();
        order.uuid = (0, uuid_1.v4)();
        order.userUuid = dto.userUuid ?? 'Consumidor Final';
        order.estado = 'PENDIENTE';
        order.notes = dto.notes ?? '';
        order.details = [];
        order.total = 0;
        let total = 0;
        for (const d of dto.details) {
            const doc = await this.documentRepository.findByUuid(d.documentUuid);
            if (!doc)
                throw new common_2.NotFoundException(`Documento no existe: ${d.documentUuid}`);
            const hoja = await this.productRepository.findByUuid(d.hojaUuid);
            if (!hoja)
                throw new common_2.NotFoundException(`Hoja no existe: ${d.hojaUuid}`);
            const enganche = d.productUuid
                ? await this.productRepository.findByUuid(d.productUuid)
                : null;
            if (d.productUuid && !enganche) {
                throw new common_2.NotFoundException(`Enganche no existe: ${d.productUuid}`);
            }
            const hojaPrice = Number(hoja.price ?? 0);
            const enganchePrice = Number(enganche?.price ?? 0);
            if (hojaPrice < 0 || enganchePrice < 0)
                throw new common_3.BadRequestException('Precios inválidos');
            const unitPrice = hojaPrice + enganchePrice;
            const subtotal = unitPrice * d.count;
            const detail = new order_detail_entity_1.OrderDetailEntity();
            detail.uuid = (0, uuid_1.v4)();
            detail.documentUuid = d.documentUuid;
            detail.hojaUuid = d.hojaUuid;
            detail.engancheUuid = d.productUuid;
            detail.count = d.count;
            detail.description = d.description ?? '';
            detail.unitPrice = unitPrice;
            detail.subtotal = subtotal;
            order.details.push(detail);
            total += subtotal;
        }
        order.total = total;
        return this.orderRepository.create(order);
    }
    async remove(uuid) {
        return await this.orderRepository.delete(uuid);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(order_tokens_1.ORDER_REPOSITORY)),
    __param(1, (0, common_1.Inject)(product_tokens_1.PRODUCT_REPOSITORY)),
    __param(2, (0, common_1.Inject)(user_tokens_1.USER_REPOSITORY)),
    __param(3, (0, common_1.Inject)(document_tokkens_1.DOCUMENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, Object])
], OrdersService);
//# sourceMappingURL=orders.services.js.map