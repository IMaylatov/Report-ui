import React from 'react';
import { 
  TextField,
  InputLabel, 
  FormControl, 
  TextareaAutosize, 
  MenuItem, 
  Grid 
} from '@material-ui/core';

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
      <Grid item xs={7}>
        <FormControl fullWidth>
          <TextField
            select
            required 
            label="Источник данных"
            value={props.data.dataSet.data.dataSourceName}
            onChange={handleDataSourceChange}
            disabled={disabletor('dataSourceName')}
          >
            {props.report.dataSources.map((dataSource) => (
              <MenuItem key={dataSource.id} value={dataSource.name}>
                {dataSource.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>

      <Grid item xs={12} container spacing={1}>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <TextField value={props.data.captionField}
              onChange={handleCaptionFieldChange}
              label={'Отображаемое поле'} required />
          </FormControl>
        </Grid>
        {props.multiple &&
          <Grid item xs={4}>
            <FormControl fullWidth>
              <TextField value={props.data.keyField} 
                onChange={handleKeyFieldChange}
                label={'Ключевое поле'} required />
            </FormControl>
          </Grid>
        }
      </Grid>

      <Grid item xs={12}>
        <InputLabel>Запрос</InputLabel>
        <FormControl fullWidth>
          <TextareaAutosize value={props.data.dataSet.data.query} onChange={handleQueryChange}
            required placeholder="Empty" rowsMin={10} style={{ resize: 'none' }}/>
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}