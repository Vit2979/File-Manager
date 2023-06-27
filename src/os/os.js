import * as os from 'os';

export const osMethods = async mode => {
  switch (mode) {
    case 'EOL':
      const osEOL = JSON.stringify(os.EOL);
      console.log(`Default system End-Of-Line is ${osEOL}`);
      break;
    case 'cpus':
      const osCpus = os.cpus();
      console.log(`Overall amount of CPUS is ${osCpus.length}`);
      osCpus.forEach((proc, index) => {
        console.log(`${index + 1}:`);
        console.log(`Model: ${proc.model}`);
        console.log(`Clock rate is ${proc.speed} GHz`);
      })
      break;
    case 'homedir':
      const homedir = os.homedir();
      console.log(`Home directory is ${homedir}`);
      break;
    case 'username':
      const username = os.userInfo().username;
      console.log(`Current system user name is ${username}`);
      break;
    case 'architecture':
      const architecture = os.arch();
      console.log(`Current CPU architecture is ${architecture}`);
      break;
    default:
  } 
}
