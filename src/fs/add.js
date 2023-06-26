import * as path from 'path';
import { open } from 'fs/promises';

export const add = async (file, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  file = path.normalize(file);
  if (!path.isAbsolute(file)) file = path.join(currentDir, file);
  try {
    await open(file, "w");
    console.log('File created');
  } catch (error) {
    console.log('Operation is not permitted!');
  }
  printCurrentDir();
}