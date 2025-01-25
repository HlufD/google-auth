import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import LoginDto from '../dto/login.dto';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export default class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authservice: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authservice.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
