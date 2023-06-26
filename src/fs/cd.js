import * as path from 'path';
import { access, stat } from 'fs/promises';

export const cd = async (dir, currentDir) => {
  const checkDir = async dir => {
    let newDir = currentDir;
    try {
      await access(dir);
      const stats = await stat(dir);
      if (stats.isDirectory()) newDir = dir;
      else console.log(`\x1b[31m${dir} is not a directory`);
    } catch {
      console.log('\x1b[31mInvalid path input');
    }
    return newDir;
  }

  dir = path.normalize(dir);
  if (!path.isAbsolute(dir)) dir = path.join(currentDir, dir);
  return checkDir(dir);
}