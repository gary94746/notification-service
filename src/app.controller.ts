import { Controller, Get, Body, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as webpush from 'web-push';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  publicVapid = this.configService.get<string>('PUBLIC_VAPID_KEY');
  privateVapid = this.configService.get<string>('PRIVATE_VAPID_KEY');

  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {
    webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      this.publicVapid,
      this.privateVapid,
    );
  }

  @Post('subscribe')
  async subscribe(@Body() body: any) {
    this.appService.saveToken(body.sub);
  }

  @Post()
  @Render('index')
  async sendNotification(@Body() msg: any) {
    const { title = 'No title', body = 'No body' } = msg;

    return this.appService
      .getTokens()
      .map(token =>
        webpush.sendNotification(token, JSON.stringify({ title, body })),
      );
  }

  @Get()
  @Render('index')
  root() {}

  @Get('sw')
  async getServiceWorker(@Res() res: any) {
    return res.sendFile('sw.js', { root: 'public' });
  }
}
