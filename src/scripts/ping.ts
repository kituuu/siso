import {getPing, getValue, setValue} from '../services/redis';

// import } from 'redis';
export const ping = async () => {
  // if (!getValue('ping')) {
  //   return getValue('ping');
  // } else {
  //   setValue('ping', 'pong');
  //   return getValue('ping');
  // }
  return await getPing();
};
