import * as readline from 'readline';

import { getUserName } from './cli/args.js';
import { getHomedir } from './cli/env.js';
import { getPathArr } from './fs/pathArr.js';
import { getPath } from './fs/path.js';
import { COMMANDS } from './consts/commands.js';
import { ACTIONS } from './consts/actions.js';

const printCommands = () => {
  console.log('\nPlease, print commands and wait for results:');
  Object.entries(COMMANDS).forEach(([key, value]) => {
    console.log(`\x1b[33m${key} \x1b[32m ${value}`); 
  });
}

const printCurrentDir = () => {
  currentDir = getPath(currentPathArr);
  console.log(`\x1b[37m\nYou are currently in ${currentDir}`);
}

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);
let currentDir = getHomedir();
let currentPathArr = getPathArr(currentDir);

printCommands();
printCurrentDir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', line => {
  if (line === '.exit') rl.close();
  else {
    const action = line.split(' ')[0];
    if (ACTIONS[action]) {
      switch (action) {
        case 'up':
          if (currentPathArr.length > 1) currentPathArr = ACTIONS[action](currentPathArr);
          break;
        default:

      } 
    } else console.log('\x1b[31mInvalid input');
    printCurrentDir();
  }
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}!`);
});