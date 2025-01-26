import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export default class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authservice: AuthService,
  ) {
    super({
      clientID: configService.get<string>('CLIENT_ID'),
      callbackURL: configService.get<string>('CALLBACK_URL'),
      clientSecret: configService.get<string>('CLIENT_SECRET'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    const user = await this.authservice.validateGoogleUser({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      password: '',
    });
    done(null, user);
  }
}
