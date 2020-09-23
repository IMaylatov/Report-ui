import React, { useState } from 'react';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

export default function useTreeView(props) {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeIds) => {
    if (props.children.length > 0) {
      let children = props.children;
      if (expanded.length > 0) {
        children = children.find(x => x.nodeId === expanded[0]).children;
      }
      let child = children.find(x => x.nodeId === nodeIds);
      if (!child) {
        child = props.children.find(x => x.nodeId === nodeIds);
      }
      setSelectedChild(child);
    }

    setSelected(nodeIds);
  };

  const treeView = 
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      expanded={expanded}
      selected={selected}
      onNodeToggle={handleToggle}
      onNodeSelect={handleSelect}
    >
      <TreeViewItem children={props.children}/>
    </TreeView>

  return [ treeView, { expanded, setExpanded, selected, setSelected, selectedChild } ];
}

function TreeViewItem(props) {
  return props.children.map((child, i) => {
    let itemProp;
    if (child.onEdit) {
      itemProp = { onDoubleClick: () => child.onEdit(child.value, i) };
    }
    
    return (
      <TreeItem key={child.nodeId} nodeId={child.nodeId} label={child.label} {...itemProp}>
          {child.children && child.children.length > 0 && <TreeViewItem children={child.children}/>}
      </TreeItem>
    );
  })
}