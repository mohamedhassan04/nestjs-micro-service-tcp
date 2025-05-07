import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { createDatabaseIfNotExists } from './config/create-database';
import { ProductsModule } from './products.module';

async function bootstrap() {
  await createDatabaseIfNotExists();

  // Temporarily create app just to access ConfigService
  const tempApp = await NestFactory.createApplicationContext(ProductsModule);
  const tempConfigService = tempApp.get(ConfigService);
  const port = tempConfigService.get<number>(
    'PRODUCTS_MICROSERVICE_PORT',
    5001,
  ); // fallback to 5001 if not set

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3003,
        retryAttempts: 5,
        retryDelay: 3000,
      },
    },
  );

  const configService = app.get(ConfigService);
  console.log('Connecting to DB:', configService.get<string>('DB_NAME'));

  await app.listen();
  console.log(`🚀 Products microservice is running on TCP port ${port}`);
}
bootstrap();
