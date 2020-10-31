import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  private tokens = new Array();

  saveToken(token: any) {
    this.tokens.push(token);
  }

  getTokens() {
    return this.tokens;
  }
}
