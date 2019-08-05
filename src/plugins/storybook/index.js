'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = async (workspace, targetDir, name = 'storybook') => {
  const storybookPath = path.join(targetDir, 'packages', name);
  await fs.copy(path.join(__dirname, 'template'), storybookPath).then(() => {
    const pkg = require(path.join(storybookPath, 'package.json'));
    pkg.name = `@${workspace}/${name}`;

    return fs.writeFile(path.join(storybookPath, 'package.json'), JSON.stringify(pkg, null, 2));
  });
};
