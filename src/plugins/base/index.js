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

async function base({ storybook, adminType }, name, targetDir) {
  await fs.copy(path.join(__dirname, 'template'), targetDir).then(() => {
    const package = require(path.join(targetDir, 'package.json'));
    package.name = name;

    if (adminType || storybook) {
      package.scripts = {
        ...package.scripts,
        ...adminScripts(adminType),
        ...storybookScripts(storybook),
        postinstall: 'yarn build:ui',
      };
    }

    return fs.writeFile(path.join(targetDir, 'package.json'), JSON.stringify(package, null, 2));
  });
}

module.exports = base;
