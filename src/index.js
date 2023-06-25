import { getUserName } from './cli/env.js';

const userName = getUserName();
console.log(`Welcome to the File Manager, ${userName}!`);