import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputLabel } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles({
  formField: {
    width: 200
  },
  sqlQueryTextarea: {
    height: 500
  }
});

export default function SqlQueryDataSet(props) {
  const classes = useStyles();
  
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
      <div>
        <FormControl className={classes.formField}>
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
      </div>

      <div>
        <InputLabel>Запрос</InputLabel>
        <FormControl fullWidth>
          <TextareaAutosize value={props.data.query} onChange={handleQueryChange} 
            required placeholder="Empty"
            rowsMin='10'
            className={classes.sqlQueryTextarea}
            disabled={disabletor('query')}
            />
        </FormControl>
      </div>
    </React.Fragment>
  );
}