import { Controller, Post, Body, Get } from '@nestjs/common';
import { ProductGatewayService } from './product-client.service';
import { ProductsDto } from 'apps/products/src/dto/products.dto';

@Controller('product')
export class ProductClientController {
  constructor(private readonly productGateway: ProductGatewayService) {}

  @Post('create')
  async createProduct(@Body() dto: ProductsDto) {
    return await this.productGateway.createProduct(dto);
  }

  @Get('get-all')
  async getAllProducts() {
    return await this.productGateway.getAllProducts();
  }
}
