export const countCharacters = (code) => {
  let res = '';
  let charCount = 0;
  let charCount2 = 0;
  let j = 0;
  let offset = 0;
  
  if(code[0] === '!' && code[1] === 'M' && code[2] === 'B' && code[3] === 'O' && code[4] === 'O' && code[5] === 'T') // !MBOOT
  {
	  offset = 21;
  }
  
  for (let i = 0; i < code.length; i++) {
    if (code[i] === '{') {
      charCount = j - offset;
    } else if (code[i] === '}') {
      res += `!R${charCount}`;
	  j += 3;
	  if(charCount>=100) j+=2;
	  if(charCount>=10) j+=1;
    } else if (code[i] === '[') {
      charCount2 = j - offset;
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
