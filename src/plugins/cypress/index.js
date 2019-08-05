'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = async (workspace, targetDir, name = 'cypress') => {
  const cypressPath = path.join(targetDir, 'packages', name);
  await fs.copy(path.join(__dirname, 'template'), cypressPath).then(() => {
    const pkg = require(path.join(cypressPath, 'package.json'));
    pkg.name = `@${workspace}/${name}`;

    return fs.writeFile(path.join(cypressPath, 'package.json'), JSON.stringify(pkg, null, 2));
  });
};
