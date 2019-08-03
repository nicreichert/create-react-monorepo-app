'use strict';

const fs = require('fs-extra');
const path = require('path');

module.exports = async (destination, name, targetDir) => {
  const webPath = path.join(targetDir, 'packages', destination);
  await fs.copy(path.join(__dirname, 'template'), webPath).then(() => {
    const pkg = require(path.join(webPath, 'package.json'));
    pkg.name = `@${name}/${destination}`;

    return fs.writeFile(path.join(webPath, 'package.json'), JSON.stringify(pkg, null, 2));
  });
};
