'use strict';
'use strict';

const { prompt } = require('inquirer');

async function configuration() {
  const { type } = await prompt({
    name: 'type',
    type: 'list',
    message: 'What type of application do you need?',
    choices: [
      { name: 'Single-page (create-react-app)', value: 'SPA' },
      { name: 'Server-rendered (next.js)', value: 'SSR' },
    ],
  });

  const { adminType } = await prompt({
    name: 'adminType',
    type: 'list',
    message: 'Does your project include an admin panel?',
    choices: [
      { name: 'No', value: null },
      { name: 'Yes (Single-page)', value: 'SPA' },
      { name: 'Yes (Server-rendered)', value: 'SSR' },
    ],
  });

  const { storybook } = await prompt({
    name: 'storybook',
    type: 'list',
    message: 'Include Storybook setup?',
    choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
  });

  const { e2e } = await prompt({
    name: 'e2e',
    type: 'list',
    message: 'Include E2E tests setup?',
    choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
  });

  return {
    type,
    adminType,
    storybook,
    e2e,
  };
}

module.exports = configuration;
