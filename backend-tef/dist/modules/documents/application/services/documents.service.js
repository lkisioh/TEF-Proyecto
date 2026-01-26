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
exports.DocumentsService = void 0;
const common_1 = require("@nestjs/common");
const document_tokkens_1 = require("../../../tokkens/document.tokkens");
const common_2 = require("@nestjs/common");
let DocumentsService = class DocumentsService {
    documentRepository;
    constructor(documentRepository) {
        this.documentRepository = documentRepository;
    }
    async findAll() {
        return this.documentRepository.findAll();
    }
    async findOne(uuid) {
        const document = await this.documentRepository.findByUuid(uuid);
        if (!document)
            throw new common_2.NotFoundException('Documento no encontrado');
        return document;
    }
    async create(createDocumentDto) {
        return await this.documentRepository.createDocument(createDocumentDto);
    }
    async update(uuid, updateDocumentDto) {
        return await this.documentRepository.update(updateDocumentDto, uuid);
    }
    async remove(uuid) {
        return await this.documentRepository.delete(uuid);
    }
    async exists(uuid) {
        return this.documentRepository.findByUuid(uuid);
    }
};
exports.DocumentsService = DocumentsService;
exports.DocumentsService = DocumentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(document_tokkens_1.DOCUMENT_REPOSITORY)),
    __metadata("design:paramtypes", [Object])
], DocumentsService);
//# sourceMappingURL=documents.service.js.map