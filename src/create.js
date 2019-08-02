const { prompt } = require('inquirer');
const path = require('path');
const execa = require('execa');
const ora = require('ora');
const chalk = require('chalk');
const fs = require('fs-extra');

let spinner = ora({
  color: 'red',
});

async function create(name) {
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

  const templatePath = path.resolve(__dirname, '../templates');

  // Copy base template
  await fs
    .copy(path.join(templatePath, 'base'), path.join(targetDir))
    .then(() => {
      const package = require(path.join(targetDir, 'package.json'));
      package.name = name;

      return fs.writeFile(path.join(targetDir, 'package.json'), JSON.stringify(package, null, 2));
    })
    .then(() => {
      const package = require(path.join(path.join(targetDir, '/packages/ui'), 'package.json'));
      package.name = `@${name}/ui`;

      return fs.writeFile(
        path.join(path.join(targetDir, '/packages/ui'), 'package.json'),
        JSON.stringify(package, null, 2)
      );
    });

  // Copy CRA template to web project
  const webPath = path.join(targetDir, '/packages/web');
  await fs.copy(path.join(templatePath, 'cra'), webPath).then(() => {
    const package = require(path.join(webPath, 'package.json'));
    package.name = `@${name}/web`;
    package.dependencies = { [`@${name}/ui`]: '1.0.0', ...package.dependencies };

    return fs.writeFile(path.join(webPath, 'package.json'), JSON.stringify(package, null, 2));
  });

  if (adminType) {
    // Copy CRA template to admin project
    const adminPath = path.join(targetDir, '/packages/admin');
    await fs.copy(path.join(templatePath, 'cra'), adminPath).then(() => {
      const package = require(path.join(adminPath, 'package.json'));
      package.name = `@${name}/web`;
      package.dependencies = { [`@${name}/ui`]: '1.0.0', ...package.dependencies };

      return fs.writeFile(path.join(adminPath, 'package.json'), JSON.stringify(package, null, 2));
    });
  }

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
