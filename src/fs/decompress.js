import * as path from 'path';
import { access, stat, mkdir } from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { createBrotliDecompress } from 'zlib';

export const decompress = async (oldFilePath, newDirName, currentDir) => {
  const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

  const copyOldFile = async () => {
    const prevFilePath = oldFilePath;
    const nextFilePath = path.join(newDirName, path.basename(oldFilePath));
    try {
      await mkdir(newDirName, { recursive: true });
    } catch (error) {
      console.log('Operation is not permitted!');
      printCurrentDir();
    }

    const input = createReadStream(prevFilePath);
    const output = createWriteStream(nextFilePath);

    input.on('error', () => {
      console.log('Operation failed');
      printCurrentDir();
    });

    output.on('error', () => {
      console.log('Operation failed');
      printCurrentDir();
    });

    input
      .pipe(createBrotliDecompress())
      .pipe(output)
      .on('finish', () => {
        console.log('File decompressed');
        printCurrentDir();
      });
  };

  const checkDir = async (file) => {
    try {
      await access(file);
      const stats = await stat(file);
      if (stats.isFile()) {
        await copyOldFile();
      } else {
        console.log(`\x1b[31m${file} is not a file`);
        printCurrentDir();
      }
    } catch {
      console.log('\x1b[31mInvalid path_to_file input');
      printCurrentDir();
    }
  };

  oldFilePath = path.normalize(oldFilePath);
  newDirName = path.normalize(newDirName);
  if (!path.isAbsolute(oldFilePath)) {
    oldFilePath = path.join(currentDir, oldFilePath);
  }
  if (!path.isAbsolute(newDirName)) {
    newDirName = path.join(currentDir, newDirName);
  }
  await checkDir(oldFilePath);
};