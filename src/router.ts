import {getInfo} from './scripts/info';
import {ping} from './scripts/ping';
import {handleScoreUpdate, score} from './scripts/score';
export const route = async (app: any) => {
  // Route for ping
  app.message('sis ping', async ({say}: {say: Function}) => {
    let response: string = await ping();
    await say(response);
  });

  // Route for score
  app.message(
    'sis score',
    async ({message, say}: {message: any; say: Function}) => {
      let year: string = message.text.toString().split(' ')[
        message.text.toString().length - 1
      ];
      let response: object = await score(year);
      await say(response);
    }
  );
  // Route for ++/-- (score updation)
  app.message('', async ({message, say}: {message: any; say: Function}) => {
    if (
      message.text.includes('sis') &&
      (message.text.includes('++') || message.text.includes('--'))
    ) {
      await say(await handleScoreUpdate(String(message.text)));
    }
  });
  app.message(
    'sis info',
    async ({message, say}: {message: any; say: Function}) => {
      let response: any = await getInfo(message.text);
      say(response);
    }
  );
};
