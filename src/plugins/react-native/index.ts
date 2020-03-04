import fs from 'fs-extra';
import path from 'path';
import replace from 'replace';
import { Package } from '../Package';

const capitalise = (str: string) => `${str[0].toUpperCase()}${str.substr(1)}`;

const renameDirs = (dir: string, newName: string) => {
  let files = fs.readdirSync(dir);

  files.forEach(file => {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      renameDirs(path.join(dir, file), newName);
    }
    if (file.includes('@mobile')) {
      fs.rename(path.join(dir, file), path.join(dir, file.replace('@mobile', newName)));
    }
  });
};

export const reactNative = async (
  workspace: string,
  targetDir: string,
  name: string = 'mobile'
) => {
  const p = path.join(targetDir, 'packages', name);
  const projectName = workspace
    .split('-')
    .map(capitalise)
    .reduce((acc, s) => acc + s, '');

  await fs
    .copy(path.join(__dirname, 'template'), p)
    .then(() =>
      replace({
        regex: '@appName',
        replacement: projectName,
        paths: [p],
        recursive: true,
        silent: true,
      })
    )
    .then(() => renameDirs(p, projectName))
    .then(() => {
      const pkg = new Package(p);
      pkg.setName(`@${workspace}/${name}`);
      return pkg.save();
    })
    .then(() => {
      const pkg = new Package(targetDir);

      pkg.addScript({
        [`start:${name}-ios`]: `concurrently \"yarn workspace ${`@${workspace}/${name}`} start\" \"yarn workspace ${`@${workspace}/${name}`} run-ios\"`,
        [`start:${name}-android`]: `concurrently \"yarn workspace ${`@${workspace}/${name}`} start\" \"yarn workspace ${`@${workspace}/${name}`} run-android\"`,
      });

      return pkg.save();
    });
};
