import Blockly from 'blockly/core';
import { javascriptGenerator } from 'blockly/javascript';
// javascriptGenerator.ORDER_ATOMIC = 0; // 0 "" ...
// javascriptGenerator.ORDER_NEW = 1.1; // new
// javascriptGenerator.ORDER_MEMBER = 1.2; // . []
// javascriptGenerator.ORDER_FUNCTION_CALL = 2; // ()
// javascriptGenerator.ORDER_INCREMENT = 3; // ++
// javascriptGenerator.ORDER_DECREMENT = 3; // --
// javascriptGenerator.ORDER_BITWISE_NOT = 4.1; // ~
// javascriptGenerator.ORDER_UNARY_PLUS = 4.2; // +
// javascriptGenerator.ORDER_UNARY_NEGATION = 4.3; // -
// javascriptGenerator.ORDER_LOGICAL_NOT = 4.4; // !
// javascriptGenerator.ORDER_TYPEOF = 4.5; // typeof
// javascriptGenerator.ORDER_VOID = 4.6; // void
// javascriptGenerator.ORDER_DELETE = 4.7; // delete
// javascriptGenerator.ORDER_AWAIT = 4.8; // await
// javascriptGenerator.ORDER_EXPONENTIATION = 5.0; // **
// javascriptGenerator.ORDER_MULTIPLICATION = 5.1; // *
// javascriptGenerator.ORDER_DIVISION = 5.2; // /
// javascriptGenerator.ORDER_MODULUS = 5.3; // %
// javascriptGenerator.ORDER_SUBTRACTION = 6.1; // -
// javascriptGenerator.ORDER_ADDITION = 6.2; // +
// javascriptGenerator.ORDER_BITWISE_SHIFT = 7; // << >> >>>
// javascriptGenerator.ORDER_RELATIONAL = 8; // < <= > >=
// javascriptGenerator.ORDER_IN = 8; // in
// javascriptGenerator.ORDER_INSTANCEOF = 8; // instanceof
// javascriptGenerator.ORDER_EQUALITY = 9; // == != === !==
// javascriptGenerator.ORDER_BITWISE_AND = 10; // &
// javascriptGenerator.ORDER_BITWISE_XOR = 11; // ^
// javascriptGenerator.ORDER_BITWISE_OR = 12; // |
// javascriptGenerator.ORDER_LOGICAL_AND = 13; // &&
// javascriptGenerator.ORDER_LOGICAL_OR = 14; // ||
// javascriptGenerator.ORDER_CONDITIONAL = 15; // ?:
// javascriptGenerator.ORDER_ASSIGNMENT = 16; // = += -= **= *= /= %= <<= >>= ...
// javascriptGenerator.ORDER_YIELD = 17; // yield
// javascriptGenerator.ORDER_COMMA = 18; // ,
// javascriptGenerator.ORDER_NONE = 99; // (...)

import { getOperatorsAndVariables } from '../utils/findOperatorFromString';
import { getHourMinuteFromProp } from '../utils/timeUtils';
import { hourGenerator, minuteGenerator } from '../utils/hourMinGenerator';
import {
  BLOCKLY_DEFAULT_TYPE,
  MATH_OPERATION_TYPE,
  VARIABLE_LIST_TYPE,
} from '../utils/customBlocklyType';

