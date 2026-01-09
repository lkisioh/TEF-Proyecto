import { ProductsService } from '../../application/services/products.service';
import { CreateProductDto } from '../../application/dto/create-product.dto';
import { UpdateProductDto } from '../../application/dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("../../domain/entities/product.entity").ProductEntity>;
    findAll(): Promise<import("../../domain/entities/product.entity").ProductEntity[]>;
    findOne(uuid: string): Promise<import("../../domain/entities/product.entity").ProductEntity | null>;
    update(uuid: string, updateProductDto: UpdateProductDto): Promise<string | import("../../domain/entities/product.entity").ProductEntity>;
    remove(uuid: string): Promise<void>;
}
