import * as path from 'path';
import { access, stat } from 'fs/promises';
import { unlink } from 'fs/promises';

export const rm = async (fileToDeletePath, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const deleteFile = async () => {
    try {
      await unlink(fileToDeletePath);
      console.log('File deleted');
    } catch (error) {
      console.log('Operation is not permitted!');
    }
    printCurrentDir();
  }

  const checkDir = async file => {
    try {
      await access(file);
      const stats = await stat(file);
      if (stats.isFile()) deleteFile();
      else {
        console.log(`\x1b[31m${file} is not a file`);
        printCurrentDir();
      }
    } catch {
      console.log('\x1b[31mInvalid path_to_file input');
      printCurrentDir();
    }
  }

  fileToDeletePath = path.normalize(fileToDeletePath);
  if (!path.isAbsolute(fileToDeletePath)) fileToDeletePath = path.join(currentDir, fileToDeletePath);
  checkDir(fileToDeletePath);
}
