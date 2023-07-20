import React, { useContext, useState } from 'react';
import { BlocklyContext } from '../context/BlocklyContextProvider';
import Modal from 'react-responsive-modal';
import Blockly, { Workspace, WorkspaceSvg } from 'blockly/core';

const BlockList = ({ onCloseHistoryModal }) => {
  const [openDeleteConfirmationModal, setOpenDeleteConfirmationModal] =
    useState(false);
  const blocklyContext = useContext(BlocklyContext);
  const {
    blocksList,
    blockTitle,
    selectedBlock,
    workspace,
    setSelectedBlock,
    setBlocksList,
    setBlockTitle,
    setWorkSpace,
    setChanges,
    setIsSaveBtnEnable,
  } = blocklyContext || {};
  const url = new URL(window?.location?.href);
  const id = url.searchParams.get('id');

  const handleSelectBlocklyListItem = (block) => {
    window.history.replaceState(null, null, `?id=${block.id}`);
    workspace.clear();
    const xml = Blockly.Xml.textToDom(block.block);
    Blockly.Xml.domToWorkspace(xml, workspace);
    setSelectedBlock(block);
    setBlockTitle(block?.name);
    onCloseHistoryModal();
  };

  const handleDeleteBlock = (block) => {
    setSelectedBlock(block);
    setOpenDeleteConfirmationModal(true);
  };

  const handleDeclineDelete = () => setOpenDeleteConfirmationModal(false);

  const handleTriggerDeleteItem = () => {
    const clonedBlocks = [...blocksList];
    const targetItemIndex = clonedBlocks.findIndex(
      (cb) => cb?.id === selectedBlock?.id
    );
    clonedBlocks.splice(targetItemIndex, 1);
    localStorage.setItem('blocks', JSON.stringify(clonedBlocks));
    setBlocksList(clonedBlocks);
    if (id === selectedBlock?.id || selectedBlock) {
      setSelectedBlock(null);
      setBlockTitle('New Project');
      setChanges('');
      setIsSaveBtnEnable(false);
      workspace.clear();
      window.history.replaceState({}, document.title, '/');
    }
    setWorkSpace(workspace);
    setOpenDeleteConfirmationModal(false);
  };

  const renderBlockList = () =>
    blocksList?.length ? (
      blocksList?.map((block) => (
        <div className='listItem' key={block.id}>
          <span style={{ fontSize: '18px', fontWeight: '600' }}>
            {block.name}
          </span>
          <div className='listItemActionButtonWrapper'>
            <button
              className='listItemActionButton'
              onClick={() => handleSelectBlocklyListItem(block)}
            >
              Edit
            </button>
            <button
              className='listItemActionButton'
              onClick={() => handleDeleteBlock(block)}
            >
              Delete
            </button>
          </div>
        </div>
      ))
    ) : (
      <div
        className='qrGeneratorWrapper'
        style={{ fontSize: '25px', fontWeight: '600' }}
      >
        No blocks found!
      </div>
    );
  return (
    <div className='listWrapper'>
      {renderBlockList()}
      <Modal
        open={openDeleteConfirmationModal}
        onClose={handleDeclineDelete}
        center
        classNames={{
          modal: 'customModal confirmation',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '30px',
          }}
        >
          <p style={{ fontSize: '20px' }}>
            Do you want to delete {selectedBlock?.name}?
          </p>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              margin: '10px 0px',
              columnGap: '16px',
            }}
          >
            <button
              className='actionButton delete'
              onClick={handleTriggerDeleteItem}
            >
              Yes
            </button>
            <button
              className='actionButton saveButton'
              onClick={handleDeclineDelete}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlockList;
