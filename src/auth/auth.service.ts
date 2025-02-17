import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import User from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import SignupDto from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async signup(userDto: User) {
    const { email, password } = userDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (user) {
        throw new ConflictException('email already used.');
      }

      // hash password and crate the user
      const hash = await this.hash(password);
      console.log(userDto);

      const new_user = await this.prisma.user.create({
        data: {
          ...userDto,
          password: hash,
        },
      });

      // return access_token
      const access_token = await this.jwt.signAsync({
        email,
        sub: new_user.id,
      });
      return { ...new_user, access_token };
    } catch (error) {
      throw error;
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        select: {
          id: true,
          password: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      if (!user) throw new UnauthorizedException('invalid credentials');

      const isPasswordValid = await this.compare(password, user.password);

      if (!isPasswordValid)
        throw new UnauthorizedException(
          'either password or email is incorrect.',
        );

      const { password: _, ...rest } = user;
      return rest;
    } catch (error) {
      throw error;
    }
  }

  async hash(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async compare(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async validateGoogleUser(googleUser: SignupDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: googleUser.email,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      if (user) return user;
      return await this.prisma.user.create({
        data: googleUser,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async validateGithubUser(githubUser: SignupDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: githubUser.email,
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
      if (user) return user;
      return await this.prisma.user.create({
        data: githubUser,
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
