import { Controller, Post, Body } from '@nestjs/common';
import { AuthGatewayService } from './auth.gateway.service';
import { LoginDto, RegisterDto } from 'apps/auth/src/dto/user.dto';

@Controller('auth')
export class AuthClientController {
  constructor(private readonly authGateway: AuthGatewayService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return await this.authGateway.register(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authGateway.login(dto);
  }
}
