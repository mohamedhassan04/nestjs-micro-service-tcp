import { Controller, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto, RegisterDto } from './dto/user.dto';
import { User } from '@app/database/entities/auth/user.entity';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  // @desc Register a new user
  @MessagePattern({ cmd: 'register' })
  async register(@Payload() dto: RegisterDto) {
    try {
      return await this.authService.register(dto);
    } catch (error) {
      console.log(error);
    }
  }

  // @desc Login a user
  @MessagePattern({ cmd: 'login' })
  async login(@Payload() dto: LoginDto, @Payload() user: User) {
    try {
      return await this.authService.login(user, dto);
    } catch (error) {
      console.log(error);
    }
  }

  // @desc Validate a user
  @MessagePattern({ cmd: 'validate-user' })
  validateUser(@Payload() userId: string) {
    return this.authService.validateUser(userId);
  }
}
