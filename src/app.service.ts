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

  replaceIfEmpty(prop: string, optionalTitle: string) {
    return prop && prop.trim() != '' ? prop : optionalTitle;
  }

  createNotification(title: string, body: string) {
    return {
      title: this.replaceIfEmpty(title, 'No title'),
      body: this.replaceIfEmpty(body, 'No body'),
    };
  }
}
