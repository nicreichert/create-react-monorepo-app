import fs from 'fs-extra';
import path from 'path';
import { Package } from '../Package';

export const next = async (workspace: string, targetDir: string, name: string) => {
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
        [`start:${name}`]: `concurrently "(cd packages/${name} && yarn start)" "(cd packages/ui && yarn start)"`,
        [`build:${name}`]: `(cd packages/${name} && yarn build)`,
      });

      return pkg.save();
    });
};
