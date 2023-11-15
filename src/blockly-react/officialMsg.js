import Blockly from 'blockly/core';
const map = {
  title: 'Title',
  blocks: 'Blocks',
  linkTooltip: '保存并创建链接',
  runTooltip: '运行程序',
  badCode: '程序错误:\n%1',
  timeout: '超出最大执行次数',
  trashTooltip: '弃置所有块',
  catLogic: 'Branches',
  catLoops: 'Loops',
  catMath: 'Math',
  catText: 'Print/Comments',
  catLists: 'Lists',
  catColour: 'Color',
  catVariables: 'Variables',
  customVariables: 'GoPro Variables',
  catFunctions: 'Functions',
  listVariable: 'List Variables',
  textVariable: 'Text Variables',
  httpRequestError: '网络请求出错',
  linkAlert:
    "Share your blocks with this public link. We'll delete them if not used for a year. They are not associated with your account and handled as per Google's Privacy Policy. Please be sure not to include any private information.:\n\n%1",
  hashError: "Sorry, '%1' doesn't correspond with any saved program.",
  xmlError:
    'Could not load your saved file. Perhaps it was created with a different version of Blockly?',
  badXml:
    "Error parsing XML:\n%1\n\nSelect 'OK' to abandon your changes or 'Cancel' to further edit the XML.",
};

const MSG = Object.keys(map).reduce((a, b) => {
  a[b.toUpperCase()] = map[b];
  return a;
}, {});

Blockly.setLocale(MSG);
