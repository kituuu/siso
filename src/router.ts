import {ping} from './scripts/ping';
import {sastenashe} from './scripts/sastenashe';
import {handleScoreUpdate, score} from './scripts/score';
export const route = async (app: any) => {
  // Route for ping
  app.message('sis ping', async ({say}: {say: Function}) => {
    let response: string = await ping();
    await say(response);
  });
  // Route for saste nashe (testing)
  app.message('sis saste nashe', async ({say}: {say: Function}) => {
    let response: string = await sastenashe();

    await say(response);
  });
  // Route for score
  app.message(
    'sis score',
    async ({message, say}: {message: any; say: Function}) => {
      let temp: any = message.text.toString();
      temp = temp.split(' ');
      let year: string = temp[temp.length - 1];
      let response: object = await score(year);
      await say(response);
    }
  );
  app.message('', async ({message, say}: {message: any; say: Function}) => {
    if (
      message.text.includes('sis') &&
      (message.text.includes('++') || message.text.includes('--'))
    ) {
      await say(await handleScoreUpdate(String(message.text)));
    }
  });
};

///^sis @<U056FSDKPTM>++$/ || /^sis @<U056FSDKPTM> ++$/
