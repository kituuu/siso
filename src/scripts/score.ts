import {getValue, setValue} from '../services/redis';

export const score = async (batch: string): Promise<object> => {
  // Getting data from redis and parsing it
  let mdgData: any = JSON.parse(await getValue('mdg'));
  // creating a block element's field array of all the rows
  // header - heading
  // divider : horizontal line
  // section : Each section represents a row of the table
  let scoreDataArr: any = [
    {
      type: 'header',
      text: {
        type: 'plain_text',
        text: `Score ${batch}`,
      },
    },
    {
      type: 'divider',
    },
  ];
  var nameString: string = 'Name\n';
  var scoreString: string = 'Score\n';
  for (const user in mdgData[batch]) {
    nameString = nameString + String(mdgData[batch][user]['name']) + '\n';
    scoreString = scoreString + String(mdgData[batch][user]['score']) + '\n';

    // console.log(scoreString);
    // scoreDataArr.push({
    //   type: 'section',
    //   fields: [
    //     {
    //       type: 'mrkdwn',
    //       text: String(mdgData[batch][user]['name']),
    //     },
    //     {
    //       type: 'mrkdwn',
    //       text: String(mdgData[batch][user]['score']),
    //     },
    //   ],
    // });
  }
  scoreDataArr.push({
    type: 'section',
    fields: [
      {
        type: 'mrkdwn',
        text: nameString,
      },
      {
        type: 'mrkdwn',
        text: scoreString,
      },
    ],
  });
  let blockData: Object = {
    blocks: scoreDataArr,
  };
  return blockData;
};

const plusplus = async (user: string): Promise<any> => {
  let mdgData: any = JSON.parse(await getValue('mdg'));
  for (const batch in mdgData) {
    for (const usr in mdgData[batch]) {
      if (mdgData[batch][usr]['slackID'] == user) {
        // console.log(mdgData[batch][usr]);
        mdgData[batch][usr]['score'] = mdgData[batch][usr]['score'] + 1;
        // console.log(mdgData[batch][usr]);
        setValue('mdg', JSON.stringify(mdgData));
        return await [
          mdgData[batch][usr]['displayName'],
          mdgData[batch][usr]['score'],
        ];
      }
    }
  }
};

const minusminus = async (user: string): Promise<any> => {
  let mdgData: any = JSON.parse(await getValue('mdg'));
  for (const batch in mdgData) {
    for (const usr in mdgData[batch]) {
      if (mdgData[batch][usr]['slackID'] == user) {
        // console.log(mdgData[batch][usr]);
        mdgData[batch][usr]['score'] = mdgData[batch][usr]['score'] - 1;
        // console.log(mdgData[batch][usr]);
        setValue('mdg', JSON.stringify(mdgData));
        return await [
          mdgData[batch][usr]['displayName'],
          mdgData[batch][usr]['score'],
        ];
      }
    }
  }
};

export const handleScoreUpdate = async (message: string): Promise<any> => {
  // To store all the fields of block ele
  let blockArr: any = [];
  let temp: string[] = message.split(' ');
  let userPlusPlus: string[] = [];
  let userMinusMinus: string[] = [];
  for (let i: number = 0; i < temp.length - 1; i++) {
    if (temp[i].match(/<@[0-9a-zA-Z]*>/) != null) {
      if (temp[i + 1] == '++') {
        let response: any = await plusplus(
          temp[i].slice(2, temp[i].length - 1)
        );
        blockArr.push({
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: String(
                `${response[0]}++ [Splendid! You're now at ${response[1]}]`
              ),
            },
          ],
        });
      } else if (temp[i + 1] == '--') {
        let response: any = await minusminus(
          temp[i].slice(2, temp[i].length - 1)
        );
        blockArr.push({
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: String(
                `${response[0]}-- [Ouch! You're now at ${response[1]}]`
              ),
            },
          ],
        });
      }
    }
  }

  let blockData: Object = {
    blocks: blockArr,
  };
  return blockData;
};
