import {
  Controller,
  Get,
  Body,
  Post,
  Render,
  Res,
  Redirect,
} from '@nestjs/common';
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
  @Render('index')
  async sendNotification(@Body() msg) {
    const { title = 'No title', body = 'No body' } = msg;
    try {
      this.clientList.map(e => {
        webpush.sendNotification(e, JSON.stringify({ title, body }));
      });
    } catch (e) {
      return { message: 'Error, check notification permitions' };
    }
  }

  @Get()
  @Render('index')
  root() {
    return { message: 'Simple app notitication' };
  }

  @Get('sw')
  async getServiceWorker(@Res() res) {
    return res.sendFile('sw.js', { root: 'public' });
  }
}
