import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpInput, SignInInput } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: SignUpInput) {
    return this.authService.signUp(body);
  }

  @Post('signin')
  signIn(@Body() body: SignInInput) {
    return this.authService.signIn(body);
  }
}
