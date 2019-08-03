const fs = require('fs-extra');
const path = require('path');

async function cra(destination, name, targetDir) {
  const webPath = path.join(targetDir, 'packages', destination);
  await fs.copy(path.join(__dirname, 'template'), webPath).then(() => {
    const package = require(path.join(webPath, 'package.json'));
    package.name = `@${name}/${destination}`;

    return fs.writeFile(path.join(webPath, 'package.json'), JSON.stringify(package, null, 2));
  });
}

module.exports = cra;
