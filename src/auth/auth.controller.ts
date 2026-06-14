import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() body: RegisterDto) {
    const { email, displayName, password } = body;
    const token = await this.authService.register(email, displayName, password);
    return { accessToken: token };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    const { email, password } = body;
    const token = await this.authService.login(email, password);
    return { accessToken: token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@Req() req) {
    return req.user;
  }
}
