import { Module } from '@nestjs/common';
import { AuthClientModule } from './auth-client/auth-client.module';
import { ProductClientModule } from './product-client/product-client.module';
import { AuthModule } from 'apps/auth/src/auth.module';

@Module({
  imports: [AuthClientModule, ProductClientModule, AuthModule],
})
export class AppModule {}
