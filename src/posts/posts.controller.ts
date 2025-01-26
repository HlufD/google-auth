import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import JwtGuard from 'src/auth/guards/jwt.guard';

@ApiTags('Posts')
@ApiBearerAuth()
@Controller('posts')
export class PostsController {
  @UseGuards(JwtGuard)
  @Get()
  findAll(@Req() req: Request) {
    return {
      message: 'This is a private stuff',
    };
  }
}
