import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github';
import { VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export default class GithubStrategy extends PassportStrategy(
  Strategy,
  'github',
) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      clientSecret: configService.get<string>('GITHUB_SECRET'),
      scope: ['user:email'],
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifiedCallback,
  ) {
    const { id, displayName, username } = profile as {
      id: string;
      displayName: string;
      username: string;
    };
    const email = username.toLocaleLowerCase() + '@' + 'gmail.com';
    const user = await this.authService.validateGithubUser({
      email,
      firstName: displayName.split(' ')[0],
      lastName: displayName.split(' ')[1],
      password: '',
    });
    done(null, user);
  }
}
