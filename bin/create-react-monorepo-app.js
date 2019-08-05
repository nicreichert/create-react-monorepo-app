#!/usr/bin/env node

'use strict';

const path = require('path');
const fs = require('fs');

const validateName = require('validate-npm-package-name');
const updateNotifier = require('update-notifier');
const chalk = require('chalk');

const { createApp } = require('../lib');
const pkg = require('../package.json');

if (process.argv.length === 2) {
  console.error('Expected at least one argument.');
  process.exit(1);
}

process.argv.splice(0, 2);

const { errors } = validateName(process.argv[0]);
if (errors) {
  console.error(`Invalid package name: ${process.argv[0]}`);
  process.exit(1);
}

const targetDir = path.resolve(process.argv[0]);
if (fs.existsSync(targetDir)) {
  console.error(`Target directory ${chalk.cyan(targetDir)} already exists.`);
  process.exit(1);
}

updateNotifier({ pkg }).notify();
require('please-upgrade-node')(pkg);

createApp(process.argv[0] || '.');
