"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_orm_entity_1 = require("./databases/order.orm-entity");
const orders_services_1 = require("../application/services/orders.services");
const order_repository_impl_1 = require("./repositories/order.repository.impl");
const orders_controller_1 = require("./controllers/orders.controller");
const order_tokens_1 = require("../../tokkens/order.tokens");
let OrdersModule = class OrdersModule {
};
exports.OrdersModule = OrdersModule;
exports.OrdersModule = OrdersModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([order_orm_entity_1.OrderOrmEntity])],
        controllers: [orders_controller_1.OrdersController],
        providers: [
            orders_services_1.OrdersService,
            order_repository_impl_1.OrderRepositoryImpl,
            {
                provide: order_tokens_1.ORDER_REPOSITORY,
                useClass: order_repository_impl_1.OrderRepositoryImpl,
            },
        ],
        exports: [orders_services_1.OrdersService],
    })
], OrdersModule);
//# sourceMappingURL=orders.module.js.map