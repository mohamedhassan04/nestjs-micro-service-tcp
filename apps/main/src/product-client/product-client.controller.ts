import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductGatewayService } from './product-client.service';
import { ProductsDto } from 'apps/products/src/dto/products.dto';
import { JwtAuthGuard } from 'apps/auth/src/guards/jwt.guard';

@Controller('product')
export class ProductClientController {
  constructor(private readonly productGateway: ProductGatewayService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(@Body() dto: ProductsDto, @Request() req: any) {
    // Extract userId from the request object
    const user = req.user; // Assuming the user ID is stored in req.user
    const productData = {
      ...dto,
      userId: user.userId.id, // send userId to product MS
    };
    return await this.productGateway.createProduct(productData);
  }

  @Get('get-all')
  async getAllProducts() {
    return await this.productGateway.getAllProducts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-all-by-user')
  async getAllProductsByUserId(@Request() req: any) {
    // Extract userId from the request object
    const user = req.user; // Assuming the user ID is stored in req.user
    const userId = user.userId.id; // send userId to product MS
    return await this.productGateway.getAllProductsByUserId(userId);
  }
}
