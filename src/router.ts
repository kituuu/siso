// import { App } from '@slack/bolt';
import {help} from './scripts/help';
import {getInfo} from './scripts/info';
import {ping} from './scripts/ping';
import {handleScoreUpdate, score} from './scripts/score';
import {App, AppMessage} from './types';
export const route = async (app: App) => {
  // Route for ping
  app.message('sis ping', async ({say}: AppMessage) => {
    let response: string = await ping();
    await say(response);
  });

  // Route for score
  app.message('sis score', async ({message, say}: AppMessage) => {
    let year: string = message.text.toString().split(' ')[
      message.text.toString().split(' ').length - 1
    ];
    let response: object = await score(year);
    await say(response);
  });
  // Route for ++/-- (score updation)
  app.message('', async ({message, say}: AppMessage) => {
    if (
      message.text.includes('sis') &&
      (message.text.includes('++') || message.text.includes('--'))
    ) {
      await say(await handleScoreUpdate(message.text));
    }
  });

  // Route for sis info
  app.message('sis info', async ({message, say}: AppMessage) => {
    let response: object = await getInfo(message.text);
    say(response);
  });
  // Route for sis helf
  app.message('sis help', async ({say}: AppMessage) => {
    let response: object = await help();
    say(response);
  });
};
