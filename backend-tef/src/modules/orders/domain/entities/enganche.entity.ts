import { PartialType } from '@nestjs/mapped-types';
import { ProductEntity } from 'src/modules/products/domain/entities/product.entity';

export class EngancheEntity extends PartialType(ProductEntity) {}
