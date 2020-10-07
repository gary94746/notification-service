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
  async subscribe(@Body() body) {
    this.clientList.push(body.sub);
  }

  @Post()
  async sendNotification(@Body() msg) {
    const { title, body } = msg;
    try {
      const all = this.clientList.map(async e => {
        await webpush.sendNotification(e, JSON.stringify({ title, body }));
      });

      Promise.all(all);
    } catch (e) {
      console.log(e);
    }
  }

  @Get()
  @Render('index')
  root() {
    return { message: 'Test notifications' };
  }

  @Get('sw')
  async getServiceWorker(@Res() res) {
    return res.sendFile('sw.js', { root: 'public' });
  }
}
