const path = require('path');
const execa = require('execa');
const ora = require('ora');
const chalk = require('chalk');
const fs = require('fs-extra');
const replace = require('replace');

const configuration = require('./configuration');

const base = require('./plugins/base');
const cra = require('./plugins/cra');
const storybookTemplate = require('./plugins/storybook');

let spinner = ora({
  color: 'red',
});

async function create(name) {
  const config = await configuration();
  const { type, adminType, storybook, e2e } = config;

  // run the generator
  spinner.start('Generating project');

  const targetDir = path.resolve(name);

  // Copy base template
  await base(config, name, targetDir);

  // Copy web template
  await cra('web', name, targetDir);

  // Copy admin template
  adminType && (await cra('admin', name, targetDir));

  // Copy storybook template
  storybook && (await storybookTemplate(name, targetDir));

  // Replace `@monorepo` with current project name from templates
  replace({
    regex: '@monorepo',
    replacement: `@${name}`,
    paths: [targetDir],
    recursive: true,
    silent: true,
  });

  spinner.succeed(`Project generated at ${chalk.blue(targetDir)}`);

  // install dependencies
  spinner.start('Installing dependencies');
  await execa('yarn', ['install'], { cwd: targetDir });
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
}

module.exports = name => {
  create(name).catch(error => {
    spinner.fail(`Error: ${error.message}`);
    console.log(error);
  });
};
