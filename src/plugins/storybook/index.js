const fs = require('fs-extra');
const path = require('path');

async function storybook(name, targetDir) {
  const storybookPath = path.join(targetDir, '/packages/storybook');
  await fs.copy(path.join(__dirname, 'template'), storybookPath).then(() => {
    const package = require(path.join(storybookPath, 'package.json'));
    package.name = `@${name}/storybook`;

    return fs.writeFile(path.join(storybookPath, 'package.json'), JSON.stringify(package, null, 2));
  });
}

module.exports = storybook;
