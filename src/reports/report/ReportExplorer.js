import React from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddDataSet from '../../dataSets/AddDataSet';
import DataSet from '../../dataSets/DataSet';
import AddVariable from '../../variables/AddVariable';
import Variable from '../../variables/Variable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useMenu, useTreeView, useDialog, useOperation } from '../../common';
import * as dataSetConstants from '../../dataSets/constants';
import SelectDataSource from '../../dataSources/SelectDataSource';

export default function ReportExplorer(props) {
  const handleItemAdd = (itemsField, item) => {
    props.report[itemsField] = [ ...props.report[itemsField], item];
    props.onChange(props.report);
    setOpenDialog(false);
  }

  const handleItemEdit = (itemsField, preValue, value) => {
    const iValue = props.report[itemsField].indexOf(preValue); 
    props.report[itemsField][iValue] = value;
    props.onChange(props.report);
    setOpenDialog(false);
  }

  const handleItemDelete = (itemsField, value) => {
    const iValue = props.report[itemsField].indexOf(value);      
    props.report[itemsField].splice(iValue, 1);
    props.onChange(props.report);
    setSelected([]);
  }

  const [dialog, { setDialogContent, setOpenDialog }] = useDialog();

  const [handleDataSourceAdd, handleDataSourceEdit, handleDataSourceDelete] = useOperation({
    setOpenDialog,
    setDialogContent,
    addForm: (formProps) => <SelectDataSource report={props.report} {...formProps}/>,
    editForm: (formProps) => <SelectDataSource report={props.report} {...formProps}/>,
    onAdd: (item) => handleItemAdd('dataSources', item),
    onEdit: (preValue, value) => handleItemEdit('dataSources', preValue, value),
    onDelete: (value) => {
      if (props.report.dataSets
          .filter(d => d.type === dataSetConstants.DATASET_TYPE_SQLQUERY)
          .map(d => d.data.dataSource).includes(value)) {
        alert('Невозможно удалить. Источник используется в наборе данных');
        return;
      } 
      handleItemDelete('dataSources', value);
    }
  });
  
  const [handleDataSetAdd, handleDataSetEdit, handleDataSetDelete] = useOperation({
    setOpenDialog,
    setDialogContent,
    addForm: (formProps) => <AddDataSet report={props.report} {...formProps}/>,
    editForm: (formProps) => <DataSet report={props.report} {...formProps}/>,
    onAdd: (item) => handleItemAdd('dataSets', item),
    onEdit: (preValue, value) => handleItemEdit('dataSets', preValue, value),
    onDelete: (value) => handleItemDelete('dataSets', value)
  });
  
  const [handleVariableAdd, handleVariableEdit, handleVariableDelete] = useOperation({
    setOpenDialog,
    setDialogContent,
    addForm: (formProps) => <AddVariable report={props.report} {...formProps}/>,
    editForm: (formProps) => <Variable report={props.report} {...formProps}/>,
    onAdd: (item) => handleItemAdd('variables', item),
    onEdit: (preValue, value) => handleItemEdit('variables', preValue, value),
    onDelete: (value) => handleItemDelete('variables', value)
  });

  const addItemMenu = useMenu({     
    menuButton: {
      label: 'Новый элемент',
      props: { color: 'primary', endIcon: <ExpandMoreIcon/> }
    }, 
    items: [
      { label: 'Источник данных', onClick: handleDataSourceAdd },
      { label: 'Набор данных', onClick: handleDataSetAdd },
      { label: 'Параметр', onClick: handleVariableAdd },
    ]
  });

  const [reportTreeView, { setSelected, selectedChild }] = useTreeView({
    children: [
      {
        nodeId: 'dataSources',
        label: 'Источники данных',
        children: props.report.dataSources.map(s =>  {
          return {
            nodeId: s.name,
            label: s.name,
            value: s,
            onEdit: handleDataSourceEdit,
            onDelete: handleDataSourceDelete
          }
        })
      },      
      {
        nodeId: 'dataSets',
        label: 'Наборы данных',
        children: props.report.dataSets.map(s =>  {
          return {
            nodeId: s.name,
            label: s.name,  
            value: s,          
            onEdit: handleDataSetEdit,
            onDelete: handleDataSetDelete
          }
        })
      },
      {
        nodeId: 'variables',
        label: 'Параметры',
        children: props.report.variables.map(s =>  {
          return {
            nodeId: s.name,
            label: s.name,
            value: s,
            onEdit: handleVariableEdit,
            onDelete: handleVariableDelete
          }
        })
      }
    ]
  });

  const handleEditClick = (e) => {
    if (selectedChild.onEdit) {
      selectedChild.onEdit(selectedChild.value);
    }
  }

  const handleDeleteClick = (e) => {
    if (selectedChild.onDelete) {
      selectedChild.onDelete(selectedChild.value);
    }
  }

  return (
    <React.Fragment>
      {addItemMenu}

      <IconButton onClick={handleEditClick} edge="start" color="primary">
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDeleteClick} edge="start" color="primary">
        <DeleteIcon />
      </IconButton>

      {reportTreeView}

      {dialog}
    </React.Fragment>
  );
}