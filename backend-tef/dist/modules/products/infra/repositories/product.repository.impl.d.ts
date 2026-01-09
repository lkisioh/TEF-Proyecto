import { Repository } from 'typeorm';
import { ProductOrmEntity } from '../databases/product.orm-entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { ProductEntity } from '../../domain/entities/product.entity';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { CreateProductDto } from '../../application/dto/create-product.dto';
export declare class ProductRepositoryImpl implements IProductRepository {
    private readonly productRepo;
    constructor(productRepo: Repository<ProductOrmEntity>);
    createProduct(dto: CreateProductDto): Promise<ProductEntity>;
    findAll(): Promise<ProductEntity[]>;
    findByUuid(uuid: string): Promise<ProductEntity | null>;
    update(dto: UpdateProductDto, uuid: string): Promise<ProductEntity | string>;
    delete(uuid: string): Promise<void>;
}
