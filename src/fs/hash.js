import * as path from 'path';
import { access, stat } from 'fs/promises';
import { createReadStream, constants } from 'fs';
import { stdout } from 'process';
import { createHash } from 'crypto';

export const calculateHash = async (filePath, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  try {
    const normalizedFilePath = path.normalize(filePath);
    const absoluteFilePath = path.isAbsolute(normalizedFilePath) ? normalizedFilePath : path.join(currentDir, normalizedFilePath);
    
    await access(absoluteFilePath, constants.F_OK);
    const fileStat = await stat(absoluteFilePath);
  
    if (!fileStat.isFile()) {
      console.log(`\x1b[31m${absoluteFilePath} is not a file`);
      printCurrentDir();
      return;
    }
  
    const hash = createHash('sha256');
    const input = createReadStream(absoluteFilePath);
  
    input.pipe(hash).setEncoding('hex').pipe(stdout);
  
    input.on('end', () => {
      console.log();
      printCurrentDir();
    });
  } catch {
    console.log('\x1b[31mInvalid path_to_file input');
    printCurrentDir();
  }
};