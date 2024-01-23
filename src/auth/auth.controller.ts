import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/local/signup')
  singupLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signupLocal(dto)
  }
  
  @Post('/local/signin')
  singinLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signinLocal(dto)
  }
  
  @Post('/logout')
  logout() {
    return this.authService.logout()
  }
  
  @Post('/refresh')
  refreshTokens() {
    return this.authService.refreshToken()
  }
}
