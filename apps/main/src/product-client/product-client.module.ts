import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductGatewayService } from './product-client.service';
import { ProductClientController } from './product-client.controller';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3003,
          },
        }),
      },
    ]),
  ],
  providers: [ProductGatewayService],
  controllers: [ProductClientController],
  exports: [ClientsModule, ProductGatewayService],
})
export class ProductClientModule {}
