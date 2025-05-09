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
        useFactory: (config: ConfigService) => {
          const host = config.get<string>('SERVICE_HOST');
          const port = config.get<number>('AUTH_SERVICE_PORT');
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
  providers: [AuthGatewayService],
  controllers: [AuthClientController],
  exports: [ClientsModule, AuthGatewayService],
})
export class AuthClientModule {}
