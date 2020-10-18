import React, { useState } from 'react';
import { TreeView, TreeItem } from '@material-ui/lab';
import SelectorDownIcon from '../component/common/icons/SelectorDownIcon';
import CarouselRightIcon from '../component/common/icons/CarouselRightIcon';

export default function useTreeView(props) {
  const [expanded, setExpanded] = useState([]);
  const [selected, setSelected] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);

  const handleToggle = (event, nodeIds) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event, nodeId) => {
    if (props.children.length > 0) {
      let nodeIds = nodeId.split(".");
      let nodeChild = props.children.find(x => x.nodeId === nodeIds[0]);
      for (let i = 1; i < nodeIds.length; i++) {
        nodeChild = nodeChild.children.find(x => x.nodeId.endsWith(nodeIds[i]));
      }
      setSelectedChild(nodeChild);
    }

    setSelected(nodeId);
  };

  const treeView = 
    <TreeView
      defaultCollapseIcon={<SelectorDownIcon />}
      defaultExpandIcon={<CarouselRightIcon />}
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