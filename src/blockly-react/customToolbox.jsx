import React from 'react';
import './customBlocks';
import Blockly from 'blockly/core';
import { Block, Category, Value, Field, Sep } from './blocks';

export const customTools = (
  <>
    <Category name="Actions" colour="230">
      <Block type="started_at" />
      <Block type="started_at_quickly" />
      <Block type="bp_gopro_start" />
      <Block type="bp_gopro_end" />
      <Block type="bp_gopro_upload" />
      <Block type="bp_gopro_repeat" />
    </Category>
    <Category name="Variables" colour="350">
        <Block type="system_defined_var_list" />
        <Block type="system_status_list" />
        <Block type="gps_list" />
        <Block type="set_var" />
        <Block type="user_defined_var_list" />
		<Block type="math_number">
			<Field name="NUM">0</Field>
		</Block>
		<Block type="basic_math_op" />
    </Category>
  </>
);
