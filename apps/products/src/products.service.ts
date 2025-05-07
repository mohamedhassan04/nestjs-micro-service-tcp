import { Product } from '@app/database/entities/products/products.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private _productRepo: Repository<Product>,
  ) {}
  async createProduct(dto: ProductsDto) {
    const product = this._productRepo.create(dto);
    await this._productRepo.save(product);
    return {
      message: 'Product created successfully',
      product,
    };
  }

  async getProducts() {
    const products = await this._productRepo.find();
    return {
      message: 'Products fetched successfully',
      products,
    };
  }
}
