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

Blockly.Blocks['customized_if'] = {
  init: function () {
    this.appendValueInput('CUSTOM_IF')
      .setCheck(BLOCKLY_DEFAULT_TYPE.BOOLEAN)
      .appendField('if');
    this.appendStatementInput('IFDO').setCheck(null).appendField('then');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip('Classic IF-THEN branch. Requires a Comparison block for conditions of time, camera status or variable');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['customized_if_else'] = {
  init: function () {
    this.appendDummyInput().appendField('Only use on the inner-most of nested ifs');
    this.appendValueInput('CUSTOM_IF')
      .setCheck(BLOCKLY_DEFAULT_TYPE.BOOLEAN)
      .appendField('if');
    this.appendStatementInput('IFDO').setCheck(null).appendField('then');
     this.appendStatementInput('ELSEDO')
       .setCheck(null)
       .setAlign(Blockly.ALIGN_RIGHT)
       .appendField('else');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(200);
    this.setTooltip('Custom IF-THEN-ELSE branching. Can do only be used as the inner most condition if nested: e.g. IF(IF(IF-THEN-ELSE)))\n Also requires a Comparison block for conditions of time, camera status or variable');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['boot_command'] = {
  init: function () {
    this.appendStatementInput('boot_cmd').setCheck(null).appendField('boot with:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(210);
    this.setTooltip('Wrap this around you complete (and tested) script, to turn it into a boot command');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['loop'] = {
  init: function () {
    this.appendDummyInput().appendField('loop:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(220);
    this.setTooltip('This a marker for you can jump to using the matching goto loop: command');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['goto_loop'] = {
  init: function () {
    this.appendDummyInput().appendField('goto loop');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(220);
    this.setTooltip('Jump to goto loop:');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['loop2'] = {
  init: function () {
    this.appendDummyInput().appendField('loop2:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
    this.setTooltip('This a marker for you can jump to using the matching goto loop2: command');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['goto_loop2'] = {
  init: function () {
    this.appendDummyInput().appendField('goto loop2');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(230);
    this.setTooltip('Jump to goto loop2:');
    this.setHelpUrl('');
  },
};



Blockly.Blocks['loop3'] = {
  init: function () {
    this.appendDummyInput().appendField('loop3:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(240);
    this.setTooltip('This a marker for you can jump to using the matching goto loop3: command');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['goto_loop3'] = {
  init: function () {
    this.appendDummyInput().appendField('goto loop3');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(240);
    this.setTooltip('Jump to goto loop3:');
    this.setHelpUrl('');
  },
};



Blockly.Blocks['loop4'] = {
  init: function () {
    this.appendDummyInput().appendField('loop4:');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(250);
    this.setTooltip('This a marker for you can jump to using the matching goto loop4: command');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['goto_loop4'] = {
  init: function () {
    this.appendDummyInput().appendField('goto loop4');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(250);
    this.setTooltip('Jump to goto loop4:');
    this.setHelpUrl('');
  },
};



Blockly.Blocks['bp_gopro_start'] = {
  init: function () {
    this.appendDummyInput().appendField('Start capture');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_end'] = {
  init: function () {
    this.appendDummyInput().appendField('End capture');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_wifi'] = {
  init: function () {
    this.appendDummyInput().appendField('WiFi join network');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_clear'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['Clear SD up to 8GB', '!C8'],
			['Clear SD up to 16GB', '!C16'],
			['Clear SD up to 32GB', '!C32'],
			['Clear SD up to 64GB', '!C64'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_livestream'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['Go Live at 1080p', '!GL'],
			['Go Live at 720p',  '!GM'],
			['Go Live at 480p',  '!GS'],
			['Go Live at 1080p + Capture', '!GLC'],
			['Go Live at 720p + Capture',  '!GMC'],
			['Go Live at 480p + Capture',  '!GSC'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['bp_gopro_upload'] = {
  init: function () {
    this.appendDummyInput().appendField('Upload to cloud');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_repeat'] = {
  init: function () {
    this.appendDummyInput().appendField('Repeat everything');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_exit'] = {
  init: function () {
    this.appendDummyInput().appendField('Exit Program');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_shutdown'] = {
  init: function () {
    this.appendDummyInput().appendField('Shutdown camera');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_reboot'] = {
  init: function () {
    this.appendDummyInput().appendField('Reboot camera');
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_twmode'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['TimeWarp Mode Normal','!TN'],
			['TimeWarp Mode Realtime','!TR'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['bp_gopro_waitDOP'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['Wait GPS lock okay','!D'],
			['Wait GPS lock good','!D12'],
			['Wait GPS lock precise','!D6'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['bp_gopro_buttons'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['Buttons disable both','!Z3'],
			['Buttons disable shutter only','!Z1'],
			['Buttons disable mode only','!Z2'],
			['Buttons enable both','!Z0']
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['bp_gopro_beeps'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['Feedback Blink once','!B'],
			['Feedback Beep once','!B0'],
			['Feedback Blink+Beep once','!B1'],
			['Feedback Blink+Beep twice','!B2']
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};





Blockly.Blocks['mode'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['mode Video Standard','mV0'],
			['mode Video Activity','mV1'],
			['mode Video Cinematic','mV2'],
			['mode Video Full Frame','mV3'],
			['mode Video Slomo','mV4'],
			['mode Timelaspe','mT'],
			['mode TimeWarp','mTW'],
			['mode Photo','mP'],
			['mode Photo Burst','mPB'],
			['mode Night Photo','mPN'],
			['mode Timelaspe Photo','mTP'],
			['mode Nightlaspe Photo','mNP'],
			['mode Nightlaspe Video','mNL'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['res'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['res 1080p','r1'],
			['res 2.7k','r27'],
			['res 2.7k 4:3', 'r27T'],
			['res 4K', 'r4T'],
			['res 4K 4:3', 'r4T'],
			['res 4K 8:7', 'r4X'],
			['res 5.3K', 'r5'],
			['res 5.3K 4:3', 'r5T'],
			['res 5.3K 8:7', 'r5X'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['fps'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['fps 24','p24'],
			['fps 25','p25'],
			['fps 30','p30'],
			['fps 50','p50'],
			['fps 60','p60'],
			['fps 100','[p100'],
			['fps 120','[p120'],
			['fps 200','[p200'],
			['fps 240','[p240'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['lens'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['lens Wide','fW'],
			['lens Linear','fL'],
			['lens Linear+HL','fH'],
			['lens Superview','fS'],
			['lens Hyperview','fV'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['EIS'] = {
  init: function () {
    this.appendDummyInput().appendField(
		  new Blockly.FieldDropdown([
			['EIS Off','e0'],
			['EIS On','e1'],
			['EIS Boost','e3'],
			['EIS AutoBoost','e4'],
		  ]),
		'props'
	  );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['qr_command'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('added QR command')
      .appendField(new Blockly.FieldTextInput('\"your command\"'), 'TEXT_PRINT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(100);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};



Blockly.Blocks['bp_tile_pick'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('🏷️ Sleep until')
      .appendField(new Blockly.FieldTextInput('A Tile'), 'TILE');
    this.setOutput(true, 'Tile');
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};
Blockly.Blocks['bp_tile_pick_quickly'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('🏷️ Sleep until')
      .appendField(new Blockly.FieldTextInput('A Tile'), 'TILE');
    this.setOutput(true, 'Tile');
    this.setColour(190);
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
      .appendField('Set variable')
      .appendField(
        new Blockly.FieldDropdown([
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
          ['D', 'D'],
          ['E', 'E'],
          ['F', 'F'],
          ['G', 'G'],
          ['H', 'H'],
          ['I', 'I'],
          ['J', 'J'],
          ['K', 'K'],
          ['L', 'L'],
          ['M', 'M'],
          ['N', 'N'],
          ['O', 'O'],
          ['P', 'P'],
          ['Q', 'Q'],
          ['R', 'R'],
          ['S', 'S'],
          ['T', 'T'],
          ['U', 'U'],
          ['V', 'V'],
          ['W', 'W'],
          ['X', 'X'],
          ['Y', 'Y'],
          ['Z', 'Z'],
        ]),
        'USER_DEFINED_VAR'
      );
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(350);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['system_defined_var_list'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['Sensor acceleration (g)', 'a'],
        ['Sensor gyro (dps)', 'g'],
        ['Sensor sound level (dB)', 'p'],
        ['Sensor motion (%)', 'm'],
        ['Sensor battery (%)', 'b'],
        ['Sensor iso value', 'i'],
        ['Sensor shutter speed', 's'],
		['Sensor random (0-99.99)', 'e'],
      ]),
      'SYSTEM_DEFINED_VAR_LIST'
    );
    this.setOutput(true, VARIABLE_LIST_TYPE.SYSTEM_DEFINED);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['system_status_list'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['Status recording (T:1, F:-1)', 'r'],
        ['Status USB power (T:1, F:-1)', 'u'],
        ['Status loop count', 'l'],
        ['Status Remote Connected (T:1, F:-1)', 'r:C'],
        ['Status App Connected (T:1, F:-1)', 'r:A'],
        ['Status mode press count', 'y'],
        ['Status shutter press count', 'z'],
      ]),
      'SYSTEM_STATUS_LIST'
    );
    this.setOutput(true, VARIABLE_LIST_TYPE.SYSTEM_DEFINED);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['system_time_list'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['Time year', 't:Y'],
        ['Time month', 't:M'],
        ['Time day', 't:D'],
        ['Time hour', 't:H'],
        ['Time minute', 't:N'],
        ['Time second', 't:S'],
        ['Time day of the week (Sun-0, thru 6)', 't:W'],
        ['Time seconds since boot', 't:B'],
        ['Time seconds since QR Code', 't:Q'],
        ['Time seconds since record start (Sept`23)', 't:R'],
      ]),
      'SYSTEM_TIME_LIST'
    );
    this.setOutput(true, VARIABLE_LIST_TYPE.SYSTEM_DEFINED);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['gps_list'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldDropdown([
        ['GPS speed (km/h)', 'k'],
        ['GPS DOP', 'd'],
        ['GPS distance (m)', 'c'],
        ['GPS height (m)', 'h'],
      ]),
      'GPS_LIST'
    );
    this.setOutput(true, VARIABLE_LIST_TYPE.SYSTEM_DEFINED);
    this.setColour(50);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['number_input'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('num')
      .appendField(new Blockly.FieldNumber(0, -9999999, 9999999, 0.0001), 'number');
    this.setOutput(true, BLOCKLY_DEFAULT_TYPE.NUMBER);
    this.setColour(350);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['basic_math_op'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('math')
	  .appendField(
      new Blockly.FieldDropdown([
        ['add', '+'],
        ['subract', '-'],
        ['multiple', '*'],
        ['divide', '/'],
        ['power', '^'],
        ['AND', '&'],
        ['OR', '|'],
        ['modulus', '%'],
        ['log', '#'],
      ]),
      'math_op'
    );
    this.appendValueInput('VAR_B').setCheck([
		BLOCKLY_DEFAULT_TYPE.NUMBER, 
		VARIABLE_LIST_TYPE.USER_DEFINED],);
    this.setInputsInline(true);
    this.setOutput(true, MATH_OPERATION_TYPE.ARITHMETIC);
    this.setColour(350);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};



Blockly.Blocks['customized_logic_compare'] = {
  init: function () {
	  
    this.appendDummyInput().appendField('variable/sensor');
    this.appendValueInput('VAR_A').setCheck([
      VARIABLE_LIST_TYPE.USER_DEFINED,
      VARIABLE_LIST_TYPE.SYSTEM_DEFINED,
    ]);
    this.appendDummyInput()
	  .appendField(
		  new Blockly.FieldDropdown([
			['>=', '>'],
			['<', '<'],
			['==', '=='],
		  ]),
		'compare_op'
	  );
    this.appendValueInput('VAR_B').setCheck([
      VARIABLE_LIST_TYPE.USER_DEFINED,
      BLOCKLY_DEFAULT_TYPE.NUMBER,
    ]);
    this.setInputsInline(true);
    this.setOutput(true, BLOCKLY_DEFAULT_TYPE.BOOLEAN);
    this.setColour(300);
    this.setTooltip('To be used with IF-THEN-(ELSE) branches, for comparing sensor or variable fields with a number or another variable. Requires two blocks from either Variables or Sensors');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['time_picker'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('current_time')
      .appendField(
        new Blockly.FieldDropdown([
          ['>=', '>'],
          ['<', '<'],
          ['==', '=='],
        ]),
        'comparison_op'
      )
      .appendField(new Blockly.FieldDropdown(hourGenerator()), 'hour')
      .appendField(':')
      .appendField(new Blockly.FieldDropdown(minuteGenerator()), 'min');
    this.setOutput(true, BLOCKLY_DEFAULT_TYPE.BOOLEAN);
    this.setColour(300);
    this.setTooltip("To be used with IF-THEN-(ELSE) branches, for comparing the camera's time with your inputs");
    this.setHelpUrl('');
  },
};

Blockly.Blocks['system_conditions'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('camera')
      .appendField(
        new Blockly.FieldDropdown([
          ['recording', '>r0'],
          ['not recording', '<r0'],
          ['USB powered', '>u0'],
          ['not USB powered', '<u0'], 
          ['Remote connected', '>r:C0'],
          ['not Remote connected', '<r:C0'],
          ['App connected', '>r:A0'],
          ['not App connected', '<r:A0'],
        ]),
        'system_conditions_op'
      )
    this.setOutput(true, BLOCKLY_DEFAULT_TYPE.BOOLEAN);
    this.setColour(300);
    this.setTooltip("To be used with IF-THEN-(ELSE) branches, for testing the camera status like recording or USB power.");
    this.setHelpUrl('');
  },
};


//Blockly.Blocks['set_var_system'] = {
//  init: function () {
//    this.appendValueInput('set_system_defined_val')
//      .setCheck(BLOCKLY_DEFAULT_TYPE.NUMBER)
//      .appendField('Set variable')
//      .appendField(
//        new Blockly.FieldDropdown([
//			['not used', 'a'],
//        ]),
//        'SYSTEM_DEFINED_VAR'
//      );
//    this.setPreviousStatement(true, null);
//    this.setNextStatement(true, null);
//    this.setColour(135);
//    this.setTooltip('');
//    this.setHelpUrl('');
//  },
//};

Blockly.Blocks['user_defined_var_list'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('var')
	  .appendField(
      new Blockly.FieldDropdown([
        ['A', 'A'],
        ['B', 'B'],
        ['C', 'C'],
        ['D', 'D'],
        ['E', 'E'],
        ['F', 'F'],
        ['G', 'G'],
        ['H', 'H'],
        ['I', 'I'],
        ['J', 'J'],
        ['K', 'K'],
        ['L', 'L'],
        ['M', 'M'],
        ['N', 'N'],
        ['O', 'O'],
        ['P', 'P'],
        ['Q', 'Q'],
        ['R', 'R'],
        ['S', 'S'],
        ['T', 'T'],
        ['U', 'U'],
        ['V', 'V'],
        ['W', 'W'],
        ['X', 'X'],
        ['Y', 'Y'],
        ['Z', 'Z'],
      ]),
      'USER_DEFINED_VAR_LIST'
    );
    this.setOutput(true, VARIABLE_LIST_TYPE.USER_DEFINED);
    this.setColour(350);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['pause_until'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Sleep and wait until')
      .appendField(new Blockly.FieldDropdown(hourGenerator()), 'hour')
      .appendField(':')
      .appendField(new Blockly.FieldDropdown(minuteGenerator()), 'min');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['pause_quickly'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Sleep approx. until')
      .appendField(new Blockly.FieldDropdown(hourGenerator()), 'hour')
      .appendField(':')
      .appendField(new Blockly.FieldDropdown(minuteGenerator()), 'min');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['pause_seconds'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Sleep')
      .appendField(new Blockly.FieldNumber(1, 1, 86400, 1), 'seconds')
      .appendField('seconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['pause_quick_seconds'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Sleep')
      .appendField(new Blockly.FieldNumber(1, 1, 86400, 1), 'seconds')
      .appendField('approx. seconds');	  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['pause_var_seconds'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Sleep var:')
      .appendField(
        new Blockly.FieldDropdown([
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
          ['D', 'D'],
          ['E', 'E'],
          ['F', 'F'],
          ['G', 'G'],
          ['H', 'H'],
          ['I', 'I'],
          ['J', 'J'],
          ['K', 'K'],
          ['L', 'L'],
          ['M', 'M'],
          ['N', 'N'],
          ['O', 'O'],
          ['P', 'P'],
          ['Q', 'Q'],
          ['R', 'R'],
          ['S', 'S'],
          ['T', 'T'],
          ['U', 'U'],
          ['V', 'V'],
          ['W', 'W'],
          ['X', 'X'],
          ['Y', 'Y'],
          ['Z', 'Z'],
        ]),
        'USER_DEFINED_VAR'
      )
      .appendField('seconds');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};


Blockly.Blocks['pause_var_quick_seconds'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('Sleep var:')	  
      .appendField(
        new Blockly.FieldDropdown([
          ['A', 'A'],
          ['B', 'B'],
          ['C', 'C'],
          ['D', 'D'],
          ['E', 'E'],
          ['F', 'F'],
          ['G', 'G'],
          ['H', 'H'],
          ['I', 'I'],
          ['J', 'J'],
          ['K', 'K'],
          ['L', 'L'],
          ['M', 'M'],
          ['N', 'N'],
          ['O', 'O'],
          ['P', 'P'],
          ['Q', 'Q'],
          ['R', 'R'],
          ['S', 'S'],
          ['T', 'T'],
          ['U', 'U'],
          ['V', 'V'],
          ['W', 'W'],
          ['X', 'X'],
          ['Y', 'Y'],
          ['Z', 'Z'],
        ]),
        'USER_DEFINED_VAR'
      )
      .appendField('approx. seconds');  
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(190);
    this.setTooltip('');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['comment_text'] = {
  init: function () {
    this.appendDummyInput()
      .appendField('comment')
      .appendField(new Blockly.FieldTextInput(' '), 'COMMENT_TEXT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('code documentation');
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
    this.setColour(150);
    this.setTooltip('display on camera any text message');
    this.setHelpUrl('');
  },
};

Blockly.Blocks['print_var'] = {
  init: function () {
    this.appendDummyInput().appendField('print variable/sensor');
    this.appendValueInput('print')
      .setCheck([BLOCKLY_DEFAULT_TYPE.STRING, VARIABLE_LIST_TYPE.USER_DEFINED, VARIABLE_LIST_TYPE.SYSTEM_DEFINED])
	  .appendField(new Blockly.FieldTextInput('value'), 'TEXT_PRINT')
    this.appendDummyInput().appendField(new Blockly.FieldTextInput(' units'), 'UNITS_PRINT');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(150);
    this.setTooltip('display on camera the variable or sensor value');
    this.setHelpUrl('');
  },
};


javascriptGenerator['boot_command'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  
  var statements_cmd = javascriptGenerator.statementToCode(block, 'boot_cmd');
  let trimmedStatements = statements_cmd?.trim().replace(/;/g, '');
  
  var code = `!MBOOT="!Lbt"!SAVEbt=${trimmedStatements}`;
  return code;
};

javascriptGenerator['loop'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '{';
  return code;
};

javascriptGenerator['goto_loop'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '{';
  return code;
};


javascriptGenerator['loop2'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '[';
  return code;
};

javascriptGenerator['goto_loop2'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '[';
  return code;
};



javascriptGenerator['loop3'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '}';
  return code;
};

javascriptGenerator['goto_loop3'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = '}';
  return code;
};



javascriptGenerator['loop4'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = ']';
  return code;
};

javascriptGenerator['goto_loop4'] = function (block) {
  // TODO: Assemble JavaScript into code variable.
  var code = ']';
  return code;
};


javascriptGenerator['comment_text'] = function (block) {
  var text_print_val = block.getFieldValue('COMMENT_TEXT');
  var code = '';
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
  var dropdown_compare_op = block.getFieldValue('compare_op');
  var value_var_b = javascriptGenerator.valueToCode(
    block,
    'VAR_B',
    javascriptGenerator.ORDER_ATOMIC
  );
  // TODO: Assemble JavaScript into code variable.
  var code = `${dropdown_compare_op}${value_var_a}${value_var_b}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};


javascriptGenerator['customized_if'] = function (block) {
  var value_custom_if = javascriptGenerator.valueToCode(
    block,
    'CUSTOM_IF',
    javascriptGenerator.ORDER_ATOMIC
  );
  var statements_ifdo = javascriptGenerator.statementToCode(block, 'IFDO');
  let trimmedStatements = statements_ifdo?.trim().replace(/;/g, '+');
  const trimmedStatementsLength = trimmedStatements?.length;
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

  // TODO: Assemble JavaScript into code variable.
  var code = `${value_custom_if}${trimmedStatements}`;
  return code;
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
  var num = block.getFieldValue('number');
  // TODO: Assemble JavaScript into code variable.
  var code = `${num}`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};

javascriptGenerator['print_var'] = function (block) {
  var value_print = javascriptGenerator.valueToCode(
    block,
    'print',
    javascriptGenerator.ORDER_ATOMIC
  );
  
  var text_print_val = block.getFieldValue('TEXT_PRINT');
  var units_print_val = block.getFieldValue('UNITS_PRINT');
  
  // TODO: Assemble JavaScript into code variable.
  var code = `"${text_print_val} $${value_print}${units_print_val}";`;
  return code;
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

javascriptGenerator['gps_list'] = function (block) {
  var dropdown_name = block.getFieldValue('GPS_LIST');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_name;
  // console.log(dropdown_name);
  // return dropdown_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};


javascriptGenerator['system_status_list'] = function (block) {
  var dropdown_name = block.getFieldValue('SYSTEM_STATUS_LIST');
  // TODO: Assemble JavaScript into code variable.
  var code = dropdown_name;
  // console.log(dropdown_name);
  // return dropdown_name;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_ATOMIC];
};


javascriptGenerator['system_time_list'] = function (block) {
  var dropdown_name = block.getFieldValue('SYSTEM_TIME_LIST');
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

javascriptGenerator['bp_gopro_wifi'] = function (block) {
  var code = `!W;`;
  return code;
};


javascriptGenerator['bp_gopro_clear'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['bp_gopro_livestream'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['bp_gopro_twmode'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['bp_gopro_waitDOP'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['bp_gopro_buttons'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['bp_gopro_beeps'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
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

javascriptGenerator['bp_gopro_exit'] = function (block) {
  var code = `!X;`;
  return code;
};

javascriptGenerator['bp_gopro_shutdown'] = function (block) {
  var code = `!1O;`;
  return code;
};

javascriptGenerator['bp_gopro_reboot'] = function (block) {
  var code = `!1OR;`;
  return code;
};


//settings


javascriptGenerator['mode'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['res'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['fps'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['lens'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['EIS'] = function (block) {
  var props = block.getFieldValue('props');
  var code = `${props};`;
  return code;
};

javascriptGenerator['qr_command'] = function (block) {
  var text_print_val = block.getFieldValue('TEXT_PRINT');
  return `${text_print_val};`;
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


javascriptGenerator['system_conditions'] = function (block) {
  var system_conditions_op = block.getFieldValue('system_conditions_op');
  // TODO: Assemble JavaScript into code variable.
  var code = `${system_conditions_op}`;
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
  var code = `!${dropdown_tile.replace(/:/g, '')}N`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};

javascriptGenerator['bp_tile_pick_quickly'] = function (block) {
  var dropdown_tile = block.getFieldValue('TILE');
  // TODO: Assemble javascriptGenerator into code variable.
  var code = `!${dropdown_tile.replace(/:/g, '')}NQ`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, javascriptGenerator.ORDER_FUNCTION_CALL];
};

javascriptGenerator['pause_until'] = function (block) {
  var dropdown_hour = block.getFieldValue('hour');
  var dropdown_min = block.getFieldValue('min');
  // TODO: Assemble JavaScript into code variable.
  var code = `!${dropdown_hour}:${dropdown_min}N;`;
  return code;
};

javascriptGenerator['pause_quickly'] = function (block) {
  var dropdown_hour = block.getFieldValue('hour');
  var dropdown_min = block.getFieldValue('min');
  // TODO: Assemble JavaScript into code variable.
  var code = `!${dropdown_hour}:${dropdown_min}NQ;`;
  return code;
};


javascriptGenerator['pause_seconds'] = function (block) {
  var seconds = block.getFieldValue('seconds');
  var code = `!${seconds}N;`;
  return code;
};

javascriptGenerator['pause_quick_seconds'] = function (block) {
  var seconds = block.getFieldValue('seconds');
  var code = `!${seconds}NQ;`;
  return code;
};


javascriptGenerator['pause_var_seconds'] = function (block) { 
  var varLetter = block.getFieldValue('USER_DEFINED_VAR');
  var code = `!$${varLetter}N;`;
  return code;
};

javascriptGenerator['pause_var_quick_seconds'] = function (block) {
  var varLetter = block.getFieldValue('USER_DEFINED_VAR');
  var code = `!$${varLetter}NQ;`;
  return code;
};
