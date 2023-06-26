import { list } from '../fs/list.js';
import { cd } from '../fs/cd.js';
import { cat } from '../fs/cat.js';
import { add } from '../fs/add.js';
import { rn } from '../fs/rn.js';
import { cp } from '../fs/cp.js';

export const ACTIONS = {
  up: async (currentDir) => await cd('..', currentDir),
  cd: async (dir, currentDir) => await cd(dir, currentDir),
  ls: async (currentDir) => await list(currentDir),
  cat: (file, currentDir) => cat(file, currentDir),
  add: (file, currentDir) => add(file, currentDir),
  rn: (oldFileName, newFileName, currentDir) => rn(oldFileName, newFileName, currentDir),
  cp: (oldFilePath, newDirName, currentDir) => cp(oldFilePath, newDirName, currentDir),
  'mv path_to_file path_to_new_directory': 'Move file',
  'rm path_to_file': 'Delete file',
  'os --EOL': 'Get EOL',
  'os --cpus': 'Get host machine CPUs info',
  'os --homedir': 'Get home directory',
  'os --username': 'Get current system user name',
  'os --architecture': 'Get CPU architecture',
  'hash path_to_file': 'Calculate hash for file',
  'compress path_to_file path_to_destination': 'Compress file',
  'decompress path_to_file path_to_destination': 'Decompress file'
}