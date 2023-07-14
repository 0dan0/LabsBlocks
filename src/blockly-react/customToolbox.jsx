import React from 'react';
import './customBlocks';
import Blockly from 'blockly/core';
import { Block, Category, Value, Field, Sep } from './blocks';

export const customTools = (
  <> 
    <Category name="Settings" colour="100">
      <Block type="mode" />
      <Block type="res" />
      <Block type="fps" />
      <Block type="lens" />
      <Block type="EIS" />
      <Block type="qr_command" />
    </Category>
    <Category name="Actions" colour="180">
      <Block type="pause_until" />
      <Block type="pause_quickly" />
      <Block type="pause_seconds" />
      <Block type="bp_gopro_start" />
      <Block type="bp_gopro_end" />
      <Block type="bp_gopro_wifi" />
      <Block type="bp_gopro_livestream" />
      <Block type="bp_gopro_upload" />
      <Block type="bp_gopro_repeat" />
      <Block type="bp_gopro_exit" />
      <Block type="bp_gopro_shutdown" />
      <Block type="bp_gopro_reboot" />
      <Block type="bp_gopro_twmode" />
      <Block type="bp_gopro_waitDOP" />
      <Block type="bp_gopro_buttons" />
      <Block type="bp_gopro_beeps" />
    </Category>
    <Category name="Variables" colour="350">
        <Block type="set_var" />
        <Block type="user_defined_var_list" />
		<Block type="number_input" />
		<Block type="basic_math_op" />
    </Category>	
    <Category name="Sensors" colour="50">
        <Block type="system_defined_var_list" />
        <Block type="system_status_list" />
        <Block type="gps_list" />
    </Category>
  </>
);
