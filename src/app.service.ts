import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  health() {
    return { status: 200, message: 'Ok' };
  }
}
