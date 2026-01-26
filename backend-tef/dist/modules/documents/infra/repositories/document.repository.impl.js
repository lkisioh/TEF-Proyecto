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
exports.DocumentRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
const document_orm_entity_1 = require("../databases/document.orm-entity");
const document_entity_1 = require("../../domain/entities/document.entity");
let DocumentRepositoryImpl = class DocumentRepositoryImpl {
    documentRepo;
    constructor(documentRepo) {
        this.documentRepo = documentRepo;
    }
    async createDocument(dto) {
        const document = this.documentRepo.create({
            uuid: (0, uuid_1.v4)(),
            fileName: dto.fileName,
            contentType: dto.contentType,
            data: dto.data,
        });
        const saved = await this.documentRepo.save(document);
        const domainDocument = new document_entity_1.DocumentEntity();
        Object.assign(domainDocument, {
            id: saved.id,
            uuid: saved.uuid,
            fileName: saved.fileName,
            contentType: saved.contentType,
            data: saved.data,
            createdAt: saved.createdAt,
        });
        return domainDocument;
    }
    async findAll() {
        const entities = await this.documentRepo.find();
        return entities.map((entity) => {
            const products = new document_entity_1.DocumentEntity();
            Object.assign(products, {
                uuid: entity.uuid,
                fileName: entity.fileName,
                contentType: entity.contentType,
                data: entity.data,
                createdAt: entity.createdAt,
            });
            return products;
        });
    }
    async findByUuid(uuid) {
        const entity = await this.documentRepo.findOne({ where: { uuid } });
        if (!entity)
            return null;
        const productFind = new document_entity_1.DocumentEntity();
        Object.assign(productFind, {
            uuid: entity.uuid,
            fileName: entity.fileName,
            contentType: entity.contentType,
            data: entity.data,
            createdAt: entity.createdAt,
        });
        return productFind;
    }
    async update(dto, uuid) {
        await this.documentRepo.update({ uuid }, dto);
        const updatedEntity = await this.documentRepo.findOne({ where: { uuid } });
        if (!updatedEntity) {
            return 'Product not found';
        }
        const updatedDocument = new document_entity_1.DocumentEntity();
        Object.assign(updatedDocument, {
            uuid: updatedEntity.uuid,
            fileName: updatedEntity.fileName,
            contentType: updatedEntity.contentType,
            data: updatedEntity.data,
            createdAt: updatedEntity.createdAt,
        });
        return updatedDocument;
    }
    async delete(uuid) {
        await this.documentRepo.delete({ uuid });
    }
    async exists(uuid) {
        const count = await this.documentRepo.count({ where: { uuid } });
        return count > 0;
    }
};
exports.DocumentRepositoryImpl = DocumentRepositoryImpl;
exports.DocumentRepositoryImpl = DocumentRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(document_orm_entity_1.DocumentOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DocumentRepositoryImpl);
//# sourceMappingURL=document.repository.impl.js.map