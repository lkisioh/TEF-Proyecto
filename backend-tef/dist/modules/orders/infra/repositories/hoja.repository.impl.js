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
exports.HojasRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const hoja_orm_entity_1 = require("../databases/hoja.orm-entity");
const hoja_entity_1 = require("../../domain/entities/hoja.entity");
let HojasRepositoryImpl = class HojasRepositoryImpl {
    dataSource;
    hojaRepo;
    constructor(dataSource, hojaRepo) {
        this.dataSource = dataSource;
        this.hojaRepo = hojaRepo;
    }
    async create(hoja) {
        const orm = this.hojaRepo.create({
            uuid: hoja.uuid,
            tamano: hoja.tamano,
            tipo: hoja.tipo,
            gramaje: hoja.gramaje,
            precioBynSimple: hoja.precioBynSimple,
            precioBynDobleFaz: hoja.precioBynDobleFaz,
            precioColorSimple: hoja.precioColorSimple,
            precioColorDobleFaz: hoja.precioColorDobleFaz,
            description: hoja.description,
        });
        const saved = await this.hojaRepo.save(orm);
        const domain = new hoja_entity_1.HojaEntity();
        Object.assign(domain, saved);
        return domain;
    }
    async findAll() {
        const entities = await this.hojaRepo.find();
        return entities.map((entity) => {
            const hojas = new hoja_entity_1.HojaEntity();
            Object.assign(hojas, {
                uuid: entity.uuid,
                tamano: entity.tamano,
                tipo: entity.tipo,
                gramaje: entity.gramaje,
                precioBynSimple: entity.precioBynSimple,
                precioBynDobleFaz: entity.precioBynDobleFaz,
                precioColorSimple: entity.precioColorSimple,
                precioColorDobleFaz: entity.precioColorDobleFaz,
                description: entity.description,
            });
            return hojas;
        });
    }
    async findByUuid(uuid) {
        const entity = await this.hojaRepo.findOne({ where: { uuid } });
        if (!entity)
            return null;
        const hojaFind = new hoja_entity_1.HojaEntity();
        Object.assign(hojaFind, {
            uuid: entity.uuid,
            tamano: entity.tamano,
            gramaje: entity.gramaje,
            precioBynSimple: entity.precioBynSimple,
            precioBynDobleFaz: entity.precioBynDobleFaz,
            precioColorSimple: entity.precioColorSimple,
            precioColorDobleFa: entity.precioColorDobleFaz,
            description: entity.description,
        });
        return hojaFind;
    }
    async update(dto, uuid) {
        const nuevosValores = new hoja_orm_entity_1.HojaOrmEntity();
        Object.assign(dto, nuevosValores);
        await this.hojaRepo.update({ uuid }, nuevosValores);
        const updatedEntity = await this.hojaRepo.findOne({ where: { uuid } });
        if (!updatedEntity) {
            return 'Product not found';
        }
        const updatedHoja = new hoja_entity_1.HojaEntity();
        Object.assign(updatedHoja, {
            tamano: updatedHoja.tamano,
            gramaje: updatedHoja.gramaje,
            precioBynSimple: updatedHoja.precioBynSimple,
            precioBynDobleFaz: updatedHoja.precioBynDobleFaz,
            precioColorSimple: updatedHoja.precioColorSimple,
            precioColorDobleFa: updatedHoja.precioColorDobleFaz,
            description: updatedHoja.description,
        });
        return updatedHoja;
    }
    async delete(uuid) {
        await this.hojaRepo.delete({ uuid });
    }
};
exports.HojasRepositoryImpl = HojasRepositoryImpl;
exports.HojasRepositoryImpl = HojasRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(hoja_orm_entity_1.HojaOrmEntity)),
    __metadata("design:paramtypes", [typeorm_2.DataSource,
        typeorm_2.Repository])
], HojasRepositoryImpl);
//# sourceMappingURL=hoja.repository.impl.js.map