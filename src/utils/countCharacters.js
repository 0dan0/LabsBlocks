export const countCharacters = (code) => {
  let res = '';
  let charCount = 0;
  let charCount2 = 0;
  let j = 0;
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '{') {
      charCount = j;
    } else if (code[i] === '}') {
      res += `!R${charCount}`;
	  j += 3;
	  if(charCount>=100) j+=2;
	  if(charCount>=10) j+=1;
    } else if (code[i] === '[') {
      charCount2 = j;
    } else if (code[i] === ']') {
      res += `!R${charCount2}`;
	  j += 3;
	  if(charCount2>=100) j+=2;
	  if(charCount2>=10) j+=1;
    } else {
      res += code[i];
	  j++;
    }
  }
  return res;
};
