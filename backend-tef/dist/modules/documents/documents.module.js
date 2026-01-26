"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const document_orm_entity_1 = require("./infra/databases/document.orm-entity");
const documents_service_1 = require("./application/services/documents.service");
const document_repository_impl_1 = require("./infra/repositories/document.repository.impl");
const documents_controller_1 = require("./infra/controllers/documents.controller");
const document_tokkens_1 = require("./../tokkens/document.tokkens");
let DocumentsModule = class DocumentsModule {
};
exports.DocumentsModule = DocumentsModule;
exports.DocumentsModule = DocumentsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([document_orm_entity_1.DocumentOrmEntity])],
        controllers: [documents_controller_1.DocumentsController],
        providers: [
            documents_service_1.DocumentsService,
            document_repository_impl_1.DocumentRepositoryImpl,
            {
                provide: document_tokkens_1.DOCUMENT_REPOSITORY,
                useClass: document_repository_impl_1.DocumentRepositoryImpl,
            },
        ],
        exports: [documents_service_1.DocumentsService],
    })
], DocumentsModule);
//# sourceMappingURL=documents.module.js.map