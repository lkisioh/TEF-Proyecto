import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
export declare class ProductsService {
    private readonly productRepository;
    constructor(productRepository: IProductRepository);
    create(createProductDto: CreateProductDto): Promise<import("../../domain/entities/product.entity").ProductEntity>;
    findAll(): Promise<import("../../domain/entities/product.entity").ProductEntity[]>;
    findOne(uuid: string): Promise<import("../../domain/entities/product.entity").ProductEntity | null>;
    update(uuid: string, updateProductDto: UpdateProductDto): Promise<string | import("../../domain/entities/product.entity").ProductEntity>;
    remove(uuid: string): Promise<void>;
}
