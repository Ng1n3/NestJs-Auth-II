import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AppService } from './app.service';
import { AuthenticatedGuard } from './auth/authenticated.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req: any): any {
    return {msg: 'Logged in!'};
  }

  @UseGuards(AuthenticatedGuard)
  @Get('protected')
  getHello(@Request() req: any): String {
    return req.user
  }
}
