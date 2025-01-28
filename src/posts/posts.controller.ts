import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwTCookieGuard } from 'src/auth/guards/jwt-cookie.guard';
import JwtGuard from 'src/auth/guards/jwt.guard';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  @UseGuards(JwTCookieGuard)
  @Get()
  findAll(@Req() req: Request) {
    return {
      message: 'This is a new post',
    };
  }
}
