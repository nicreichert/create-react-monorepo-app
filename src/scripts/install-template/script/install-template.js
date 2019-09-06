'use strict';

const { prompt } = require('inquirer');
const fs = require('fs-extra');
const path = require('path');
const execa = require('execa');
const validateName = require('validate-npm-package-name');
const ora = require('ora');
const replace = require('replace');
const chalk = require('chalk');

const { cra } = require('./cra');
const { gatsby } = require('./gatsby');
const { next } = require('./next');
const { reactNative } = require('./react-native');
const { storybook } = require('./storybook');
const { cypress } = require('./cypress');

let spinner = ora({
  color: 'red',
});

const installTemplate = async () => {
  const targetDir = process.cwd();

  const { name } = await prompt({
    name: 'name',
    message: 'What is the name of the project?',
    validate: value => {
      const { errors } = validateName(value);
      if (errors) {
        errors.unshift(`Invalid package name: ${value}`);
        return errors.map(e => e.charAt(0).toUpperCase() + e.substring(1)).join(`\n>>`);
      }

      const packageDir = path.join(targetDir, 'packages', value);
      if (fs.existsSync(packageDir)) {
        return `Target directory ${packageDir} already exists.`;
      }

      return true;
    },
  });

  const { plugin } = await prompt({
    name: 'plugin',
    type: 'list',
    message: 'Which starter project you want to install?',
    choices: [
      { name: 'create-react-app', value: cra },
      { name: 'gatsby', value: gatsby },
      { name: 'next.js', value: next },
      { name: 'react-native', value: reactNative },
      { name: 'storybook', value: storybook },
      { name: 'cypress', value: cypress },
    ],
  });

  spinner.succeed(`Project generated at ${chalk.blue(`${targetDir}/packages/${name}`)}`);

  const pkg = require(path.join(targetDir, 'package.json'));

  await plugin(pkg.name, targetDir, name);

  replace({
    regex: '@monorepo',
    replacement: `@${pkg.name}`,
    paths: [path.join(targetDir, 'packages', name)],
    recursive: true,
    silent: true,
  });

  spinner.start('Installing dependencies');
  await execa('yarn', ['install'], { cwd: targetDir });
  spinner.succeed('Dependencies installed');
};

installTemplate();
