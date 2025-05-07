import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { createDatabaseIfNotExists } from './config/create-database';

async function bootstrap() {
  await createDatabaseIfNotExists();

  // Temporarily create app just to access ConfigService
  const tempApp = await NestFactory.createApplicationContext(AuthModule);
  const tempConfigService = tempApp.get(ConfigService);
  const port = tempConfigService.get<number>('AUTH_MICROSERVICE_PORT', 5000); // fallback to 5000 if not set

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
        retryAttempts: 5,
        retryDelay: 3000,
      },
    },
  );

  const configService = app.get(ConfigService);
  console.log('Connecting to DB:', configService.get<string>('DB_NAME'));

  await app.listen();
  console.log(`🚀 Auth microservice is running on TCP port ${port}`);
}
bootstrap();
