import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@app/database';
import { Product } from '@app/database/entities/products/products.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/products/.env', // Specify the path to your .env file
    }),
    TypeOrmModule.forFeature([Product]),
    // Import the DatabaseModule and pass the Product entity to it
    DatabaseModule.forRoot([Product]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
