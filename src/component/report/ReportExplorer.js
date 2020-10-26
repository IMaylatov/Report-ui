import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddDataSet from '../dataSet/AddDataSet';
import DataSet from '../dataSet/DataSet';
import AddVariable from '../variable/AddVariable';
import Variable from '../variable/Variable';
import EditIcon from '../common/icons/EditIcon';
import BasketIcon from '../common/icons/BasketIcon';
import IconButton from '@material-ui/core/IconButton';
import { useMenu, useTreeView, useDialog, useOperation } from '../common/hooks';
import { DATASET_TYPE_SQLQUERY } from '../../utils/const/reportConst';
import AddDataSource from '../dataSource/AddDataSource';
import DataSource from '../dataSource/DataSource';
import { Typography, Box, Grid, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  operationPanel: {
    '&.MuiGrid-spacing-xs-1': {
      width: '100%',
      margin: 0
    }
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
    return props.disabletor 
      ? props.disabletor(`ReportExplorer.${name}`)
      : false;
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
      props: { color: 'primary', size: 'small', disabled: props.addItemHidden !== undefined }
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
            nodeId: `dataSources.${s.name}`,
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
            nodeId: `dataSets.${s.name}`,
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
            nodeId: `variables.${s.name}`,
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
      <Box m={1}>
        <Typography variant='h2'>
          {props.report.type}
        </Typography>
      </Box>

      <Divider/>

      <Grid container spacing={1} justify="flex-end" className={classes.operationPanel} alignItems='center'>
        <Grid item>
          {addItemMenu}
        </Grid>

        <Grid item>
          <IconButton onClick={handleEditClick} edge="start" color="primary" size='small'>
            <EditIcon />
          </IconButton>
        </Grid>

        <Grid item>
          <IconButton onClick={handleDeleteClick} edge="start" color="secondary" size='small' disabled={props.deleteItemHidden}>
            <BasketIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Divider/>

      {reportTreeView}

      {dialog}
    </React.Fragment>
  );
}