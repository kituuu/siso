export interface App {
  message: Function;
}

export interface AppMessage {
  message: {
    user: string;
    text: string;
  };
  say: Function;
}

export interface Data {
  [key: string]: Batch;
  batch: Batch;
}

interface Batch {
  [key: string]: User;
  user: User;
}
interface User {
  [key: string]: string | number;
  name: string;
  slackID: string;
  displayName: string;
  score: number;
  email: string;
  phone: number;
  branch: string;
  room: string;
  year: string;
  github: string;
}
