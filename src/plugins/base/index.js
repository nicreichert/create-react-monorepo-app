'use strict';

const fs = require('fs-extra');
const path = require('path');

const adminScripts = adminType =>
  adminType
    ? {
        'start:admin':
          'concurrently "(cd packages/admin && yarn start)" "(cd packages/ui && yarn start)"',
        'build:admin': '(cd packages/admin && yarn build)',
      }
    : {};

const storybookScripts = storybook =>
  storybook
    ? {
        'start:storybook':
          'concurrently "(cd packages/storybook && yarn start)" "(cd packages/ui && yarn start)"',
        'build:storybook': '(cd packages/storybook && yarn build)',
      }
    : {};

const cypressScripts = e2e =>
  e2e
    ? {
        'start:cypress': '(cd packages/cypress && yarn start)',
      }
    : {};

module.exports = async ({ storybook, adminType, e2e }, name, targetDir) => {
  await fs.copy(path.join(__dirname, 'template'), targetDir).then(() => {
    const pkg = require(path.join(targetDir, 'package.json'));
    pkg.name = name;

    if (adminType || storybook) {
      pkg.scripts = {
        ...pkg.scripts,
        ...adminScripts(adminType),
        ...storybookScripts(storybook),
        ...cypressScripts(e2e),
        postinstall: 'yarn build:ui',
      };
    }

    return fs.writeFile(path.join(targetDir, 'package.json'), JSON.stringify(pkg, null, 2));
  });
};
