export const countCharacters = (code) => {
  let res = '';
  let charCount = 0;
  let charCount2 = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '[') {
      charCount = i;
    } else if (code[i] === ']') {
      res += `!R${charCount}`;
    } else if (code[i] === '{') {
      charCount2 = i;
    } else if (code[i] === '}') {
      res += `!R${charCount2}`;
    } else {
      res += code[i];
    }
  }
  return res;
};
