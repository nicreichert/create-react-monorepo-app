import fs from 'fs-extra';
import path from 'path';
import { Package } from '../Package';

export const cypress = async (workspace: string, targetDir: string, name: string = 'cypress') => {
  const p = path.join(targetDir, 'packages', name);
  await fs
    .copy(path.join(process.cwd(), 'templates/cypress'), p)
    .then(() => {
      const pkg = new Package(p);
      pkg.setName(`@${workspace}/${name}`);

      return pkg.save();
    })
    .then(() => {
      const pkg = new Package(targetDir);

      pkg.addScript({
        [`start:${name}`]: `(cd packages/${name} && yarn start)`,
      });

      return pkg.save();
    });
};
