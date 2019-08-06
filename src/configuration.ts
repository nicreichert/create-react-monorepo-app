import { prompt } from 'inquirer';
import { Configuration } from './types';

export const configuration: () => Promise<Configuration> = async () => {
  const { type } = await prompt({
    name: 'type',
    type: 'list',
    message: 'Which starter project you want to use?',
    choices: [
      { name: 'create-react-app', value: 'cra' },
      { name: 'next.js', value: 'next' },
      { name: 'gatsby', value: 'gatsby' },
    ],
  });

  const { adminType } = await prompt({
    name: 'adminType',
    type: 'list',
    message: 'Does your project include an admin panel?',
    choices: [
      { name: 'No', value: null },
      { name: 'Yes (create-react-app)', value: 'cra' },
      { name: 'Yes (next.js)', value: 'next' },
      { name: 'Yes (gatsby)', value: 'gatsby' },
    ],
  });

  const { includeStorybook } = await prompt({
    name: 'includeStorybook',
    type: 'list',
    message: 'Include Storybook setup?',
    choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
  });

  const { includee2e } = await prompt({
    name: 'includee2e',
    type: 'list',
    message: 'Include E2E tests setup?',
    choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
  });

  const { includeTemplates } = await prompt({
    name: 'includeTemplates',
    type: 'list',
    message: 'Copy templates so you can later create new projects?',
    choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
  });

  return {
    type,
    adminType,
    includeStorybook,
    includee2e,
    includeTemplates,
  };
};
