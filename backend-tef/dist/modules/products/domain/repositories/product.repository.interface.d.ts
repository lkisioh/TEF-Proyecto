import { ProductEntity } from '../entities/product.entity';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { CreateProductDto } from '../../application/dto/create-product.dto';
export declare const PRODUCT_REPO: unique symbol;
export interface IProductRepository {
    createProduct(product: CreateProductDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    findByUuid(uuid: string): Promise<ProductEntity | null>;
    update(product: UpdateProductDto, uuid: string): Promise<ProductEntity | string>;
    delete(uuid: string): Promise<void>;
}
