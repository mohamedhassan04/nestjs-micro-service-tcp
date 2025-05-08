import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProductsDto } from 'apps/products/src/dto/products.dto';

@Injectable()
export class ProductGatewayService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  async createProduct(dto: ProductsDto) {
    return this.client.send({ cmd: 'create product' }, dto);
  }

  async getAllProducts() {
    return this.client.send({ cmd: 'get products' }, {});
  }

  async getAllProductsByUserId(userId: string) {
    return this.client.send({ cmd: 'get products by user' }, userId);
  }
}
