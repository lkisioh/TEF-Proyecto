"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngancheEntity = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const product_entity_1 = require("../../../products/domain/entities/product.entity");
class EngancheEntity extends (0, mapped_types_1.PartialType)(product_entity_1.ProductEntity) {
}
exports.EngancheEntity = EngancheEntity;
//# sourceMappingURL=enganche.entity.js.map