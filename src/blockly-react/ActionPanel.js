import React, { useContext, useRef, useState } from 'react';
import { javascriptGenerator } from 'blockly/javascript';
import { QRCodeCanvas } from '@cheprasov/qrcode';
import Blockly from 'blockly/core';
import { BlocklyContext } from '../context/BlocklyContextProvider';
import { generateUUID } from '../utils/generateUUID';
import Modal from 'react-responsive-modal';
import BlockList from './BlockList';
import { generateGoProCmd } from '../utils/generateGoProCmd';
import { readMetadata, writeMetadata } from '../utils/pngMetadata';
import { convertBase64ToUnit8Array } from '../utils/imageUtils';
import { toast } from 'react-toastify';
import * as htmlToImage from 'html-to-image';
var Buffer = require('buffer').Buffer;

const ActionPanel = () => {
  const fileUploadRef = useRef(null);
  const targetHtmlRef = useRef(null);
  const blocklyContext = useContext(BlocklyContext);
  const {
    blocksList,
    blockTitle,
    selectedBlock,
    openModal,
    openHistoryModal,
    workspace,
    changes,
    isSaveBtnEnable,
    setIsSaveBtnEnable,
    setChanges,
    setOpenModal,
    setOpenHistoryModal,
    setWorkSpace,
    setSelectedBlock,
    setBlocksList,
    setBlockTitle,
  } = blocklyContext || {};
  const [cmd, setCmd] = useState('');
  const onOpenModal = () => {
    const clonedBlocks = [...blocksList];
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xml_text = Blockly.Xml.domToText(xml);
    const code = javascriptGenerator.workspaceToCode(workspace);
    console.log(generateGoProCmd(code));
    setCmd(generateGoProCmd(code));
    const qrCanvas = new QRCodeCanvas(generateGoProCmd(code));
    const targetItemIndex = clonedBlocks?.findIndex(
      (cb) => cb?.id === selectedBlock?.id
    );

    const isProjectNameChanged =
      clonedBlocks[targetItemIndex]?.name?.localeCompare(blockTitle) !== 0;

    if (targetItemIndex > -1) {
      if (!isProjectNameChanged) {
        clonedBlocks[targetItemIndex] = {
          ...clonedBlocks[targetItemIndex],
          name: blockTitle,
          block: xml_text,
          command: code,
        };
      } else {
        clonedBlocks.push({
          id: generateUUID(),
          name: blockTitle,
          block: xml_text,
          command: code,
        });
      }
    } else {
      clonedBlocks.push({
        id: generateUUID(),
        name: blockTitle,
        block: xml_text,
        command: code,
      });
      window.history.replaceState({}, document.title, '/');
    }
    localStorage.setItem('blocks', JSON.stringify(clonedBlocks));

    setChanges(qrCanvas.toDataUrl());
    setBlocksList(clonedBlocks);
    setOpenModal(true);
  };

  const handleUploadQrImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imageBuffer = convertBase64ToUnit8Array(reader.result);

      const metadata = readMetadata(imageBuffer);
      if (metadata?.tEXt?.block) {
        window.history.replaceState(null, null, '/');
        workspace.clear();
        const xml = Blockly.Xml.textToDom(metadata?.tEXt?.block);
        Blockly.Xml.domToWorkspace(xml, workspace);
        setBlockTitle('New Project');
        setSelectedBlock({ name: 'New Peoject', block: metadata?.tEXt?.block });
      } else {
        toast.error('No blockly xml found! Please choose the right image.');
      }
      fileUploadRef.current.value = '';
    };
  };

  const handleCreateNewBlock = () => {
    window.history.replaceState({}, document.title, '/');

    workspace.clear();
    setWorkSpace(workspace);
    setBlockTitle('New Project');
    setChanges('');
    setIsSaveBtnEnable(false);
    setSelectedBlock(null);
  };

  const handleDownloadQrImage = async () => {
    const xml = Blockly.Xml.workspaceToDom(workspace);
    const xml_text = Blockly.Xml.domToText(xml);
    const dataUrl = await htmlToImage.toPng(targetHtmlRef.current);
    const imgBuffer = convertBase64ToUnit8Array(dataUrl);
    const metadata = readMetadata(imgBuffer);
    metadata.tEXt = { ...metadata.tEXt, block: xml_text };
    const modifiedMetadata = writeMetadata(imgBuffer, metadata);

    const finalBase64Image = new Buffer.from(modifiedMetadata).toString(
      'base64'
    );
    // download image
    const link = document.createElement('a');
    link.download = `${blockTitle}-${new Date().toLocaleString('en-US', {
      hour12: false,
    })}.png`;
    link.href = `data:image/png;base64,${finalBase64Image}`;
    link.click();
  };

  const handleManageHistory = () => {
    setOpenHistoryModal(true);
  };

  const handleChangeBlockTitle = (e) => {
    setBlockTitle(e.target.value);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className='actionButtonWrapper'>
      <div className='inputwrapper'>
        <input
          className='titleInput'
          type='text'
          value={blockTitle}
          onChange={handleChangeBlockTitle}
        />
      </div>
      <div className='inputWrapper'>
        <button
          className='actionBUtton generateQrCodeBtn'
          onClick={onOpenModal}
          disabled={!isSaveBtnEnable}
        >
          Save & Generate QR
        </button>
        <div className='file-upload'>
          <label htmlFor='input-file'>Import image</label>
          <input
            ref={fileUploadRef}
            id='input-file'
            type='file'
            accept='image/png'
            onChange={handleUploadQrImage}
          />
        </div>
        <button
          className='actionButton saveButton'
          onClick={handleCreateNewBlock}
        >
          Start New Project
        </button>
        <button
          className='actionButton historyButton'
          onClick={handleManageHistory}
        >
          History
        </button>
      </div>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        classNames={{
          modal: 'customModal',
        }}
      >
        <div className='qrGeneratorWrapper' >
          <div className='qrGeneratorWrapper' ref={targetHtmlRef} >
            <h3><font color="#005CAC">GoPro Labs QR Code</font></h3>
            <img alt='QR code' src={changes} />
            <pre>{cmd}</pre>
            <h3>{blockTitle}</h3>
          </div>
          <button
            role='button'
            className='actionButton downloadButton'
            onClick={handleDownloadQrImage}
          > Download QR </button>
        </div>
      </Modal>
      <Modal
        open={openHistoryModal}
        onClose={() => setOpenHistoryModal(false)}
        center
        classNames={{
          modal: 'customModal',
        }}
      >
        <BlockList onCloseHistoryModal={() => setOpenHistoryModal(false)} />
      </Modal>
    </div>
  );
};
export default ActionPanel;
