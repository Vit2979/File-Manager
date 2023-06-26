import * as path from 'path';
import { access, stat } from 'fs/promises';
import { rename } from 'fs/promises';

export const rn = async (oldFileName, newFileName, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const renameFile = async () => {
    try {
      await rename(oldFileName, newFileName);
      console.log('File renamed');
    } catch (error) {
      console.log('Operation is not permitted!');
    }
  }

  const checkDir = async file => {
    try {
      await access(file);
      const stats = await stat(file);
      if (stats.isFile()) renameFile(file);
      else {
        console.log(`\x1b[31m${file} is not a file`);
        printCurrentDir();
      }
    } catch {
      console.log('\x1b[31mInvalid path_to_file input');
      printCurrentDir();
    }
  }

  oldFileName = path.normalize(oldFileName);
  newFileName = path.normalize(newFileName);
  if (!path.isAbsolute(oldFileName)) oldFileName = path.join(currentDir, oldFileName);
  if (!path.isAbsolute(newFileName)) newFileName = path.join(currentDir, newFileName);
  checkDir(oldFileName);
}