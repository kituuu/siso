import * as dotenv from 'dotenv';
dotenv.config();

import {App} from '@slack/bolt';
import {redisInit} from './services/redis';
import {route} from './router';

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true, // add this
  appToken: process.env.SLACK_APP_TOKEN,
});

async function init() {
  await app.start(process.env.PORsT || 3000);
  console.log('[APP] app is running');
  await redisInit();
  await route(app);
}

init();

// interface Message {
//   client_msg_id: string;
//   type: string;
//   text: string;
//   user: string;
//   ts: string;
//   blocks: any;
//   team: string;
//   channel: string;
//   event_ts: string;
//   channel_type: string;
// }

// function getMessage(): string {
//   var temp: string = '';
//   app.message(
//     '',
//     async ({message, say}: {message: any; say: Function}): Promise<any> => {
//       // console.log(typeof message);
//       if (message.subtype === undefined || message.subtype === 'bot_message') {
//         var msg: string = message.text;
//         say(msg);
//         temp = msg;
//         console.log(temp);
//       }
//     }
//   );

//   console.log('Samosa');
//   console.log(temp);
//   return temp;
// }
// var temp: string = '';
// var temptemp: any = app.message(
//   '',
//   async ({message, say}: {message: any; say: Function}): Promise<any> => {
//     // console.log(typeof message);
//     if (message.subtype === undefined || message.subtype === 'bot_message') {
//       var msg: string = message.text;
//       say(msg);
//       temp = msg;
//       console.log(temp);
//       return message;
//     }
//   }
// );
// console.log(temptemp);
// console.log('Samosa');
// console.log(temp);
// let dash: string = getMessage();
// console.log(dash);
