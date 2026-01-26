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
const order_tokens_1 = require("../../../tokkens/order.tokens");
const common_2 = require("@nestjs/common");
let OrdersService = class OrdersService {
    orderRepository;
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    async findAll() {
        return this.orderRepository.findAll();
    }
    async findOne(uuid) {
        const order = await this.orderRepository.findByUuid(uuid);
        if (!order)
            throw new common_2.NotFoundException('Pedido no encontrado');
        return order;
    }
    async create(createOrderDto) {
        return await this.orderRepository.createOrder(createOrderDto);
    }
    async update(uuid, updateOrderDto) {
        return await this.orderRepository.update(updateOrderDto, uuid);
    }
    async remove(uuid) {
        return await this.orderRepository.delete(uuid);
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(order_tokens_1.ORDER_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], OrdersService);
//# sourceMappingURL=orders.services.js.map