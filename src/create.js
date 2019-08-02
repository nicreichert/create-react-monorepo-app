const { prompt } = require('inquirer');
const path = require('path');
const execa = require('execa');
const ora = require('ora');
const chalk = require('chalk');

let spinner = ora({
  color: 'red',
});

async function create(name) {
  // const start = Date.now();

  const { type } = await prompt({
    name: 'type',
    type: 'list',
    message: 'What type of application do you need?',
    choices: [{ name: 'Single-page', value: 'SPA' }, { name: 'Server-rendered', value: 'SSR' }],
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

  const { e2e } = await prompt({
    name: 'e2e',
    type: 'list',
    message: 'Include E2E tests setup?',
    choices: [{ name: 'No', value: false }, { name: 'Yes', value: true }],
  });

  const targetDir = path.resolve(name);

  // run the generator
  spinner.start('Generating project');
  // const generator = new Generator({ name, type, plugins, targetDir });
  // await generator.generate();
  spinner.succeed(`Project generated at ${chalk.blue(targetDir)}`);

  // install dependencies
  spinner.start('Installing dependencies');
  await ('yarn', ['install'], { cwd: targetDir });
  spinner.succeed('Dependencies installed');

  // intialize git
  spinner.start('Initializing git');
  await execa('git', ['init'], { cwd: targetDir });
  await execa('git', ['add', '-A'], { cwd: targetDir });
  await execa('git', ['commit', '-m', 'Initial commit'], {
    cwd: targetDir,
  });

  await execa('node', ['node_modules/husky/husky.js', 'install'], {
    cwd: targetDir,
  });

  spinner.succeed(`${chalk.blue('git')} initialized`);

  // generator.onComplete();
}

module.exports = (...args) => {
  create(args[0]).catch(error => {
    spinner.fail(`Error: ${error.message}`);
    console.log(error);
  });
};
