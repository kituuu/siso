export const help = async (): Promise<Object> => {
  return {
    blocks: [
      {
        type: 'header',
        text: {
          type: 'plain_text',
          text: 'Help !!!',
        },
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: 'sis help',
          },
          {
            type: 'mrkdwn',
            text: 'This command will show you all the available commands this can run.',
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: 'sis ping]',
          },
          {
            type: 'mrkdwn',
            text: "Let's PONG somewhere.",
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: 'sis score bxx',
          },
          {
            type: 'mrkdwn',
            text: 'This command will show you score of all the members in that specific year.',
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: 'sis user ++/-',
          },
          {
            type: 'mrkdwn',
            text: 'This command will increase or decrease the score of any user by 1.',
          },
        ],
      },
      {
        type: 'section',
        fields: [
          {
            type: 'mrkdwn',
            text: 'sis info user',
          },
          {
            type: 'mrkdwn',
            text: 'This command will show you all the related information about that perticular user.',
          },
        ],
      },
    ],
  };
};
