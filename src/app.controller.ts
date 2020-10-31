import { Controller, Get, Body, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import * as webpush from 'web-push';

@Controller()
export class AppController {
  publicVapid =
    'BH62_hB1xJkNStldvYR6vc-50ksX3bTImdCXw2eCZYlrBLxAH9sVOf7TfIL79zUGQOLVuWc2tr_UG3NlWXjipik';
  privateVapid = 'u5zA2UvqMxK5Qh_IyXRFlCU4TNoQ11B4FbzHfZYDInA';

  clientList: any[] = [];

  constructor(private readonly appService: AppService) {
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
