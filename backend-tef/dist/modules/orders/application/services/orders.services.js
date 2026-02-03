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
const hoja_tokkens_1 = require("../../../tokkens/hoja.tokkens");
const order_detail_entity_1 = require("../../domain/entities/order-detail.entity");
function pagesToPrint(pageCount, printType) {
    const pages = Number(pageCount ?? 0);
    if (pages <= 0)
        return 0;
    const isDoble = printType === 'byn_doble' || printType === 'col_doble';
    return isDoble ? Math.ceil(pages / 2) : pages;
}
function hojaUnitPrice(hoja, printType) {
    switch (printType) {
        case 'byn_simple':
            return Number(hoja.precioBynSimple ?? 0);
        case 'byn_doble':
            return Number(hoja.precioBynDobleFaz ?? 0);
        case 'col_simple':
            return Number(hoja.precioColorSimple ?? 0);
        case 'col_doble':
            return Number(hoja.precioColorDobleFaz ?? 0);
        default:
            return 0;
    }
}
let OrdersService = class OrdersService {
    orderRepository;
    productRepository;
    userRepository;
    documentRepository;
    hojasRepository;
    constructor(orderRepository, productRepository, userRepository, documentRepository, hojasRepository) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.documentRepository = documentRepository;
        this.hojasRepository = hojasRepository;
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
        order.userUuid = dto.userUuid ?? null;
        order.estado = 'PENDIENTE';
        order.notes = dto.notes ?? '';
        order.details = [];
        order.total = 0;
        let total = 0;
        for (const d of dto.details) {
            const doc = await this.documentRepository.findByUuid(d.documentUuid);
            if (!doc)
                throw new common_2.NotFoundException(`Documento no existe: ${d.documentUuid}`);
            const pageCount = doc.cantidadPaginas ?? 0;
            if (pageCount <= 0)
                throw new common_3.BadRequestException('El documento no tiene páginas válidas');
            const hoja = await this.hojasRepository.findByUuid(d.hojaUuid);
            if (!hoja)
                throw new common_2.NotFoundException(`Hoja no existe: ${d.hojaUuid}`);
            let enganchePrice = 0;
            let engancheUuid = undefined;
            if (d.productUuid) {
                const enganche = await this.productRepository.findByUuid(d.productUuid);
                if (!enganche)
                    throw new common_2.NotFoundException(`Enganche no existe: ${d.productUuid}`);
                engancheUuid = enganche.uuid;
                enganchePrice = enganche.price;
            }
            const printType = d.printType ?? 'byn_simple';
            const pagesPrinted = pagesToPrint(pageCount, printType);
            const hojaPrice = hojaUnitPrice(hoja, printType);
            if (hojaPrice < 0 || enganchePrice < 0)
                throw new common_3.BadRequestException('Precios inválidos');
            if (!d.cantidad || d.cantidad < 1)
                throw new common_3.BadRequestException('Cantidad inválida');
            const unitPrice = pagesPrinted * hojaPrice;
            const subtotal = unitPrice * Number(d.cantidad) + enganchePrice;
            const detail = new order_detail_entity_1.OrderDetailEntity();
            detail.uuid = (0, uuid_1.v4)();
            detail.documentUuid = d.documentUuid;
            detail.hojaUuid = d.hojaUuid;
            detail.engancheUuid = engancheUuid ?? null;
            detail.documentPageNumber = pagesPrinted;
            detail.cantidad = Number(d.cantidad);
            detail.description = d.description ?? '';
            detail.precioHoja = hojaPrice;
            detail.precioEnganche = enganchePrice;
            detail.precioUnitario = unitPrice;
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
    __param(4, (0, common_1.Inject)(hoja_tokkens_1.HOJA_REPOSITORY)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object])
], OrdersService);
//# sourceMappingURL=orders.services.js.map