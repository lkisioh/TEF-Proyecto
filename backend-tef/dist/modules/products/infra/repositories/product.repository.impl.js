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
exports.ProductRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const product_orm_entity_1 = require("../databases/product.orm-entity");
const product_entity_1 = require("../../domain/entities/product.entity");
let ProductRepositoryImpl = class ProductRepositoryImpl {
    productRepo;
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async createProduct(dto) {
        const product = this.productRepo.create({
            uuid: (0, uuid_1.v4)(),
            name: dto.name,
            price: dto.price,
            description: dto.description,
        });
        const saved = await this.productRepo.save(product);
        const domainProduct = new product_entity_1.ProductEntity();
        Object.assign(domainProduct, {
            id: saved.id,
            uuid: saved.uuid,
            name: saved.name,
            price: saved.price,
            description: saved.description,
        });
        return domainProduct;
    }
    async findAll() {
        const entities = await this.productRepo.find();
        return entities.map((entity) => {
            const products = new product_entity_1.ProductEntity();
            Object.assign(products, {
                uuid: entity.uuid,
                name: entity.name,
                price: entity.price,
                description: entity.description,
            });
            return products;
        });
    }
    async findByUuid(uuid) {
        const entity = await this.productRepo.findOne({ where: { uuid } });
        if (!entity)
            return null;
        const productFind = new product_entity_1.ProductEntity();
        Object.assign(productFind, {
            uuid: entity.uuid,
            name: entity.name,
            price: entity.price,
            description: entity.description,
        });
        return productFind;
    }
    async update(dto, uuid) {
        await this.productRepo.update({ uuid }, dto);
        const updatedEntity = await this.productRepo.findOne({ where: { uuid } });
        if (!updatedEntity) {
            return 'Product not found';
        }
        const updatedProduct = new product_entity_1.ProductEntity();
        Object.assign(updatedProduct, {
            uuid: updatedEntity.uuid,
            name: updatedEntity.name,
            price: updatedEntity.price,
            description: updatedEntity.description,
        });
        return updatedProduct;
    }
    async delete(uuid) {
        await this.productRepo.delete({ uuid });
    }
};
exports.ProductRepositoryImpl = ProductRepositoryImpl;
exports.ProductRepositoryImpl = ProductRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_orm_entity_1.ProductOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductRepositoryImpl);
//# sourceMappingURL=product.repository.impl.js.map