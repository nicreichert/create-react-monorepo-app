import fs from 'fs-extra';
import path from 'path';
import { Package } from '../Package';

export const cypress = async (workspace: string, targetDir: string, name: string = 'cypress') => {
  const p = path.join(targetDir, 'packages', name);
  await fs
    .copy(path.join(__dirname, 'template'), p)
    .then(() => {
      const pkg = new Package(p);
      pkg.setName(`@${workspace}/${name}`);

      return pkg.save();
    })
    .then(() => {
      const pkg = new Package(targetDir);

      pkg.addScript({
        [`start:${name}`]: `yarn workspace @${workspace}/${name} start`,
      });

      return pkg.save();
    });
};
