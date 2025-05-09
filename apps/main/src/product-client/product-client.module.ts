import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductGatewayService } from './product-client.service';
import { ProductClientController } from './product-client.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'PRODUCT_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => {
          const host = config.get<string>('SERVICE_HOST');
          const port = config.get<number>('PRODUCTS_SERVICE_HOST');
          return {
            transport: Transport.TCP,
            options: {
              host,
              port,
            },
          };
        },
      },
    ]),
  ],
  providers: [ProductGatewayService],
  controllers: [ProductClientController],
  exports: [ClientsModule, ProductGatewayService],
})
export class ProductClientModule {}
