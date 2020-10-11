import React from 'react';
import { TextField, Select } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import MenuItem from '@material-ui/core/MenuItem';

export default function SelectDataVariable(props) {  
  const handleDataSourceChange = (e) => {
    props.data.dataSet.data.dataSourceName = e.target.value;
    props.onDataChange({ ...props.data });
  }

  const handleKeyFieldChange = (e) => {    
    props.data.keyField = e.target.value;
    props.onDataChange({ ...props.data });
  }

  const handleCaptionFieldChange = (e) => {
    props.data.captionField = e.target.value;
    props.onDataChange({ ...props.data });
  }
  
  const handleQueryChange = (e) => {
    props.data.dataSet.data.query = e.target.value;
    props.onDataChange({ ...props.data });
  }  
  
  const disabletor = (name) => {
    return props.disabletor(`SelectDataVariable.${name}`);
  };

  return (
    <React.Fragment>
      <React.Fragment>
        <FormControl fullWidth>
          <Select
            label="Источник данных"
            required 
            value={props.data.dataSet.data.dataSourceName}
            onChange={handleDataSourceChange}
            disabled={disabletor('dataSourceName')}
          >
            {props.report.dataSources.map((dataSource) => (
              <MenuItem key={dataSource.id} value={dataSource.name}>
                {dataSource.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br/>
        <FormControl>
          <TextField value={props.data.captionField}
            onChange={handleCaptionFieldChange}
            label={'Отображаемое поле'} required />
        </FormControl>
        {props.multiple &&
          <FormControl>
            <TextField value={props.data.keyField} 
              onChange={handleKeyFieldChange}
              label={'Ключевое поле'} required />
          </FormControl>
        }
        <br/>
        <FormControl>
          <TextareaAutosize value={props.data.dataSet.data.query} onChange={handleQueryChange}
            required placeholder="Empty"
            rowsMin='10'/>
        </FormControl>

      </React.Fragment>
    </React.Fragment>
  );
}