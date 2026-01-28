import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { ProductOrmEntity } from '../databases/product.orm-entity';
import { IProductRepository } from '../../domain/repositories/product.repository.interface';

import { ProductEntity } from '../../domain/entities/product.entity';

import { UpdateProductDto } from '../../application/dto/update-product.dto';
import { CreateProductDto } from '../../application/dto/create-product.dto';

@Injectable()
export class ProductRepositoryImpl implements IProductRepository {
  constructor(
    @InjectRepository(ProductOrmEntity)
    private readonly productRepo: Repository<ProductOrmEntity>,
  ) {}

  async createProduct(dto: CreateProductDto): Promise<ProductEntity> {
    const product = this.productRepo.create({
      uuid: uuidv4(),
      name: dto.name,
      price: dto.price,
      description: dto.description,
      category: dto.category,
    });

    const saved = await this.productRepo.save(product);

    const domainProduct = new ProductEntity();
    Object.assign(domainProduct, {
      id: saved.id,
      uuid: saved.uuid,
      name: saved.name,
      price: saved.price,
      description: saved.description,
      category: saved.category,
    });

    return domainProduct;
  }

  async findAll(): Promise<ProductEntity[]> {
    const entities = await this.productRepo.find();
    return entities.map((entity) => {
      const products = new ProductEntity();
      Object.assign(products, {
        uuid: entity.uuid,
        name: entity.name,
        price: entity.price,
        description: entity.description,
        category: entity.category,
      });
      return products;
    });
  }

  async findByUuid(uuid: string): Promise<ProductEntity | null> {
    const entity = await this.productRepo.findOne({ where: { uuid } });
    if (!entity) return null;

    const productFind = new ProductEntity();
    Object.assign(productFind, {
      uuid: entity.uuid,
      name: entity.name,
      price: entity.price,
      description: entity.description,
    });

    return productFind;
  }
  async update(
    dto: UpdateProductDto,
    uuid: string,
  ): Promise<ProductEntity | string> {
    await this.productRepo.update({ uuid }, dto);
    const updatedEntity = await this.productRepo.findOne({ where: { uuid } });
    if (!updatedEntity) {
      return 'Product not found';
    }
    const updatedProduct = new ProductEntity();
    Object.assign(updatedProduct, {
      uuid: updatedEntity.uuid,
      name: updatedEntity.name,
      price: updatedEntity.price,
      description: updatedEntity.description,
    });
    return updatedProduct;
  }

  async delete(uuid: string): Promise<void> {
    await this.productRepo.delete({ uuid });
  }
}
