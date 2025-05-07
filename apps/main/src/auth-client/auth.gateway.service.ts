import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from 'apps/auth/src/dto/user.dto';

@Injectable()
export class AuthGatewayService {
  constructor(@Inject('AUTH_SERVICE') private readonly client: ClientProxy) {}

  async validateUser(userId: string) {
    return this.client.send({ cmd: 'validate-user' }, userId);
  }

  async login(dto: LoginDto) {
    return await this.client.send({ cmd: 'login' }, dto);
  }

  async register(dto: RegisterDto) {
    return await this.client.send({ cmd: 'register' }, dto);
  }
}
