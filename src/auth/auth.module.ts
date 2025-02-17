import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import LocalStrategy from './strategies/local.strategy';
import JwtStrategy from './strategies/jwt.strategy';
import GoogleStrategy from './strategies/google.strategy';
import JwtCookieStrategy from './strategies/jwt.cookie.strategy';
import GithubStrategy from './strategies/github.strategy';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    JwtCookieStrategy,
    GithubStrategy,
  ],
})
export class AuthModule {}
