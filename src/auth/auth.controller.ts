import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AtGuard, RtGuard } from './common/guards';
import { GetCurrentUser, GetCurrentUserId, Public } from './common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('local/signup')
  @HttpCode(HttpStatus.CREATED)
  singupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto)
  }
  
  @Public()
  @Post('local/signin')
  @HttpCode(HttpStatus.OK)
  singinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto)
  }
  

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@GetCurrentUserId() userId: number) {
    return this.authService.logout(userId);
  }
  
  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refreshTokens(@GetCurrentUserId() userId: number, @GetCurrentUser('refreshToken') refreshToken: string) {
    return this.authService.refreshToken(userId,  refreshToken)
  }
}
