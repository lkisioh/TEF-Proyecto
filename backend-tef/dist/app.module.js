"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_orm_entity_1 = require("./modules/users/infra/databases/user.orm-entity");
const users_module_1 = require("./modules/users/users.module");
const product_orm_entity_1 = require("./modules/products/infra/databases/product.orm-entity");
const products_module_1 = require("./modules/products/products.module");
const document_orm_entity_1 = require("./modules/documents/infra/databases/document.orm-entity");
const documents_module_1 = require("./modules/documents/documents.module");
const order_orm_entity_1 = require("./modules/orders/infra/databases/order.orm-entity");
const order_details_orm_entity_1 = require("./modules/orders/infra/databases/order-details.orm-entity");
const orders_module_1 = require("./modules/orders/orders.module");
const hoja_orm_entity_1 = require("./modules/orders/infra/databases/hoja.orm-entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'db.sqlite',
                entities: [
                    user_orm_entity_1.UserOrmEntity,
                    product_orm_entity_1.ProductOrmEntity,
                    document_orm_entity_1.DocumentOrmEntity,
                    hoja_orm_entity_1.HojaOrmEntity,
                    order_orm_entity_1.OrderOrmEntity,
                    order_details_orm_entity_1.OrderDetailOrmEntity,
                ],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            products_module_1.ProductsModule,
            documents_module_1.DocumentsModule,
            orders_module_1.OrdersModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map