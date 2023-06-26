import * as path from 'path';
import { access, stat } from 'fs/promises';
import { copyFile, mkdir } from 'fs/promises';

export const cp = async (oldFilePath, newDirName, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const copyOldFile = async () => {
    try {
      const prevFilePath = oldFilePath;
      const nextFilePath = path.join(newDirName, path.parse(oldFilePath).base);
      await mkdir(newDirName, {
        recursive: true
      });
      await copyFile(prevFilePath, nextFilePath);
      console.log('File copied');
    } catch (error) {
      console.log('Operation is not permitted!');
    }
    printCurrentDir();
  }

  const checkDir = async file => {
    try {
      await access(file);
      const stats = await stat(file);
      if (stats.isFile()) copyOldFile();
      else {
        console.log(`\x1b[31m${file} is not a file`);
        printCurrentDir();
      }
    } catch {
      console.log('\x1b[31mInvalid path_to_file input');
      printCurrentDir();
    }
  }

  oldFilePath = path.normalize(oldFilePath);
  newDirName = path.normalize(newDirName);
  if (!path.isAbsolute(oldFilePath)) oldFilePath = path.join(currentDir, oldFilePath);
  if (!path.isAbsolute(newDirName)) newDirName = path.join(currentDir, newDirName);
  checkDir(oldFilePath);
}