Blockly.Blocks['bp_gopro_start'] = {
  init: function () {
    this.appendDummyInput().appendField('Start');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_end'] = {
  init: function () {
    this.appendDummyInput().appendField('End');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_upload'] = {
  init: function () {
    this.appendDummyInput().appendField('Upload');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_repeat'] = {
  init: function () {
    this.appendDummyInput().appendField('Repeat');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_tile_pick'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('🏷️ Start at')
      .appendField(new Blockly.FieldTextInput('A Tile'), 'TILE');
    this.setOutput(true, 'Tile');
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.Blocks['bp_tile_pick_quickly'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('🏷️ Start quickly at')
      .appendField(new Blockly.FieldTextInput('A Tile'), 'TILE');
    this.setOutput(true, 'Tile');
    this.setColour(150);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['set_var'] = {
  init: function () {
    this.appendValueInput('set_user_defined_val')
      .setCheck([
        BLOCKLY_DEFAULT_TYPE.NUMBER,
        VARIABLE_LIST_TYPE.SYSTEM_DEFINED,
        VARIABLE_LIST_TYPE.USER_DEFINED,
        MATH_OPERATION_TYPE.ARITHMETIC,
        MATH_OPERATION_TYPE.LOGARITHMIC,
      ])
      .appendField('set the value of')
      .appendField(
        new Blockly.FieldDropdown([
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
          ['D', 'D'],
          ['E', 'E'],
          ['F', 'F'],
          ['G', 'G'],
        ]),
        'USER_DEFINED_VAR'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['system_defined_var_list'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['accel (g)', 'a'],
        ['battery (%)', 'b'],
        ['distance (m)', 'c'],
        ['GPS DOP', 'd'],
        ['gyro (dps)', 'g'],
        ['height (m)', 'h'],
        ['iso value', 'i'],
        ['speed (km/h)', 'k'],
        ['loop count', 'l'],
        ['motion (%)', 'm'],
        ['sound level (dB)', 'p'],
        ['recording (>0)', 'r'],
        ['Remote Connected (>0)', 'r:C'],
        ['App Connected (>0)', 'r:A'],
        ['shutter speed', 's'],
        ['USB power (>0)', 'u'],
        ['mode press count', 'y'],
        ['shutter press count', 'z'],
      ]),
      'SYSTEM_DEFINED_VAR_LIST'
    );
    this.setOutput(true, VARIABLE_LIST_TYPE.SYSTEM_DEFINED);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['number_input'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldNumber(0),
      'number_input'
    );
    this.setOutput(true, BLOCKLY_DEFAULT_TYPE.NUMBER);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['basic_math_op'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['+', '+'],
        ['-', '-'],
        ['*', '*'],
        ['/', '/'],
        ['^', '^'],
      ]),
      'math_op'
    );
    this.appendValueInput('VAR_B').setCheck(BLOCKLY_DEFAULT_TYPE.NUMBER);
    this.setInputsInline(true);
    this.setOutput(true, MATH_OPERATION_TYPE.ARITHMETIC);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['special_math_op'] = {
  init: function () {
    this.appendValueInput('VAR_A')
      .setCheck('Number')
      .appendField(
        new Blockly.FieldDropdown([['log', '#']]),
        'special_math_ops'
      );
    this.setOutput(true, MATH_OPERATION_TYPE.LOGARITHMIC);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['print'] = {
  init: function () {
    this.appendValueInput('print')
      .setCheck([BLOCKLY_DEFAULT_TYPE.STRING, VARIABLE_LIST_TYPE.USER_DEFINED])
      .appendField('print');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['time_picker'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('current_time')
      .appendField(
        new Blockly.FieldDropdown([
          ['>', '>'],
          ['<', '<'],
        ]),
        'comparison_op'
      )
      .appendField(new Blockly.FieldDropdown(hourGenerator()), 'hour')
      .appendField(':')
      .appendField(new Blockly.FieldDropdown(minuteGenerator()), 'min');
    this.setOutput(true, BLOCKLY_DEFAULT_TYPE.BOOLEAN);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['set_var_system'] = {
  init: function () {
    this.appendValueInput('set_system_defined_val')
      .setCheck(BLOCKLY_DEFAULT_TYPE.NUMBER)
      .appendField('set the value of')
      .appendField(
        new Blockly.FieldDropdown([
			['accel (g)', 'a'],
			['battery (%)', 'b'],
			['distance (m)', 'c'],
			['GPS DOP', 'd'],
			['gyro (dps)', 'g'],
			['height (m)', 'h'],
			['iso value', 'i'],
			['speed (km/h)', 'k'],
			['loop count', 'l'],
			['motion (%)', 'm'],
			['sound level (dB)', 'p'],
			['recording (>0)', 'r'],
			['Remote Connected (>0)', 'r:C'],
			['App Connected (>0)', 'r:A'],
			['shutter speed', 's'],
			['USB power (>0)', 'u'],
			['mode press count', 'y'],
			['shutter press count', 'z'],
        ]),
        'SYSTEM_DEFINED_VAR'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['user_defined_var_list'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['A', 'A'],
        ['B', 'B'],
        ['C', 'C'],
        ['D', 'D'],
        ['E', 'E'],
        ['F', 'F'],
        ['G', 'G'],
      ]),
      'USER_DEFINED_VAR_LIST'
    );
    this.setOutput(true, VARIABLE_LIST_TYPE.USER_DEFINED);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['started_at'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Start at')
      .appendField(new Blockly.FieldDropdown(hourGenerator()), 'hour')
      .appendField(':')
      .appendField(new Blockly.FieldDropdown(minuteGenerator()), 'min');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['started_at_quickly'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Start quickly at')
      .appendField(new Blockly.FieldDropdown(hourGenerator()), 'hour')
      .appendField(':')
      .appendField(new Blockly.FieldDropdown(minuteGenerator()), 'min');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(130);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

// Blockly.Blocks['custom_if'] = {
//   init: function () {
//     this.appendValueInput('IF').setCheck('Boolean').appendField('if');
//     this.appendStatementInput('IFDO').setCheck(null);
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//   },
// };

// Blockly.Blocks['custom_else'] = {
//   init: function () {
//     this.appendStatementInput('CUSTOM_ELSE').setCheck(null).appendField('else');
//     this.setPreviousStatement(true, 'if');
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   },
// };

Blockly.Blocks['customized_if_else'] = {
  init: function () {
    this.appendValueInput('CUSTOM_IF')
      .setCheck(BLOCKLY_DEFAULT_TYPE.BOOLEAN)
      .appendField('if');
    this.appendStatementInput('IFDO').setCheck(null).appendField('do');
    // this.appendStatementInput('ELSEDO')
    //   .setCheck(null)
    //   .setAlign(Blockly.ALIGN_RIGHT)
    //   .appendField('else');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['customized_logic_compare'] = {
  init: function () {
    this.appendValueInput('VAR_A').setCheck([
      VARIABLE_LIST_TYPE.USER_DEFINED,
      VARIABLE_LIST_TYPE.SYSTEM_DEFINED,
    ]);
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['>', '>'],
        ['<', '<'],
      ]),
      'comapre_op'
    );
    this.appendValueInput('VAR_B').setCheck([
      VARIABLE_LIST_TYPE.USER_DEFINED,
      BLOCKLY_DEFAULT_TYPE.NUMBER,
    ]);
    this.setInputsInline(true);
    this.setOutput(true, BLOCKLY_DEFAULT_TYPE.BOOLEAN);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['text_print'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('print')
      .appendField(new Blockly.FieldTextInput('Hello World'), 'TEXT_PRINT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['goto_loop'] = {
  init: function () {
    this.appendDummyInput().appendField('goto loop');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['loop'] = {
  init: function () {
    this.appendDummyInput().appendField('loop:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

// Blockly.Blocks['loop'] = {
//   init: function () {
//     this.appendStatementInput('loop').setCheck(null).appendField('loop:');
//     this.setPreviousStatement(true, null);
//     this.setNextStatement(true, null);
//     this.setColour(230);
//     this.setTooltip('');
//     this.setHelpUrl('');
//   },
// };

// javascriptGenerator['loop'] = function (block) {
//   var statements_loop = javascriptGenerator.statementToCode(block, 'loop');
//   // TODO: Assemble JavaScript into code variable.
//   var code = statements_loop?.trim()?.replace(/;/g, '');
//   // const loopStatementsLength = code?.length;
//   // if (loopStatementsLength && code[loopStatementsLength - 1] === '+') {
//   //   code = code.substring(
//   //     0,
//   //     loopStatementsLength - 1
//   //   );
//   // }
//   return `[${code}`;
// };

javascriptGenerator['loop'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '[';
  return code;
};

javascriptGenerator['goto_loop'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = ']';
  return code;
};

javascriptGenerator['text_print'] = function (block) {
  var text_print_val = block.getFieldValue('TEXT_PRINT');
  return `"${text_print_val}";`;
};

javascriptGenerator['customized_logic_compare'] = function (block) {
  var value_var_a = javascriptGenerator.valueToCode(
    block,
    'VAR_A',
    javascriptGenerator.ORDER_ATOMIC
  );
  var dropdown_comapre_op = block.getFieldValue('comapre_op');
  var value_var_b = javascriptGenerator.valueToCode(
    block,
    'VAR_B',
    javascriptGenerator.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `${dropdown_comapre_op}${value_var_a}${value_var_b}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['customized_if_else'] = function (block) {
  var value_custom_if = javascriptGenerator.valueToCode(
    block,
    'CUSTOM_IF',
    javascriptGenerator.ORDER_ATOMIC
  );
  var statements_ifdo = javascriptGenerator.statementToCode(block, 'IFDO');
  var statements_elsedo = javascriptGenerator.statementToCode(block, 'ELSEDO');
  let trimmedStatements = statements_ifdo?.trim().replace(/;/g, '+');
  let trimmedStatementsElse = statements_elsedo?.trim().replace(/;/g, '+');
  const trimmedStatementsLength = trimmedStatements?.length;
  const trimmedStatementsElseLength = trimmedStatementsElse?.length;
  if (
    trimmedStatementsLength &&
    trimmedStatements[trimmedStatementsLength - 1] === '+'
  ) {
    console.log({
      trimmedStatements,
      last: trimmedStatements[trimmedStatementsLength - 1],
    });
    trimmedStatements = trimmedStatements.substring(
      0,
      trimmedStatementsLength - 1
    );
  }

  if (
    trimmedStatementsElseLength &&
    trimmedStatementsElse[trimmedStatementsElseLength - 1] === '+'
  ) {
    console.log({
      trimmedStatementsElse,
      last: trimmedStatementsElse[trimmedStatementsElseLength - 1],
    });
    trimmedStatementsElse = trimmedStatementsElse.substring(
      0,
      trimmedStatementsElseLength - 1
    );
  }

  // const children = block.getChildren(true);

  // const firstChildOfIfBlock = children[1] || null;
  // const firstChildOfElseBlock = children[2] || null;

  // const allChildsOfIfBlock = firstChildOfIfBlock
  //   ? generateAllChildrenBlocks(firstChildOfIfBlock, [firstChildOfIfBlock])
  //   : [];

  // const allChildsOfElseBlock = firstChildOfElseBlock
  //   ? generateAllChildrenBlocks(firstChildOfElseBlock, [firstChildOfElseBlock])
  //   : [];

  // const childsToCodeIfBlock = allChildsOfIfBlock
  //   .filter((block) => !ignoredBlocks.includes(block?.type))
  //   .map((block) => javascriptGenerator[block?.type](block))
  //   .join('+');

  // const childsToCodeElseBlock = allChildsOfElseBlock
  //   .filter((block) => !ignoredBlocks.includes(block?.type))
  //   .map((block) => javascriptGenerator[block?.type](block))
  //   .join('+');

  // const printBlock = block.getChildren().find((ch) => ch.type === 'text_print');
  // const printBlockValue = printBlock?.getFieldValue('TEXT_PRINT');
  // const hasPrintBlockNextBlock = printBlock?.getNextBlock();

  // const renderElseStatementCode = childsToCodeElseBlock?.length
  //   ? `~${childsToCodeElseBlock}`
  //   : '';

  const renderElseStatementCode = trimmedStatementsElseLength
    ? `~${trimmedStatementsElse}`
    : '';

  // const finalIfStatement =
  //   trimmedStatements?.length &&
  //   (hasPrintBlockNextBlock || statements_elsedo?.length)
  //     ? trimmedStatements.replace(printBlockValue, `+"${printBlockValue}"+`)
  //     : trimmedStatements.replace(printBlockValue, `+"${printBlockValue}`);

  // TODO: Assemble JavaScript into code variable.
  var code = `${value_custom_if}${trimmedStatements}${renderElseStatementCode}`;
  return code;
};

javascriptGenerator['set_var'] = function (block) {
  var dropdown_name = block.getFieldValue('USER_DEFINED_VAR');
  var value_set_var = javascriptGenerator.valueToCode(
    block,
    'set_user_defined_val',
    javascriptGenerator.ORDER_ATOMIC
  );

  const goProCmd = `=${dropdown_name}${value_set_var};`;
  // TODO: Assemble JavaScript into code variable.
  // var code = '...;\n';
  return goProCmd;
};

javascriptGenerator['set_var_system'] = function (block) {
  var dropdown_name = block.getFieldValue('SYSTEM_DEFINED_VAR');
  var value_set_var = javascriptGenerator.valueToCode(
    block,
    'set_system_defined_val',
    javascriptGenerator.ORDER_ATOMIC
  );
  const goProCmd = `=${dropdown_name}${value_set_var};`;

  return goProCmd;
};

javascriptGenerator['user_defined_var_list'] = function (block) {
  var dropdown_name = block.getFieldValue('USER_DEFINED_VAR_LIST');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['number_input'] = function (block) {
  var number_name = block.getFieldValue('number_input');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_NONE];
};

javascriptGenerator['print'] = function (block) {
  var value_print = javascriptGenerator.valueToCode(
    block,
    'print',
    javascriptGenerator.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `"Value is $${value_print}";`;
  return code;
};

javascriptGenerator['special_math_op'] = function (block) {
  var dropdown_special_math_ops = block.getFieldValue('special_math_ops');
  var value_name = javascriptGenerator.valueToCode(
    block,
    'VAR_A',
    javascriptGenerator.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `${dropdown_special_math_ops}${value_name}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['basic_math_op'] = function (block) {
  var dropdown_math_op = block.getFieldValue('math_op');
  var value_var_b = javascriptGenerator.valueToCode(
    block,
    'VAR_B',
    javascriptGenerator.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `${dropdown_math_op}${value_var_b}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['system_defined_var_list'] = function (block) {
  var dropdown_name = block.getFieldValue('SYSTEM_DEFINED_VAR_LIST');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_name;
  // console.log(dropdown_name);
  // return dropdown_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['bp_gopro_start'] = function (block) {
  var code = `!S;`;
  return code;
};

javascriptGenerator['bp_gopro_end'] = function (block) {
  var code = `!E;`;
  return code;
};

javascriptGenerator['bp_gopro_upload'] = function (block) {
  var code = `!U;`;
  return code;
};
javascriptGenerator['bp_gopro_repeat'] = function (block) {
  var code = `!R;`;
  return code;
};

javascriptGenerator['controls_if'] = function (block) {
  // If/elseif/else condition.
  let n = 0;
  let code = '';
  let conditionCode = '';
  let branchCode = '';
  if (javascriptGenerator.STATEMENT_PREFIX) {
    // Automatic prefix insertion is switched off for this block.  Add manually.
    code += javascriptGenerator.injectId(
      javascriptGenerator.STATEMENT_PREFIX,
      block
    );
  }
  do {
    conditionCode =
      javascriptGenerator.valueToCode(
        block,
        'IF' + n,
        javascriptGenerator.ORDER_NONE
      ) || 'false';
    branchCode = javascriptGenerator.statementToCode(block, 'DO' + n);
    if (javascriptGenerator.STATEMENT_SUFFIX) {
      branchCode =
        javascriptGenerator.prefixLines(
          javascriptGenerator.injectId(
            javascriptGenerator.STATEMENT_SUFFIX,
            block
          ),
          javascriptGenerator.INDENT
        ) + branchCode;
    }
    code +=
      (n > 0 ? ' else ' : '') +
      'if (' +
      conditionCode +
      ') {\n' +
      branchCode +
      '}';

    n++;
  } while (block.getInput('IF' + n));

  if (block.getInput('ELSE') || javascriptGenerator.STATEMENT_SUFFIX) {
    let branchCode = javascriptGenerator.statementToCode(block, 'ELSE');
    if (javascriptGenerator.STATEMENT_SUFFIX) {
      branchCode =
        javascriptGenerator.prefixLines(
          javascriptGenerator.injectId(
            javascriptGenerator.STATEMENT_SUFFIX,
            block
          ),
          javascriptGenerator.INDENT
        ) + branchCode;
    }
    code += ' else {\n' + branchCode + '}';
  }
  const test = javascriptGenerator.prefixLines(
    javascriptGenerator.injectId(javascriptGenerator.STATEMENT_SUFFIX, block),
    javascriptGenerator.INDENT
  );
  console.log('test', test);
  console.log('branchcode: ', branchCode);
  const { variables, operators } = getOperatorsAndVariables(conditionCode);
  const isTime = variables[0]?.includes('time');
  const variableValue = variables[variables?.length - 1]?.trim();
  const operatorName = `${variables[0][0]}`;
  const { hour, minute } = getHourMinuteFromProp(+variableValue);
  const cmd = isTime
    ? `${hour}:${minute}`
    : `${operatorName === 'undefined' ? '' : operatorName}${
        variableValue || ''
      }`;
  const fullCmd = `${operators[0]}${cmd}${branchCode.trim()}`;
  console.log('full: ', fullCmd);
  const prev = localStorage.getItem('goProCmd') || '';
  localStorage.setItem('goProCmd', prev + fullCmd);
  // window.goProCmd = window.goProCmd + fullCmd;
  return fullCmd;
};

javascriptGenerator['time_picker'] = function (block) {
  var dropdown_comparison_op = block.getFieldValue('comparison_op');
  var dropdown_hour = block.getFieldValue('hour');
  var dropdown_min = block.getFieldValue('min');
  // TODO: Assemble JavaScript into code variable.
  var code = `${dropdown_comparison_op}${dropdown_hour}:${dropdown_min}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['bp_tile_setamount'] = function (block) {
  var value_tile =
    javascriptGenerator.valueToCode(
      block,
      'TILE',
      javascriptGenerator.ORDER_NONE
    ) || 'null';
  var value_amount =
    javascriptGenerator.valueToCode(
      block,
      'AMOUNT',
      javascriptGenerator.ORDER_NONE
    ) || '0';
  var code = `setAmount(${value_tile}, ${value_amount});\n`;
  return code;
};

javascriptGenerator['bp_tile_getamount'] = function (block) {
  var value_tile =
    javascriptGenerator.valueToCode(
      block,
      'TILE',
      javascriptGenerator.ORDER_NONE
    ) || 'null';
  var code = `getAmount(${value_tile})`;
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};

javascriptGenerator['bp_tile_pick'] = function (block) {
  var dropdown_tile = block.getFieldValue('TILE');
  // TODO: Assemble javascriptGenerator into code variable.
  var code = `!${dropdown_tile.replace(/:/g, '')}S`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};

javascriptGenerator['bp_tile_pick_quickly'] = function (block) {
  var dropdown_tile = block.getFieldValue('TILE');
  // TODO: Assemble javascriptGenerator into code variable.
  var code = `!${dropdown_tile.replace(/:/g, '')}SQ`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};

javascriptGenerator['started_at'] = function (block) {
  var dropdown_hour = block.getFieldValue('hour');
  var dropdown_min = block.getFieldValue('min');
  // TODO: Assemble JavaScript into code variable.
  var code = `!${dropdown_hour}:${dropdown_min}S;`;
  return code;
};

javascriptGenerator['started_at_quickly'] = function (block) {
  var dropdown_hour = block.getFieldValue('hour');
  var dropdown_min = block.getFieldValue('min');
  // TODO: Assemble JavaScript into code variable.
  var code = `!${dropdown_hour}:${dropdown_min}SQ;`;
  return code;
};
