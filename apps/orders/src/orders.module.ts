import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '../../../libs/database/src/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/orders/.env', // Specify the path to your .env file
    }),
    DatabaseModule, // Import the DatabaseModule here
  ],
})
export class OrdersModule {}
