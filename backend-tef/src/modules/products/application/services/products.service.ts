import { Injectable, Inject } from '@nestjs/common';
import { PRODUCT_REPOSITORY } from 'src/modules/tokkens/product.tokens';
import type { IProductRepository } from '../../domain/repositories/product.repository.interface';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(PRODUCT_REPOSITORY)
    private readonly productRepository: IProductRepository,
  ) {}
  async create(createProductDto: CreateProductDto) {
    return await this.productRepository.createProduct(createProductDto);
  }

  async findAll() {
    return await this.productRepository.findAll();
  }

  async findOne(uuid: string) {
    return await this.productRepository.findByUuid(uuid);
  }

  async update(uuid: string, updateProductDto: UpdateProductDto) {
    return await this.productRepository.update(updateProductDto, uuid);
  }

  async remove(uuid: string) {
    return await this.productRepository.delete(uuid);
  }
}
