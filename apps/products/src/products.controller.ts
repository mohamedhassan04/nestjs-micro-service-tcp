import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { ProductsDto } from './dto/products.dto';

@Controller()
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  // @desc Create a new product
  @MessagePattern({ cmd: 'create product' })
  async register(@Payload() dto: ProductsDto) {
    try {
      return await this.productsService.createProduct(dto);
    } catch (error) {
      console.log(error);
    }
  }

  // @desc Get all products
  @MessagePattern({ cmd: 'get products' })
  async getProducts() {
    try {
      return await this.productsService.getProducts();
    } catch (error) {
      console.log(error);
    }
  }
}
