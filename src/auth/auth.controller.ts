import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignupDto from './dto/signup.dto';
import LoginDto from './dto/login.dto';
import LocalGuard from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import GoogleGuard from './guards/google.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwt: JwtService,
  ) {}

  @Post('signup')
  signup(@Body() body: SignupDto) {
    return this.authService.signup(body);
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Body() body: LoginDto, @Req() req: Request) {
    const user = req.user as {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    const access_token = await this.jwt.signAsync({
      email: user.email,
      sub: user.id,
    });
    return {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      access_token,
    };
  }

  @UseGuards(GoogleGuard)
  @Get('google')
  googleLogin() {}

  @UseGuards(GoogleGuard)
  @Get('redirect')
  async googleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
    };
    const access_token = await this.jwt.signAsync({
      email: user.email,
      sub: user.id,
    });
    res.redirect(
      `http://localhost:5173/?token=${access_token}&&email=${user.email}&&firstName=${user.firstName}&&lastName=${user.lastName}`,
    );
  }
}
