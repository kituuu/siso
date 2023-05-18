import {getValue} from '../services/redis';
import {Data} from '../types';
export const getInfo = async (mess: string): Promise<object> => {
  let mdgData: Data = JSON.parse(await getValue('mdg'));
  let userName: string = 'Not Found';
  let userGithub: string = 'None';
  let userRoom: string = 'None';
  let userPhone: string = 'None';
  let userEmail: string = 'None';
  if (mess.match(/<@[0-9a-zA-Z]*>/)) {
    let msgWords: string[] = mess.split(' ');

    for (let i = 0; i < msgWords.length; i++) {
      if (msgWords[i] == 'info' && msgWords[i + 1].match(/<@[0-9a-zA-Z]*>/)) {
        let slackID = msgWords[i + 1].slice(2, msgWords[i + 1].length - 1);

        for (let batch in mdgData) {
          for (let user in mdgData[batch]) {
            if (mdgData[batch][user]['slackID'] == slackID) {
              userName = mdgData[batch][user]['name'];
              userGithub = `Github: <https://github.com/${mdgData[batch][user]['github']}|${mdgData[batch][user]['github']}>`;
              userRoom = `\nRoom no: ${mdgData[batch][user]['room']}`;
              userPhone = `*Mobile*\n${mdgData[batch][user]['phone']}`;
              userEmail = `*Email*\n${mdgData[batch][user]['email']}`;
            }
          }
        }
      }
    }
  }
  let response: object = {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: userName,
        },
      },
      {
        type: 'divider',
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: userGithub,
          },
          {
            type: 'mrkdwn',
            text: userRoom,
          },
          {
            type: 'mrkdwn',
            text: userPhone,
          },
          {
            type: 'mrkdwn',
            text: userEmail,
          },
        ],
      },
    ],
    text: `Info`,
  };
  return response;
};
