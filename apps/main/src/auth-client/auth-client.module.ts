import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthGatewayService } from './auth.gateway.service';
import { AuthClientController } from './auth-client.controller';

@Module({
  imports: [
    ConfigModule,
    ClientsModule.registerAsync([
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: () => ({
          transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: 3001,
          },
        }),
      },
    ]),
  ],
  providers: [AuthGatewayService],
  controllers: [AuthClientController],
  exports: [ClientsModule, AuthGatewayService],
})
export class AuthClientModule {}
