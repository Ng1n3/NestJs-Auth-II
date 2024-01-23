import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local/signup')
  singupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    this.authService.signupLocal(dto)
  }
  
  @Post('/local/signin')
  singinLocal() {
    this.authService.signinLocal()
  }
  
  @Post('/logout')
  logout() {
    this.authService.logout()
  }
  
  @Post('/refresh')
  refreshTokens() {
    this.authService.refreshToken()
  }
}
