import {getPing} from '../services/redis';

export const ping = async () => {
  return await getPing();
};
