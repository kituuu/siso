import {getValue} from '../services/redis';

export const score = async (batch: string): Promise<object> => {
  let mdgData: any = JSON.parse(await getValue('mdg'));
  console.log(mdgData);
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
    {
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: 'Name',
        },
        {
          type: 'mrkdwn',
          text: 'Score',
        },
      ],
    },
  ];

  for (const user in mdgData[batch]) {
    console.log(mdgData[batch][user]['name']);
    scoreDataArr.push({
      type: 'section',
      fields: [
        {
          type: 'mrkdwn',
          text: String(mdgData[batch][user]['name']),
        },
        {
          type: 'mrkdwn',
          text: String(mdgData[batch][user]['score']),
        },
      ],
    });
  }

  let blockData: Object = {
    blocks: scoreDataArr,
  };
  return blockData;
};
