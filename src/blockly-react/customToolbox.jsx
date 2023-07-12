import React from 'react';
import './customBlocks';
import Blockly from 'blockly/core';
import { Block, Category, Value, Field, Sep } from './blocks';

export const customTools = (
  <>
    <Category name="Actions" colour="190">
      <Block type="pause_until" />
      <Block type="pause_quickly" />
      <Block type="pause_seconds" />
      <Block type="bp_gopro_start" />
      <Block type="bp_gopro_end" />
      <Block type="bp_gopro_wifi" />
      <Block type="bp_gopro_upload" />
      <Block type="bp_gopro_repeat" />
      <Block type="bp_gopro_exit" />
      <Block type="bp_gopro_shutdown" />
      <Block type="bp_gopro_reboot" />
    </Category>
    <Category name="Variables" colour="350">
        <Block type="set_var" />
        <Block type="user_defined_var_list" />
		<Block type="math_number">
			<Field name="NUM">0</Field>
		</Block>
		<Block type="basic_math_op" />
    </Category>	
    <Category name="Sensors" colour="50">
        <Block type="system_defined_var_list" />
        <Block type="system_status_list" />
        <Block type="gps_list" />
    </Category>
  </>
);
