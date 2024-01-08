import { Controller, Post, Body, Request, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { AuthDto } from './dto';

import { RefreshJwtGuard } from './guard/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: AuthDto) {
    return this.authService.signin(dto);
  }

  @Post('register')
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() dto: AuthDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req) {
    console.log('refreshed');
    return await this.authService.refreshToken(req.user);
  }
}
