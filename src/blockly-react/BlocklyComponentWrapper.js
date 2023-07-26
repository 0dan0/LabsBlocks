import React, { useContext, useEffect } from 'react';
import { BlocklyComponent, OnUpdated } from './blockly';
import Blockly from 'blockly/core';
import { BlocklyContext } from '../context/BlocklyContextProvider';

const BlocklyComponentWrapper = () => {
  const blocklyContext = useContext(BlocklyContext);
  const {
    blocksList,
    workspace,
    setWorkSpace,
    setIsSaveBtnEnable,
    setBlockTitle,
    setSelectedBlock,
  } = blocklyContext || {};
  const url = new URL(window?.location?.href);
  const id = url.searchParams.get('id');

  useEffect(() => {
    if (id && blocksList?.length && workspace) {
      const targetItem = blocksList?.find((block) => block?.id === id);
      workspace.clear();
      const xml = Blockly.Xml.textToDom(targetItem?.block);
      Blockly.Xml.domToWorkspace(xml, workspace);
      setIsSaveBtnEnable(true);
      setBlockTitle(targetItem?.name);
      setSelectedBlock(targetItem);
    }
  }, [id, blocksList, workspace]);
  return (
    <BlocklyComponent style={{ height: '94vh' }}>
      <OnUpdated
        onMounted={(ws) => {
          try {
            setWorkSpace(ws);
          } catch (e) {
            console.log(e);
          }
        }}
        onUpdated={(e, ws) => {
          if (!e.recordUndo) return;
          setWorkSpace(ws);
          setIsSaveBtnEnable(ws.getAllBlocks(false).length > 0);
        }}
      />
    </BlocklyComponent>
  );
};

export default BlocklyComponentWrapper;
