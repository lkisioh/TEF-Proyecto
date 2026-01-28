"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const product_orm_entity_1 = require("./infra/databases/product.orm-entity");
const products_service_1 = require("./application/services/products.service");
const product_repository_impl_1 = require("./infra/repositories/product.repository.impl");
const products_controller_1 = require("./infra/controllers/products.controller");
const product_tokens_1 = require("./../tokkens/product.tokens");
let ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule;
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([product_orm_entity_1.ProductOrmEntity])],
        controllers: [products_controller_1.ProductsController],
        providers: [
            products_service_1.ProductsService,
            product_repository_impl_1.ProductRepositoryImpl,
            {
                provide: product_tokens_1.PRODUCT_REPOSITORY,
                useClass: product_repository_impl_1.ProductRepositoryImpl,
            },
        ],
        exports: [products_service_1.ProductsService, product_tokens_1.PRODUCT_REPOSITORY],
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map