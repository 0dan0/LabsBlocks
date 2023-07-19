import React from 'react';
import constate from 'constate';
import Blockly from 'blockly/core';
import { officialToolbox, Xml } from './official';
import { customTools } from './customToolbox';
const h = React.createElement;

export const [BlocklyWorkspaceProvider, useBlocklyWorkspace] = constate(
  function () {
    const divRef = React.useRef(null);
    const xmlRef = React.useRef(null);
    const [workspace, setWorkspace] = React.useState(null);
    React.useLayoutEffect(() => {
      if (!divRef?.current || !xmlRef?.current) return;

      const ws = Blockly.inject(divRef.current, {
        renderer: 'zelos',
        toolbox: xmlRef.current,
      });

      setWorkspace(ws);
    }, [divRef, xmlRef]);

    return { workspace, divRef, xmlRef };
  }
);

export function BlocklyComponentImpl(props) {
  const { children, ...otherProps } = props;
  const { divRef, xmlRef } = useBlocklyWorkspace();
  const div = h('div', { ...otherProps, ref: divRef });
  const xml = h(
    'div',
    { ref: xmlRef },
    officialToolbox,
    customTools,
    props.children
  );

  return h(React.Fragment, null, div, xml);
}

export function BlocklyComponent(props) {
  return h(BlocklyWorkspaceProvider, null, h(BlocklyComponentImpl, props));
}

export function OnUpdated(props) {
  const ws = useBlocklyWorkspace();

  const callback = React.useCallback(
    (e) => props.onUpdated(e, ws.workspace),
    [props.onUpdated, ws.workspace]
  );
  React.useEffect(() => {
    const { workspace } = ws;
    if (!workspace) return;

    workspace.addChangeListener(callback);
    return function () {
      workspace.removeChangeListener(callback);
    };
  }, [ws, callback]);

  React.useLayoutEffect(() => {
    if (!ws.workspace) return;

    props.onMounted(ws.workspace);
  }, [ws]);
  return null;
}
