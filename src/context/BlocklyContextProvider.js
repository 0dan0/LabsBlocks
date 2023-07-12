import React, { createContext, useEffect, useState } from 'react';

export const BlocklyContext = createContext();

const BlocklyContextProvider = ({ children, localStorageBlockList }) => {
  const [blockTitle, setBlockTitle] = useState('New Project');
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [blocksList, setBlocksList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openHistoryModal, setOpenHistoryModal] = useState(false);
  const [workspace, setWorkSpace] = useState('');
  const [changes, setChanges] = useState('');
  const [isSaveBtnEnable, setIsSaveBtnEnable] = useState(false);

  useEffect(() => {
    const presetBlocks = localStorageBlockList?.length
      ? [...localStorageBlockList]
      : [];
    setBlocksList(presetBlocks);
  }, [localStorageBlockList]);

  return (
    <BlocklyContext.Provider
      value={{
        blockTitle,
        blocksList,
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
      }}
    >
      {children}
    </BlocklyContext.Provider>
  );
};
export default BlocklyContextProvider;
