import React from 'react';
import { TextField, InputLabel, MenuItem, FormControl, Grid } from '@material-ui/core';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

export default function SqlQueryDataSet(props) {
  const handleQueryChange = (e) => {
    props.onChange({ ...props.data, query : e.target.value });
  }

  const handleDataSetChange = (e) => {
    props.onChange({ ...props.data, dataSourceName: e.target.value });
  }

  const disabletor = (name) => {
    return props.disabletor(`SqlQueryDataSet.${name}`);
  };

  return (
    <React.Fragment>
      <Grid item>
        <FormControl fullWidth>
          <TextField
            select
            required 
            label="Источник данных"
            value={props.data.dataSourceName}
            onChange={handleDataSetChange}
            disabled={disabletor('dataSourceName')}
          >
            {props.report.dataSources.map((dataSource) => (
              <MenuItem key={dataSource.name} value={dataSource.name}>
                {dataSource.name}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <InputLabel>Запрос</InputLabel>
        <FormControl fullWidth>
          <TextareaAutosize value={props.data.query} onChange={handleQueryChange} 
            required placeholder="Empty" style={{ resize: 'none' }}
            rowsMin='20'
            disabled={disabletor('query')}
            />
        </FormControl>
      </Grid>
    </React.Fragment>
  );
}