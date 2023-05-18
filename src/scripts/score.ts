import {getValue, setValue} from '../services/redis';
import {Data} from '../types';

export const score = async (batch: string): Promise<object> => {
  // Getting data from redis and parsing it
  let mdgData: Data = JSON.parse(await getValue('mdg'));
  let nameString: string = 'Name\n';
  let scoreString: string = 'Score\n';
  // Boilerplate/protype of block components
  let scoreDataArr: object[] = [
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
    nameString = nameString + mdgData[batch][user]['name'] + '\n';
    scoreString = scoreString + mdgData[batch][user]['score'] + '\n';
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

const plusplus = async (user: string): Promise<(string | number)[]> => {
  let mdgData: Data = JSON.parse(await getValue('mdg'));
  let result: (string | number)[] = ['Not Found', 0];
  for (const batch in mdgData) {
    for (const usr in mdgData[batch]) {
      if (mdgData[batch][usr]['slackID'] == user) {
        mdgData[batch][usr]['score'] = mdgData[batch][usr]['score'] + 1;
        setValue('mdg', JSON.stringify(mdgData));
        result[0] = mdgData[batch][usr]['displayName'];
        result[1] = mdgData[batch][usr]['score'];
      }
    }
  }
  return await result;
};

const minusminus = async (user: string): Promise<(string | number)[]> => {
  let mdgData: Data = JSON.parse(await getValue('mdg'));
  let result: (string | number)[] = ['Not Found', 0];
  for (const batch in mdgData) {
    for (const usr in mdgData[batch]) {
      if (mdgData[batch][usr]['slackID'] == user) {
        mdgData[batch][usr]['score'] = mdgData[batch][usr]['score'] - 1;
        setValue('mdg', JSON.stringify(mdgData));
        result[0] = mdgData[batch][usr]['displayName'];
        result[1] = mdgData[batch][usr]['score'];
      }
    }
  }
  return await result;
};

export const handleScoreUpdate = async (message: string): Promise<object> => {
  // To store all the fields of block ele
  let blockArr: object[] = [];
  let temp: string[] = message.split(' ');
  for (let i: number = 0; i < temp.length - 1; i++) {
    // using regular expression to check if any user is tagged or not
    if (temp[i].match(/<@[0-9a-zA-Z]*>/) != null) {
      if (temp[i + 1] == '++') {
        // if ++ is used plusplus function is called which return name displayname and new score
        let response: (string | number)[] = await plusplus(
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
        // if -- (same logic as that of)
        let response: (string | number)[] = await minusminus(
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

  let blockData: object = {
    blocks: blockArr,
  };
  return blockData;
};
