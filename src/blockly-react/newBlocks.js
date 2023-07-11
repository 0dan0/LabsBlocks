Blockly.Blocks['customzied_if'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('if')
      .appendField(
        new Blockly.FieldDropdown([
          ['acceleration', 'ACCELEATATION'],
          ['gyro', 'GYRO'],
          ['iso value', 'ISO_VALUE'],
        ]),
        'SYSTEM_DEFINED_VAR'
      )
      .appendField(
        new Blockly.FieldDropdown([
          ['>=', 'GREATER_THAN'],
          ['<', 'LESS_THAN'],
          ['=', 'EQUAL_TO'],
        ]),
        'COMPARISON'
      )
      .appendField(new Blockly.FieldNumber(0, 0), 'ASSIGNED_VAL');
    this.appendStatementInput('IFDO').setCheck(null).appendField('do');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['customzied_if'] = function (block) {
  var dropdown_system_defined_var = block.getFieldValue('SYSTEM_DEFINED_VAR');
  var dropdown_comparison = block.getFieldValue('COMPARISON');
  var number_assigned_val = block.getFieldValue('ASSIGNED_VAL');
  var statements_ifdo = Blockly.JavaScript.statementToCode(block, 'IFDO');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.Blocks['value_assign'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
        ]),
        'USER_DEFINED_VAR'
      )
      .appendField('=')
      .appendField(
        new Blockly.FieldDropdown([
          ['acceleration', 'ACCELERATION'],
          ['gyro', 'GYRO'],
          ['iso value', 'ISO_VALUE'],
        ]),
        'SYSTEM_DEFINED_VAR'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['value_assign'] = function (block) {
  var dropdown_user_defined_var = block.getFieldValue('USER_DEFINED_VAR');
  var dropdown_system_defined_var = block.getFieldValue('SYSTEM_DEFINED_VAR');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.Blocks['value_assing_2'] = {
  init: function () {
    this.appendDummyInput()
      .appendField(
        new Blockly.FieldDropdown([
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
        ]),
        'USER_DEFEINED_VAR'
      )
      .appendField(new Blockly.FieldLabelSerializable('='), 'EQUAL_OP')
      .appendField(new Blockly.FieldNumber(0), 'DEFINED_VAL');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['value_assing_2'] = function (block) {
  var dropdown_user_defeined_var = block.getFieldValue('USER_DEFEINED_VAR');
  var number_defined_val = block.getFieldValue('DEFINED_VAL');
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.Blocks['set_var'] = {
  init: function () {
    this.appendValueInput('NAME')
      .setCheck(null)
      .appendField('Variable')
      .appendField(
        new Blockly.FieldDropdown([
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
        ]),
        'NAME'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(135);
    this.setTooltip('');
  },
};

Blockly.JavaScript['set_var'] = function (block) {
  var dropdown_name = block.getFieldValue('NAME');
  var value_name = Blockly.JavaScript.valueToCode(
    block,
    'NAME',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};

Blockly.Blocks['user_defined_var_list'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['A', 'A'],
        ['B', 'B'],
        ['C', 'C'],
      ]),
      'USER_DEFINED_VAR_LIST'
    );
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['user_defined_var_list'] = function (block) {
  var dropdown_name = block.getFieldValue('USER_DEFINED_VAR_LIST');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['system_var_list'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['A', 'A'],
        ['B', 'B'],
        ['C', 'C'],
      ]),
      'SYSTEM_VAR_LIST'
    );
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['system_var_list'] = function (block) {
  var dropdown_name = block.getFieldValue('SYSTEM_VAR_LIST');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['basic_math_op'] = {
  init: function () {
    this.appendValueInput('VAR_A').setCheck('Number');
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['+', 'ADDITION'],
        ['-', 'SUBSTRUCTION'],
        ['*', 'MULTIPLICATION'],
        ['/', 'DIVISION'],
      ]),
      'math_op'
    );
    this.appendValueInput('VAR_B').setCheck('Number');
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['basic_math_op'] = function (block) {
  var value_var_a = Blockly.JavaScript.valueToCode(
    block,
    'VAR_A',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var dropdown_math_op = block.getFieldValue('math_op');
  var value_var_b = Blockly.JavaScript.valueToCode(
    block,
    'VAR_B',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['number_input'] = {
  init: function () {
    this.appendDummyInput().appendField(new Blockly.FieldNumber(0), 'NAME');
    this.setOutput(true, 'Number');
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.JavaScript['number_input'] = function (block) {
  var number_name = block.getFieldValue('NAME');
  // TODO: Assemble JavaScript into code variable.
  var code = '...';
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_NONE];
};


//Blockly.Blocks['set_var'] = {
//  init: function () {
//    this.appendValueInput('set_var')
//      .setCheck(null)
//      .appendField('set the value of')
//      .appendField(
//        new Blockly.FieldDropdown([
//          ['A', 'A'],
//          ['B', 'B'],
//          ['C', 'C'],
//        ]),
//        'NAME'
//      );
//    this.setPreviousStatement(true, null);
//    this.setNextStatement(true, null);
//    this.setColour(135);
//    this.setTooltip('');
//    this.setHelpUrl('');
//  },
//};

Blockly.JavaScript['set_var'] = function (block) {
  var dropdown_name = block.getFieldValue('NAME');
  var value_set_var = Blockly.JavaScript.valueToCode(
    block,
    'set_var',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = '...;\n';
  return code;
};
