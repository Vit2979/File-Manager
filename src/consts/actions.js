import { deleteLastElement } from '../fs/del-last-el.js';

export const ACTIONS = {
  up: (currentPathArr) => deleteLastElement(currentPathArr),
  'cd path_to_directory': 'Go to dedicated folder from current directory',
  ls: 'List all files and folder in current directory',
  'cat path_to_file': `Read file and print it's content`,
  'add new_file_name': 'Create empty file in current working directory',
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