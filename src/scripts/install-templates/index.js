'use strict';

const path = require('path');
const fs = require('fs-extra');

const sortObject = require('../../utils/sort-object');

const install = async targetDir => {
  const pkg = require(path.join(targetDir, 'package.json'));

  // add script to package.json
  pkg.scripts = {
    ...pkg.scripts,
    'install-template': 'node scripts/install-template',
  };

  // add dependencies to package.json
  pkg.devDependencies = sortObject({
    ...pkg.devDependencies,
    'fs-extra': '^8.1.0',
    inquirer: '^6.5.0',
    execa: '^2.0.3',
    'validate-npm-package-name': '^3.0.0',
    ora: '^3.4.0',
    chalk: '^2.4.2',
    replace: '^1.1.0',
  });

  await fs.writeFile(path.join(targetDir, 'package.json'), JSON.stringify(pkg, null, 2));

  await fs.copy(
    path.join(__dirname, '../../plugins/'),
    path.join(targetDir, 'scripts/install-template')
  );

  await fs.copy(
    path.join(__dirname, './script/install-templates.js'),
    path.join(targetDir, 'scripts/install-template/index.js')
  );
};

module.exports = install;
