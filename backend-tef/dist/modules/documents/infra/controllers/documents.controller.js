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
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const documents_service_1 = require("../../application/services/documents.service");
let DocumentsController = class DocumentsController {
    docs;
    constructor(docs) {
        this.docs = docs;
    }
    async uploadFile(file) {
        if (!file)
            throw new common_1.BadRequestException('No llegó el archivo (campo "file")');
        if (!file.mimetype?.includes('pdf') &&
            !file.originalname.toLowerCase().endsWith('.pdf')) {
            throw new common_1.BadRequestException('Solo PDF');
        }
        if (!file.buffer?.length) {
            throw new common_1.BadRequestException('No llegó el buffer (¿memoryStorage?)');
        }
        const dto = {
            fileName: file.originalname,
            contentType: file.mimetype ?? 'application/pdf',
            data: file.buffer,
        };
        return this.docs.create(dto);
    }
    list() {
        return this.docs.findAll();
    }
    async download(uuid, res) {
        const doc = await this.docs.findOne(uuid);
        res.setHeader('Content-Type', doc.contentType);
        res.setHeader('Content-Disposition', `inline; filename="${doc.fileName}"`);
        return res.send(doc.data);
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DocumentsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    __param(0, (0, common_1.Param)('uuid')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "download", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map