import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { createDatabaseIfNotExists } from './config/create-database';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  await createDatabaseIfNotExists();

  // Temporarily create app just to access ConfigService
  const tempApp = await NestFactory.createApplicationContext(OrdersModule);
  const tempConfigService = tempApp.get(ConfigService);
  const port = tempConfigService.get<number>('ORDERS_MICROSERVICE_PORT', 8080); // fallback to 8080 if not set

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: port,
        retryAttempts: 5,
        retryDelay: 3000,
      },
    },
  );

  const configService = app.get(ConfigService);
  console.log('Connecting to DB:', configService.get<string>('DB_NAME'));

  await app.listen();
  console.log(`🚀 Orders microservice is running on TCP port ${port}`);
}
bootstrap();
