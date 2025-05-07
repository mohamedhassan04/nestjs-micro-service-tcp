import {
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../../libs/database/src/entities/auth/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto, RegisterDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private _userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this._userRepo.findOneBy({ email: dto.email });

    if (existing) throw new ConflictException('Email already used');

    // Hash password
    const salt = await bcrypt.genSalt();
    const passwordHash = dto.password;
    const hash = await bcrypt.hash(passwordHash, salt);
    const user = this._userRepo.create(dto);

    // Save user
    hash && (user.password = hash);

    await this._userRepo.save(user);

    const { password, ...result } = user;

    return {
      message: 'User registered successfully',
      HttpStatus: HttpStatus.CREATED,
    };
  }

  /* Validate user credentials */
  async validateAuth(email: string, password: string) {
    const user = await this._userRepo.findOneBy({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
  /* Login function */
  async login(user: User, loginUserDto: LoginDto) {
    // Validate user credentials
    const userFound = await this.validateAuth(
      loginUserDto.email,
      loginUserDto.password,
    );
    if (!userFound) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = {
      email: loginUserDto.email,
      sub: {
        id: userFound?.id,
        email: userFound?.email,
        username: userFound?.username,
      },
    };
    return {
      status: 200,
      success: {
        name: user.username,
        token: await this.jwtService.sign(payload),
      },
    };
  }

  async validateUser(userId: string) {
    return this._userRepo.findOneBy({ id: userId });
  }
}
