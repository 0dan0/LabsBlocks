import React from 'react';
import { Block, Category, Value, Field, Shadow, Sep, Mutation } from './blocks';
import Blockly, { Workspace } from 'blockly/core';
import 'blockly/blocks';
import locale from 'blockly/msg/en';
Blockly.setLocale(locale);
import './officialMsg';

export const Xml = React.forwardRef(function(props, ref) {
  return (
    <xml
      ref={ref}
      is="blockly"
      xmlns="https://developers.google.com/blockly/xml"
      style={{ display: 'none' }}
    >
      {props.children}
    </xml>
  );
});

export const officialToolbox = (
  <React.Fragment>
    <Category name="%{BKY_CATLOGIC}" colour="%{BKY_LOGIC_HUE}">
      <Block type="customized_if_else" />
      <Block type="loop" />
      <Block type="goto_loop" />
      <Block type="loop2" />
      <Block type="goto_loop2" />
    </Category>
    <Category name="Comparisons" colour="300">
      <Block type="customized_logic_compare" />
      <Block type="time_picker" />
    </Category>
    <Category name="%{BKY_CATTEXT}" colour="%{BKY_TEXTS_HUE}">
      <Block type="print" />
      <Block type="text_print" />
    </Category>
  </React.Fragment>
);
