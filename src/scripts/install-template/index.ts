import fs from 'fs-extra';
import path from 'path';
import { Package } from '../../plugins/Package';

export const installTemplate = async (targetDir: string) => {
  const pkg = new Package(targetDir);

  // add script to package.json
  pkg.addScript({
    'install-template': 'node scripts/install-template',
  });

  // add dependencies to package.json
  pkg.addDevDependency({
    'fs-extra': '^8.1.0',
    inquirer: '^6.5.0',
    execa: '^2.0.3',
    'validate-npm-package-name': '^3.0.0',
    ora: '^3.4.0',
    chalk: '^2.4.2',
    replace: '^1.1.0',
  });

  await pkg.save();

  await fs.copy(
    path.join(__dirname, '../../plugins/'),
    path.join(targetDir, 'scripts/install-template')
  );

  await fs.copy(
    path.join(__dirname, 'script/install-template.js'),
    path.join(targetDir, 'scripts/install-template/index.js')
  );
};
