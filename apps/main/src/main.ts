import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global validation (DTO validation)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  // Optionally enable CORS
  app.enableCors();

  // Start microservice listeners (if any)
  await app.startAllMicroservices();

  // Start HTTP server
  await app.listen(3000);
}
bootstrap();
