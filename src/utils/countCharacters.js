export const countCharacters = (code) => {
  let res = '';
  let charCount = -1;
  let charCount2 = -1;
  let charCount3 = -1;
  let charCount4 = -1;
  let j = 0;
  let offset = 0;
  let inQuote = 0;
  
  for (let i = 0; i < code.length-8; i++) {
    if(code[i+0] === '!' && code[i+1] === 'S' && code[i+2] === 'A' && code[i+3] === 'V' && code[i+4] === 'E' && code[i+5] === 'b' && code[i+6] === 't' && code[i+7] === '=') // !MBOOT="!Lbt"!SAVEbt=
    {
	    offset = i+8;
    }
  }
  
  /*
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
  */

  for (let i = 0; i < code.length; i++) {
	if (code[i] === '"')
	{
		inQuote = 1 - inQuote;
	}
	
    if (code[i] === '{' && inQuote === 0) {  // first time is the loop start, second time the same code, is goto loop.
      if(charCount == -1) {
		charCount = j - offset;
	  }
	  else
	  {
		if(charCount > 0) 
		{
		  res += `!R${charCount}`;
		  j += 3;
		  if(charCount>=100) j+=2;
		  if(charCount>=10) j+=1;
	    }
		else
		{
		  res += `!R`;
		  j += 2;
		}
	  }
    }
	else if (code[i] === '[' && inQuote === 0) {
      if(charCount2 == -1) {
		charCount2 = j - offset;
	  }
	  else
	  {
		if(charCount2 > 0) 
		{
		  res += `!R${charCount2}`;
		  j += 3;
		  if(charCount2>=100) j+=2;
		  if(charCount2>=10) j+=1;
	    }
		else
		{
		  res += `!R`;
		  j += 2;
		}
	  }
    }
	else if (code[i] === '}' && inQuote === 0) {
      if(charCount3 == -1) {
		charCount3 = j - offset;
	  }
	  else
	  {
		if(charCount3 > 0) 
		{
		  res += `!R${charCount3}`;
		  j += 3;
		  if(charCount3>=100) j+=2;
		  if(charCount3>=10) j+=1;
	    }
		else
		{
		  res += `!R`;
		  j += 2;
		}
	  }
    }
	else if (code[i] === ']' && inQuote === 0) {
      if(charCount4 == -1) {
		charCount4 = j - offset;
	  }
	  else
	  {
		if(charCount4 > 0) 
		{
		  res += `!R${charCount4}`;
		  j += 3;
		  if(charCount4>=100) j+=2;
		  if(charCount4>=10) j+=1;
	    }
		else
		{
		  res += `!R`;
		  j += 2;
		}
	  }
    } else {
      res += code[i];
	  j++;
    }
  }  
  
  return res;
};
