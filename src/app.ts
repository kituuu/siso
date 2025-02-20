import * as dotenv from 'dotenv';
dotenv.config();

import {App} from '@slack/bolt';
import {redisInit} from './services/redis';
import {route} from './router';
import {StringIndexed} from '@slack/bolt/dist/types/helpers';

const app: App<StringIndexed> = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN,
});

async function init(): Promise<void> {
  await app.start(process.env.PORsT || 3000);
  console.log('[Kaori] is happy, yikes :D');
  await redisInit();
  await route(app);
}

init();
