import { countCharacters } from './countCharacters';

export const generateGoProCmd = (cmd) => {
  const hasLength = cmd?.length;
  let cloneCmd = `${cmd}`;
  //console.log(cloneCmd);
  cloneCmd = cloneCmd.replace(/\/\/.*(\r?\n\s*|\r\s*|$)/g, '');
  if (hasLength && cloneCmd[hasLength - 1] === '+') {
    cloneCmd = cloneCmd.substring(0, hasLength - 1);
  }
  return hasLength ? countCharacters(cloneCmd.replace(/;/g, '')) : '';
};


function stringToChunks(string, chunkSize) {
  var newcmd = "";
  while (string.length > 0) {
    newcmd = newcmd + string.substring(0, chunkSize) + '\n';
    string = string.substring(chunkSize, string.length);
  }
  return newcmd
}

export const generateGoProFormatCmd = (cmd) => {
  const hasLength = cmd?.length;
  let cloneCmd = `${cmd}`;
  let pos = 0;
  
  cloneCmd = cloneCmd.replace(/\/\/.*(\r?\n\s*|\r\s*|$)/g, '');
  cloneCmd = countCharacters(cloneCmd.replace(/;/g, ''));
  
  let newcmd = stringToChunks(cloneCmd, 44);
  cloneCmd = newcmd;
  
  return hasLength ? cloneCmd : '';
};
