import {ping} from './scripts/ping';
export const route = async (app: any) => {
  app.message('ping', async ({message, say}: {message: any; say: Function}) => {
    let response: string = await ping();
    await say(response);
  });
};
