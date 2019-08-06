import chalk from 'chalk';
import { sync as commandExists } from 'command-exists';
import execa from 'execa';
import ora from 'ora';
import path from 'path';
import replace from 'replace';
import { configuration } from './configuration';
import { base } from './plugins/base';
import { cra } from './plugins/cra';
import { cypress } from './plugins/cypress';
import { gatsby } from './plugins/gatsby';
import { next } from './plugins/next';
import { storybook } from './plugins/storybook';
import { installTemplate } from './scripts/install-template';
import { ProjectType } from './types';

let spinner = ora({
  color: 'red',
});

const webCreator = (type: ProjectType) => {
  switch (type) {
    case 'next':
      return next;
    case 'gatsby':
      return gatsby;
    default:
      return cra;
  }
};

async function create(name: string) {
  const config = await configuration();
  const { type, adminType, includeStorybook, includee2e, includeTemplates } = config;

  // run the generator
  spinner.start('Generating project');

  const targetDir = path.resolve(name);

  // Copy base template
  await base(config, name, targetDir);

  // Copy web template
  await webCreator(type)(name, targetDir, 'web');

  // Copy admin template
  adminType && (await webCreator(adminType)(name, targetDir, 'admin'));

  // Copy storybook template
  includeStorybook && (await storybook(name, targetDir));

  // Copy cypress templatee
  includee2e && (await cypress(name, targetDir));

  // Replace `@monorepo` with current project name from templates
  replace({
    regex: '@monorepo',
    replacement: `@${name}`,
    paths: [targetDir],
    recursive: true,
    silent: true,
  });

  // Copy templates and create script to installing new templates
  includeTemplates && (await installTemplate(targetDir));

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

  // Setup husky
  await execa('node', ['node_modules/husky/husky.js', 'install'], {
    cwd: targetDir,
  });

  spinner.succeed(`${chalk.blue('git')} initialized`);

  // If can find IDE CLI, use it to open project.
  if (commandExists('code')) {
    await execa('code', [targetDir]);
  } else if (commandExists('atom')) {
    await execa('atom', [targetDir]);
  } else if (commandExists('subl')) {
    await execa('subl', [targetDir]);
  }

  spinner.succeed(`${name} setup concluded`);
}

export function createApp(name: string) {
  create(name).catch(error => {
    spinner.fail(`Error: ${error.message}`);
    console.log(error);
  });
}
