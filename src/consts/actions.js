import { list } from '../fs/list.js';
import { cd } from '../fs/cd.js';
import { cat } from '../fs/cat.js';
import { add } from '../fs/add.js';
import { rn } from '../fs/rn.js';
import { cp } from '../fs/cp.js';
import { rm } from '../fs/rm.js';
import { osMethods } from '../os/os.js';

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
  'hash path_to_file': 'Calculate hash for file',
  'compress path_to_file path_to_destination': 'Compress file',
  'decompress path_to_file path_to_destination': 'Decompress file'
}