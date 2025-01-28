import { AuthGuard } from '@nestjs/passport';

export class JwTCookieGuard extends AuthGuard('jwt-cookie') {}
