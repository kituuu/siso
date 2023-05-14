import {getValue} from '../services/redis';
export const getInfo = async (mess: string): Promise<any> => {
  console.log(mess);
  let mdgData: any = JSON.parse(await getValue('mdg'));
  if (mess.match(/<@[0-9a-zA-Z]*>/)) {
    let temp: string[] = mess.split(' ');

    for (let i = 0; i < temp.length; i++) {
      if (temp[i] == 'info' && temp[i + 1].match(/<@[0-9a-zA-Z]*>/)) {
        let slackID = temp[i + 1].slice(2, temp[i + 1].length - 1);

        for (let batch in mdgData) {
          for (let user in mdgData[batch]) {
            if (mdgData[batch][user]['slackID'] == slackID) {
              let userData: Object = mdgData[batch][user];
              console.log(userData);
              let response: object = {
                blocks: [
                  {
                    type: 'header',
                    text: {
                      type: 'plain_text',
                      text: mdgData[batch][user]['name'],
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
                        text: `Github: <https://github.com/${mdgData[batch][user]['github']}|${mdgData[batch][user]['github']}>`,
                      },
                      {
                        type: 'mrkdwn',
                        text: `\nRoom no: ${mdgData[batch][user]['room']}`,
                      },
                      {
                        type: 'mrkdwn',
                        text: `*Mobile*\n${mdgData[batch][user]['phone']}`,
                      },
                      {
                        type: 'mrkdwn',
                        text: `*Email*\n${mdgData[batch][user]['email']}`,
                      },
                    ],
                  },
                ],
                text: `Info`,
              };
              return response;
            }
          }
        }
      }
    }
  }
};
