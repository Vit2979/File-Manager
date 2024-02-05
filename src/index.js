import * as readline from 'readline';

import { getUserName } from './cli/args.js';
import { getHomedir } from './cli/env.js';
import { COMMANDS } from './consts/commands.js';
import { ACTIONS } from './consts/actions.js';

const printCommands = () => {
  console.log('\nPlease, print commands and wait for results:');
  Object.entries(COMMANDS).forEach(([key, value]) => {
    console.log(`\x1b[33m${key} \x1b[32m ${value}`); 
  });
}

const printCurrentDir = () => console.log(`\x1b[37m\nYou are currently in ${currentDir}`);

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);
let currentDir = getHomedir();

printCommands();
printCurrentDir();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on('line', async line => {
    let dirPrintMode = true;
    if (line === '.exit') rl.close();
    else {
      const action = line.split(' ')[0];
      let oldFilePath;
      let newDirName; 
      if (ACTIONS[action]) {
        switch (action) {
          case 'up':
            currentDir = await ACTIONS.up(currentDir);
            break;
          case 'cd':
            currentDir = await ACTIONS.cd(line.slice(3, line.length), currentDir);
            break;
          case 'ls':
            currentDir = await ACTIONS.ls(currentDir);
            break;
          case 'cat':
            ACTIONS.cat(line.slice(4, line.length), currentDir);
            dirPrintMode = false;
            break;
          case 'add':
            ACTIONS.add(line.slice(4, line.length), currentDir);
            dirPrintMode = false;
            break;
            case 'rn':
                const oldFileName = line.split(' ')[1];
                const newFileName = line.split(' ')[2];
                ACTIONS.rn(oldFileName, newFileName, currentDir);
                dirPrintMode = false;
                break;
              case 'cp':
                oldFilePath = line.split(' ')[1];
                newDirName = line.split(' ')[2];
                ACTIONS.cp(oldFilePath, newDirName, currentDir, false);
                dirPrintMode = false;
                break;
              case 'mv':
                oldFilePath = line.split(' ')[1];
                newDirName = line.split(' ')[2];
                ACTIONS.mv(oldFilePath, newDirName, currentDir, true);
                dirPrintMode = false;
                break;
              case 'rm':
                ACTIONS.rm(line.slice(3, line.length), currentDir);
                dirPrintMode = false;
                break;
                case 'hash':
                  ACTIONS.hash(line.slice(5, line.length), currentDir);
                  dirPrintMode = false;
                  break;
                case 'compress':
                  oldFilePath = line.split(' ')[1];
                  newDirName = line.split(' ')[2];
                  ACTIONS.compress(oldFilePath, newDirName, currentDir);
                  dirPrintMode = false;
                  break;
                case 'decompress':
                  oldFilePath = line.split(' ')[1];
                  newDirName = line.split(' ')[2];
                  ACTIONS.decompress(oldFilePath, newDirName, currentDir);
                  dirPrintMode = false;
                  break;
              case 'os':
                ACTIONS.os(line.slice(5, line.length));      
                break;      
          default:  
        } 
      } else {
        console.log('\x1b[31mInvalid input');
      }
      if (dirPrintMode) printCurrentDir();  
  }
});

rl.on('close', () => {
  console.log(`Thank you for using File Manager, ${userName}!`);
});