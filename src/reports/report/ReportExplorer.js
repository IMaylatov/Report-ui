import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddDataSet from '../../dataSets/AddDataSet';
import DataSet from '../../dataSets/DataSet';
import AddVariable from '../../variable/AddVariable';
import Variable from '../../variable/Variable';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import { useMenu, useTreeView, useDialog, useOperation } from '../../common';
import { DATASET_TYPE_SQLQUERY } from '../../constants';
import AddDataSource from '../../dataSources/AddDataSource';
import DataSource from '../../dataSources/DataSource';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  operationPanel: {
    float: 'right'
  },
  operationButton: {
    padding: 10
  },
  reportType: {
    paddingLeft: 15,
    paddingTop: 10
  }
}));

export default function ReportExplorer(props) {
  const classes = useStyles();

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

  const [dialog, { setDialogContent, setOpenDialog, setMaxWidthDialog }] = useDialog();

  const disabletor = (name) => {
    if (props.disabletor) {
      return props.disabletor(`ReportExplorer.${name}`);
    } else {
      return false;
    }
  };

  const [handleDataSourceAdd, handleDataSourceEdit, handleDataSourceDelete] = useOperation({
    setOpenDialog,
    setDialogContent,
    setMaxWidthDialog: () => setMaxWidthDialog('md'),
    addForm: (formProps) => <AddDataSource disabletor={disabletor} report={props.report} {...formProps}/>,
    editForm: (formProps) => <DataSource disabletor={disabletor} report={props.report} {...formProps}/>,
    onAdd: (item) => handleItemAdd('dataSources', item),
    onEdit: (preValue, value) => handleItemEdit('dataSources', preValue, value),
    onDelete: (value) => {
      if (props.report.dataSets
          .filter(d => d.type === DATASET_TYPE_SQLQUERY)
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
    setMaxWidthDialog: () => setMaxWidthDialog('md'),
    addForm: (formProps) => <AddDataSet disabletor={disabletor} report={props.report} {...formProps}/>,
    editForm: (formProps) => <DataSet disabletor={disabletor} report={props.report} {...formProps}/>,
    onAdd: (item) => handleItemAdd('dataSets', item),
    onEdit: (preValue, value) => handleItemEdit('dataSets', preValue, value),
    onDelete: (value) => handleItemDelete('dataSets', value)
  });
  
  const [handleVariableAdd, handleVariableEdit, handleVariableDelete] = useOperation({
    setOpenDialog,
    setDialogContent,
    setMaxWidthDialog: () => setMaxWidthDialog('sm'),
    addForm: (formProps) => <AddVariable disabletor={disabletor} report={props.report} {...formProps}/>,
    editForm: (formProps) => <Variable disabletor={disabletor} report={props.report} {...formProps}/>,
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
    if (selectedChild && selectedChild.onEdit) {
      selectedChild.onEdit(selectedChild.value);
    }
  }

  const handleDeleteClick = (e) => {
    if (selectedChild && selectedChild.onDelete) {
      selectedChild.onDelete(selectedChild.value);
    }
  }

  return (
    <React.Fragment>
      <div>
        <Typography color='primary' variant='h6' className={classes.reportType}>{props.report.type}</Typography>
      </div>
      <div className={classes.operationPanel}>
        {!props.addItemHidden &&
          addItemMenu
        } 

        <IconButton onClick={handleEditClick} edge="start" color="primary" className={classes.operationButton}>
          <EditIcon />
        </IconButton>

        {!props.deleteItemHidden &&
          <IconButton onClick={handleDeleteClick} edge="start" color="primary" className={classes.operationButton}>
            <DeleteIcon />
          </IconButton>
        }
      </div>

      {reportTreeView}

      {dialog}
    </React.Fragment>
  );
}