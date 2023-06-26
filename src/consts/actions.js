import { list } from '../fs/list.js';
import { cd } from '../fs/cd.js';
import { cat } from '../fs/cat.js';

export const ACTIONS = {
  up: async (currentDir) => await cd('..', currentDir),
  cd: async (dir, currentDir) => await cd(dir, currentDir),
  ls: async (currentDir) => await list(currentDir),
  cat: (file, currentDir) => cat(file, currentDir),
  add: 'Create empty file in current working directory',
  'rn path_to_file new_filename': 'Rename file',
  'cp path_to_file path_to_new_directory': 'Copy file',
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