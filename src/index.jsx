import React, { useEffect } from 'react';
import { render } from 'react-dom';
import './style.css';
import 'normalize.css';
import 'react-responsive-modal/styles.css';
import BlocklyContextProvider from './context/BlocklyContextProvider';
import BlocklyComponentWrapper from './blockly-react/BlocklyComponentWrapper';
import ActionPanel from './blockly-react/ActionPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const localStorageBlockList = localStorage.getItem('blocks') ? JSON.parse(localStorage.getItem('blocks')) : [];

  useEffect(() => {
    const handleTabClose = event => {

      console.log('beforeunload event triggered');

      return (event.returnValue =
        'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <BlocklyContextProvider localStorageBlockList={localStorageBlockList}>
      <head>
        <title>Go pro blockly</title>
        <meta name="description" content="Generate go pro qr code using go pro blockly"></meta>
      </head>
      <div style={{ padding: '10px' }}>
        <ActionPanel />
        <BlocklyComponentWrapper />
      </div>
      <ToastContainer />
    </BlocklyContextProvider>
  );
}

render(<App />, document.getElementById('root'));
