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
var Buffer = require('buffer').Buffer;

const ActionPanel = () => {
  const fileUploadRef = useRef(null);
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
    if (targetItemIndex > -1) {
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
    localStorage.setItem('blocks', JSON.stringify(clonedBlocks));
    const imgBuffer = convertBase64ToUnit8Array(qrCanvas.toDataUrl());
    const metadata = readMetadata(imgBuffer);
    metadata.tEXt = { ...metadata.tEXt, block: xml_text };
    const modifiedMetadata = writeMetadata(imgBuffer, metadata);
    console.log({ modifiedMetadata });

    const finalBase64Image = new Buffer.from(modifiedMetadata).toString(
      'base64'
    );
    setChanges(`data:image/png;base64,${finalBase64Image}`);
    setBlocksList(clonedBlocks);
    setOpenModal(true);
    //
    // var dataURI = qrCanvas.toDataUrl();
    // console.log(dataURI);
    // var byteString = atob(dataURI.split(',')[1]);

    // // separate out the mime component
    // var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // // write the bytes of the string to an ArrayBuffer
    // var ab = new ArrayBuffer(byteString.length);

    // // create a view into the buffer
    // var ia = new Uint8Array(ab);

    // // set the bytes of the buffer to the correct values
    // for (var i = 0; i < byteString.length; i++) {
    //   ia[i] = byteString.charCodeAt(i);
    // }

    // // write the ArrayBuffer to a blob, and you're done
    // var blob = new Blob([ab], { type: mimeString });
    // console.log(blob);
    // // const file = new File([blob], `${xml_text}`, {
    // //   type: 'image/png',
    // // });
    // // file.block = 'TEST';
    // // const fileReader = new FileReader();
    // // fileReader.readAsDataURL(file);
    // // console.log(fileReader);
    // // console.log(file);
    // const d = await blob.arrayBuffer();
    // console.log(d);

    console.log({ metadata });
  };

  const handleUploadQrImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log('called: ', reader);
      const imageBuffer = convertBase64ToUnit8Array(reader.result);

      const metadata = readMetadata(imageBuffer);
      if (metadata?.tEXt?.block) {
        window.history.replaceState(null, null, '/');
        workspace.clear();
        const xml = Blockly.Xml.textToDom(metadata?.tEXt?.block);
        Blockly.Xml.domToWorkspace(xml, workspace);
      } else {
        toast.error('No blockly xml found! Please choose the right image.');
      }
      fileUploadRef.current.value = '';
      console.log({ metaData2: metadata });
    };
  };

  const handleCreateNewBlock = () => {
    window.history.replaceState({}, document.title, '/');

    workspace.clear();
    setWorkSpace(workspace);
    setBlockTitle('New Block');
    setChanges('');
    setIsSaveBtnEnable(false);
    setSelectedBlock(null);
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
        {/* <button className='actionButton saveButton' onClick={onOpenModal}>
            Update
          </button> */}
      </div>
      <div className='inputWrapper'>
        <button
          className='actionBUtton generateQrCodeBtn'
          onClick={onOpenModal}
          disabled={!isSaveBtnEnable}
        >
          Save & Generate Qr
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
          Create Block
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
        <div className='qrGeneratorWrapper'>
          <p className='heading'>Here is your Qr Code</p>
          <pre>{cmd}</pre>
          <img alt='Qr code' src={changes} />
          <a
            style={{ marginTop: '20px' }}
            href={changes}
            target='_black'
            download={`${blockTitle}-${new Date().toLocaleString('en-US', {
              hour12: false,
            })}.png`}
          >
            Download
          </a>
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
