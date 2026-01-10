import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

class RegisterDto {
  email: string;
  displayName: string;
  password: string;
}

class LoginDto {
  email: string;
  password: string;
}

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
  async me(@Req() req) {
    const user = await this.authService.getUser(req.user.userId);
  return user;
  }
}
