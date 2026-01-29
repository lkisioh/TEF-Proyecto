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
exports.HojasService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const hoja_entity_1 = require("../../domain/entities/hoja.entity");
const uuid_1 = require("uuid");
const hoja_tokkens_1 = require("../../../tokkens/hoja.tokkens");
let HojasService = class HojasService {
    hojaRepository;
    constructor(hojaRepository) {
        this.hojaRepository = hojaRepository;
    }
    async findAll() {
        return await this.hojaRepository.findAll();
    }
    async findOne(uuid) {
        const order = await this.hojaRepository.findByUuid(uuid);
        if (!order)
            throw new common_2.NotFoundException('Hoja no encontrado');
        return order;
    }
    async create(dto) {
        const hoja = new hoja_entity_1.HojaEntity();
        hoja.uuid = (0, uuid_1.v4)();
        hoja.tamano = dto.tamano;
        hoja.gramaje = dto.gramaje;
        hoja.precioBynSimple = dto.precioBynSimple;
        hoja.precioBynDobleFaz = dto.precioBynDobleFaz;
        hoja.precioColorSimple = dto.precioColorSimple;
        hoja.precioColorDobleFaz = dto.precioColorDobleFaz;
        hoja.description = dto.description;
        return await this.hojaRepository.create(hoja);
    }
    async remove(uuid) {
        return await this.hojaRepository.delete(uuid);
    }
};
exports.HojasService = HojasService;
exports.HojasService = HojasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(hoja_tokkens_1.HOJA_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], HojasService);
//# sourceMappingURL=hojas.services.js.map