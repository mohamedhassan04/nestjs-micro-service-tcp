import { Module } from '@nestjs/common';
import { AuthClientModule } from './auth-client/auth-client.module';
import { ProductClientModule } from './product-client/product-client.module';

@Module({
  imports: [AuthClientModule, ProductClientModule],
})
export class AppModule {}
