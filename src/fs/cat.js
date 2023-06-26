import * as path from 'path';
import { access, stat } from 'fs/promises';
import { open } from 'fs/promises';

export const cat = async (file, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const readFile = async file => {
    try {
      const fd = await open(file);
      const myReadStream = fd.createReadStream();

      myReadStream.on('data', chunk => {
        const textData = Buffer.from(chunk).toString();
        process.stdout.write(textData + '\n');
      });

      myReadStream.on('end', () => printCurrentDir());
    } catch (error) {
      process.stdout.write('Read stream error\n');
    }
  }

  const checkDir = async file => {
    try {
      await access(file);
      const stats = await stat(file);
      if (stats.isFile()) readFile(file);
      else {
        console.log(`\x1b[31m${file} is not a file`);
        printCurrentDir();
      }
    } catch {
      console.log('\x1b[31mInvalid path input');
      printCurrentDir();
    }
  }

  file = path.normalize(file);
  if (!path.isAbsolute(file)) file = path.join(currentDir, file);
  checkDir(file);
}