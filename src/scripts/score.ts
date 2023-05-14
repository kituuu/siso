import {getValue, setValue} from '../services/redis';

export const score = async (batch: string): Promise<object> => {
  // Getting data from redis and parsing it
  let mdgData: any = JSON.parse(await getValue('mdg'));
  let nameString: string = 'Name\n';
  let scoreString: string = 'Score\n';
  // Boilerplate/protype of block components
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

  for (const user in mdgData[batch]) {
    nameString = nameString + String(mdgData[batch][user]['name']) + '\n';
    scoreString = scoreString + String(mdgData[batch][user]['score']) + '\n';
  }
  // adding names and scores to seperate section of block component
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

  return {
    blocks: scoreDataArr,
  };
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
  for (let i: number = 0; i < temp.length - 1; i++) {
    // using regular expression to check if any user is tagged or not
    if (temp[i].match(/<@[0-9a-zA-Z]*>/) != null) {
      if (temp[i + 1] == '++') {
        // if ++ is used plusplus function is called which return name displayname and new score
        let response: any = await plusplus(
          temp[i].slice(2, temp[i].length - 1)
        );
        // pushing it to new section of the block
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
        // if -- (same logic as that of ++)
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

  return {
    blocks: blockArr,
  };
};
