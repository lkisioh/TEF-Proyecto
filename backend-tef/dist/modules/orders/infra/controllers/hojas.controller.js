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
exports.HojasController = void 0;
const common_1 = require("@nestjs/common");
const hojas_services_1 = require("../../application/services/hojas.services");
const create_hoja_dto_1 = require("../../application/dto/hojas/create-hoja.dto");
const update_hoja_dto_1 = require("../../application/dto/hojas/update-hoja.dto");
let HojasController = class HojasController {
    hojasService;
    constructor(hojasService) {
        this.hojasService = hojasService;
    }
    create(createHojaDto) {
        return this.hojasService.create(createHojaDto);
    }
    findAll() {
        return this.hojasService.findAll();
    }
    findOne(uuid) {
        return this.hojasService.findOne(uuid);
    }
    update(uuid, updateHojaDto) {
        return 'Not implemented' + uuid + JSON.stringify(updateHojaDto);
    }
    remove(uuid) {
        return this.hojasService.remove(uuid);
    }
};
exports.HojasController = HojasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hoja_dto_1.CreateHojaDto]),
    __metadata("design:returntype", void 0)
], HojasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HojasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HojasController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hoja_dto_1.UpdateHojaDto]),
    __metadata("design:returntype", void 0)
], HojasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HojasController.prototype, "remove", null);
exports.HojasController = HojasController = __decorate([
    (0, common_1.Controller)('hojas'),
    __metadata("design:paramtypes", [hojas_services_1.HojasService])
], HojasController);
//# sourceMappingURL=hojas.controller.js.map