import { list } from '../fs/list.js';
import { cd } from '../fs/cd.js';
import { cat } from '../fs/cat.js';
import { add } from '../fs/add.js';
import { rn } from '../fs/rn.js';
import { cp } from '../fs/cp.js';
import { rm } from '../fs/rm.js';
import { osMethods } from '../os/os.js';
import { calculateHash } from '../fs/hash.js';
import { compress } from '../fs/compress.js';
import { decompress } from '../fs/decompress.js';

export const ACTIONS = {
  up: async (currentDir) => await cd('..', currentDir),
  cd: async (dir, currentDir) => await cd(dir, currentDir),
  ls: async (currentDir) => await list(currentDir),
  cat: (file, currentDir) => cat(file, currentDir),
  add: (file, currentDir) => add(file, currentDir),
  rn: (oldFileName, newFileName, currentDir) => rn(oldFileName, newFileName, currentDir),
  cp: (oldFilePath, newDirName, currentDir, moveMode) => cp(oldFilePath, newDirName, currentDir, moveMode),
  mv: (oldFilePath, newDirName, currentDir, moveMode) => cp(oldFilePath, newDirName, currentDir, moveMode),
  rm: (fileToDeletePath, currentDir) => rm(fileToDeletePath, currentDir),
  os: mode => osMethods(mode),
  hash: (filePath, currentDir) => calculateHash(filePath, currentDir),
  compress: (oldFilePath, newDirName, currentDir) => compress(oldFilePath, newDirName, currentDir),
  decompress: (oldFilePath, newDirName, currentDir) => decompress(oldFilePath, newDirName, currentDir),

}